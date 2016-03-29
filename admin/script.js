$('#myTabs a').click(function(e) {
    e.preventDefault()
    $(this).tab('show')
});

/* addEvent */
$(".eventCategory .dropdown-menu li a").click(function() {
    $(".eventCategory .btn:first-child").html($(this).text() + ' <span class="caret"></span>');
    $(".eventCategory .btn:first-child").val($(this).text());
    if ($(this).text() == 'QUANTA') {
        $('.quantaCategory').show();
        $('.splashCategory').hide();
    } else if ($(this).text() == 'SPLASH') {
        $('.splashCategory').show();
        $('.quantaCategory').hide();
    } else {
        $('.quantaCategory').hide();
        $('.splashCategory').hide();
    }
});

$(document).ready(function() {
    $(".eventCategory .dropdown-menu li a").click(function() {
        id = $(this).closest("li a").attr('id');
        $(".addEvent-form input[name='category']").val(id);
    });
});

/* editEvent */
$(".event-dropdown").on('click', 'a', function() {
    var event = $(this).text();
    var eventID = $(this).attr('id');

    $(".editEvents-dropdown .btn:first-child").html(event + ' <span class="caret"></span>');
    $(".editEvents-dropdown .btn:first-child").val(event);

    $.getJSON("/api/events/" + eventID, function(data) {
        for (key in data) {
            if (data.hasOwnProperty(key)) {
                $('.editEvent-form input[name=' + key + ']').val(data[key]);
                $('.editEvent-form textarea[name=' + key + ']').val(data[key]);
            }
        }
        $('.editEvent-form').fadeIn();
    });
});
$(".radio input[type='radio']").click(function() {
    var that = $(this);
    var id = that.val();

    $('.editEvent-form').fadeOut();
    $('#event-dropdown').html('');
    $('.editEvents-dropdown .dropdown-toggle').html('loading...');

    $.getJSON("/api/events/categories/" + id, function(data) {
        var items = [];
        events = data['events'];
        $.each(events, function(key, val) {
            items.push("<li><a id='" + val.id + "' href='#'>" + val.name + "</a></li>");
        });

        $('.editEvents-dropdown .dropdown-toggle').html(data['details'].name + ' Events <span class="caret"></span>');
        $('.event-dropdown').addClass('dropdown-menu');
        $('.event-dropdown').html(items);

    });
});

/* addCoordinator */
$(".addCoordinator-form .event-dropdown").on('click', 'a', function(e) {
    var eventID = $(this).attr('id');
    $(".addCoordinator-form input[name='eventid']").val(eventID);
});
