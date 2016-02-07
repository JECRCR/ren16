$(".bar").click(function() {
    var that = $(this);
    that.find('.inner-bar .category-img').hide();
    that.addClass('bar-full');
    that.siblings().addClass('zero-width');
    that.find('.event-content').show();
});
$(".menu-button").click(function() {
    if ($(".bar").hasClass('bar-full')) {
        $(".bar").removeClass('bar-full');
        $('.bar').removeClass('zero-width');
        $('.bar').find('.event-content').hide();
        $('.inner-bar img').fadeIn();
    } else {
        $(".main-page").addClass('main-page-show');
    }
});
$(".explore-button").click(function() {
    $(".main-page-show").removeClass("main-page-show");
});
$(".event-icon").click(function() {
    var that = $(this);
    $(".event-details").slideDown();
});
