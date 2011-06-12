$(function(){
  module("Layout");

  test("hide flow source", function() {
    equal($('#article').css("display"), "none");
  });

  test("regions have content", function() {
    notEqual($('.article-region').text(), "");
  });
  
  test("regions have different content", function() {
    notEqual($('#article-region-1').text(), $('#article-region-2').text());
  });
  
  test("text in the first region is matching", function() {
    var expected = /1Lorem ipsum dolor sit amet, consectetur adipisicing elit,\s*/;
    ok(
      expected.test($('#article-region-1').text()),
      "is 1Lorem ipsum dolor sit amet, consectetur adipisicing elit,"
    );
  });
});