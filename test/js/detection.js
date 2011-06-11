module("Feature detection");

test("modernizr cssregions detection", function() {
  notEqual(Modernizr.cssregions, undefined, "modernizr doesn't respond to .cssregions");
});

test("the browser isn't compatible with the css regions", function() {
  equal(Modernizr.cssregions, false, "it appears that you have a compatible browser with the feature");
});