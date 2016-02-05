$(".bar").click(function(){
    var that = $(this);
    that.find('.inner-bar').hide();
    that.addClass('bar-full');
    that.siblings().addClass('zero-width');
});
$(".menu-button").click(function(){
  if($(".bar").hasClass('bar-full')){
      $(".bar").removeClass('bar-full');
      $('.bar').removeClass('zero-width');
  } else {
    $(".main-page").addClass('main-page-show');
  }
});
$(".explore-button").click(function(){
    $(".main-page-show").removeClass("main-page-show");
});
