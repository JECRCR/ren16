var showEventCategories = function() {
    $(".main-page").slideUp();
};

var hideEventDetails = function() {
    $(".event-details").slideUp('slow');
}

$(".explore-button").click(showEventCategories);
