$(function(){
  // Polyfill for the CSS3-Regions
  Modernizr.load({
    test: Modernizr.cssregions,
    nope: "js/libs/regions.min.js",
    callback: function (url, result, key) {
      if (url === 'js/libs/regions.min.js') {
        CSSRegions.autobuild(
          $("#page-flow"),
          [
            $("#layout > .line1 > .col1 > .line1"),
            $("#layout > .line1 > .col1 > .line2"),
            $("#layout > .line1 > .col2"),
            $("#layout > .line1 > .col3"),
            $("#layout > .line2")
          ]
        )
      }
    }
  });
  
  // Some Lettering.js fun here !
});
