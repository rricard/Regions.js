window.CSSRegions = (function( window, document, undefined ) {
  
  var version = "0.1",
  
  CSSRegions = {},
  
  /**
   * Just put enough elements (that fits) into the region
   * Returns the overflow in a container
   */
  
  integrate = function (elementsContainer, region) {
    // This avoids the original copy's alteration 
    elementsContainer = elementsContainer.clone();
    // This redefines the offsetParent for children
    if (region.css("position"))
      region.css("position", "relative");
    // This introduces the elements
    region.empty();
    region.append(elementsContainer.children());
    // This removes the overflow and return it
    return overflowRemover(region);
  },
  
  /**
   * Removes and return the overflow in a region
   * for each node you want to analyze.
   */
    
  overflowRemover = function (elementsContainer, region, letteringForbidden) {
    if (region == undefined) region = elementsContainer;
    
    // This create an empty and hidden DOM node
    var overflowContainer = $("<div></div>"),
        elements = elementsContainer.children(),
    // This stores the first element that had to be rejected
        firstRejected = false;
    
    elements.each(function (index, element) {
      element = $(element); // jQuery manipulable
      if (
        element.position().left + element.outerWidth(true) > region.width() ||
        element.position().top + element.outerHeight(true) > region.height()
      ) { // If it does not fit in the region :
        element.detach();
        if (firstRejected) { // And if a rejected element have been keeped.
          // It's added directly into the overflow node
          overflowContainer.append($("<span> </span>")); // Fix whitespace issues
          overflowContainer.append(element);
        } else {
          // Or we keep it for later
          firstRejected = element;
        }
      }
    });
    
    if (firstRejected) { // The first rejected is taken
      // If it's a text, treat it with Lettering.js
      if (firstRejected.children().length == 0 && !letteringForbidden) {
        firstRejected.lettering("words");
        letteringForbidden = true;
      }
      // If he is not empty
      if (firstRejected.children().length > 0) {
        // He is reintroduced into the DOM
        elementsContainer.append(firstRejected);
        // The same treatment will be performed on him (recursion)
        var removed = overflowRemover(firstRejected, region, letteringForbidden),
        // His overflow will be moved into his parent's overflow
            reintroduce = firstRejected.clone();
        reintroduce.empty();
        reintroduce.append(removed.children());
        overflowContainer.prepend(reintroduce);
      } else {
        overflowContainer.prepend(firstRejected);
      }
    }
    return overflowContainer;
  };
  
  /**
   * Introduce a flow into several regions (once)
   * Returns the overflow in a DOM element
   */
  
  CSSRegions.build = function (flowContainer, regionsArray) {
    flowContainer.css("display", "none");
    var overflow = integrate(flowContainer, regionsArray[0]);
    regionsArray.shift();
    if (regionsArray.length > 0) {
      return CSSRegions.build(overflow, regionsArray);
    } else {
      return overflow;
    }
  }
  
  $(function(){
    
    CSSRegions.build($("#article"), [$("#article-region-1"), $("#article-region-2"), $("#article-region-3")]);
  });
  
  return CSSRegions;
})(this, this.document);