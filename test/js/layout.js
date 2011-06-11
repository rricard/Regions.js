$(function(){
  module("Layout");

  test("hide flow source", function() {
    equal($('#article').css("display"), "hidden", "the flow is still visible");
  });

  test("regions have content", function() {
    notEqual($('.article-region').html(), "", "the regions are empty");
  });
  
  test("regions have different content", function() {
    notEqual($('#article-region-1').html(), $('#article-region-2').html(), "the regions have the same content");
  });
});