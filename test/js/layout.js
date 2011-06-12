$(function(){
  module("Layout");

  test("hide flow source", function() {
    equal($('#article').css("display"), "none");
  });

  test("regions have content", function() {
    notEqual($('.article-region').html(), "");
  });
  
  test("regions have different content", function() {
    notEqual($('#article-region-1').html(), $('#article-region-2').html());
  });
});