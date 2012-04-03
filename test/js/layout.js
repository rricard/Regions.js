$(function(){
  module("Layout");
  
  $("#article").regions(["#article-region-1", "#article-region-2", "#article-region-3"]);

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
    var expected = /1Lorem  ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod */;
    ok(
      expected.test($('#article-region-1').text()),
      "is 1Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod"
    );
  });



  // alternative method: use only a target jquery selector:
  $("#alternative-article").regions('.alternative-region');

  test("alternative method with jquery selector", function(){
    var expected = /Lorem ipsum dolor sit amet, consectetur adipisicing elit. */;
    ok(
      expected.test($('.alternative-region:first').text(),
      'is Lorem ipsum dolor sit amet, consectetur adipisicing elit. …')
    )
  });
});
