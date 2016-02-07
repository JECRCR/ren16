$(".bar").click(function() {
    var that = $(this);
    that.find('.inner-bar .category-img').hide();
    that.addClass('bar-full');
    that.siblings().addClass('zero-width');
    that.find('.event-content').show();
    $(".menu-icon").addClass('animate-1').removeClass('animate-2');
});
$(".menu-icon").click(function() {
    if ($(".bar").hasClass('bar-full')) {
        $(".menu-icon").addClass('animate-2').removeClass('animate-1');
        $(".bar").removeClass('bar-full');
        $('.bar').removeClass('zero-width');
        $('.bar').find('.event-content').hide();
        $('.inner-bar img').fadeIn();
    } else {
        $(".main-page").slideDown();
    }
});
$(".explore-button").click(function() {
    $(".main-page").slideUp();
});
$(".event-icon").click(function() {
    var that = $(this);
    $(".event-details").slideDown();
});
$(".event-details").click(function() {
    $(this).slideUp();
});
