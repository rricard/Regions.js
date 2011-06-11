// test if the CSS regions support is enabled
// http://dev.w3.org/csswg/css3-regions/

Modernizr.addTest( "cssregions",function(){
  return Modernizr.testAllProps("flow");
});