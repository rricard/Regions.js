window.CSSRegions = (function( window, document, undefined ) {
  
  var version = "0.1",
  
  CSSRegions = {},
  
  cut = function(flowChunk, region) {
    region = $(region);
    flowChunk = $(flowChunk);
    // Little bit tricky : the region must be the offsetParent
    region.css("position", "relative");
    region.html(flowChunk);
    domChunk = region.children();
    // It launches the recursive machine !
    var ret = domCutter(domChunk, region);
    region.html("");
    return ret;
  },
  
  domCutter = function(domChunk, region) {
    var ret = { keep: [], reject: []};
    domChunk = $(domChunk);
    // Inspect each dom element to see if it's in the box
    domChunk.each(function(index, child) {
      child = $(child);
      if(
        child.position().left + child.outerWidth(true) < region.width() ||
        child.position().top + child.outerHeight(true) < region.height()
      ) {
        ret.keep.push(child); // TODO : Some optimization here, the loop can be stopped when the first node is rejected.
      } else {
        ret.reject.push(child);
      }
    });
    // Inspect the first rejected element to keep some child nodes
    if (ret.reject[0]) {
      var firstRejected = $(ret.reject[0]);
      if (firstRejected.nodeType == 3) { // If TextNode
        firstRejected.lettering('words'); // We use lettering to split words
      }
      var fRChildren = firstRejected.children(),
          fRStructure = firstRejected.clone();
      fRStructure.html("");
      // We are introducing some reccurence here !
      var fRCut = domCutter(fRChildren, region),
          fRKeep = fRStructure.clone(),
          fRReject = fRStructure.clone();
      // We are reusing the structure to split dom correctly
      fRKeep.html(fRCut.keep);
      ret.keep.push(fRKeep);
      fRReject.html(fRCut.reject);
      ret.reject.unshift(fRReject);
    }
    return ret;
  };
  
  $(function(){
    CSSRegions.rebuild();
  });
  
  return CSSRegions;
})(this, this.document);