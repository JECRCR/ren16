var showEventCategories = function() {
    $(".main-page").slideUp();
};
var showEventDetails = function() {
    $(".event-details").slideDown('slow');
};
var hideEventDetails = function() {
    $(".event-details").slideUp('slow');
}

$(".explore-button").click(showEventCategories);
$(".event-icon").click(showEventDetails);
