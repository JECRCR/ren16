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
$(".event-details header .close-btn").click(function() {
    $(".event-details").slideUp();
});

/*TABS*/

$(document).ready(function() {
    $("div.vertical-tab-menu>div.list-group>a").click(function(e) {
        e.preventDefault();
        $(this).siblings('a.active').removeClass("active");
        $(this).addClass("active");
        var index = $(this).index();
        $("div.vertical-tab>div.vertical-tab-content").removeClass("active");
        $("div.vertical-tab>div.vertical-tab-content").eq(index).addClass("active");
    });
});

/*TABS END*/
