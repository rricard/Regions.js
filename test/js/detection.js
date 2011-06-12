module("Feature detection");

test("modernizr cssregions detection", function() {
  notEqual(Modernizr.cssregions, undefined);
});

test("the browser isn't compatible with the css regions", function() {
  equal(Modernizr.cssregions, false);
});