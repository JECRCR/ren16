$(".bar").click(function(){
    var that = $(this);
    var pos = that.position();
    that.addClass('bar-full');
});
$(".menu-button").click(function(){
  if($(".bar").hasClass('bar-full')){
    $(".bar").removeClass('bar-full');
  } else {
    $(".main-page").addClass('main-page-show');
  }
});
$(".explore-button").click(function(){
    $(".main-page-show").removeClass("main-page-show");
});
