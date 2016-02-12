var showEventCategories = function() {
    //$(".main-page").slideUp();
};

var hideEventDetails = function() {
   // $(".event-details").slideUp('slow');
}

$(".explore-button").click(showEventCategories);

function showModal(){
    $(".login-model").fadeIn();
}
function clickOutside(e){
    var container = $(".login-content");
    if(!container.is(e.target) && container.has(e.target).length ==0 )
        $(".login-model").fadeOut();
}

function submitSignUp() {
    $('.login-loader').fadeIn();
    $('.signup-msg').hide();
    var formData = {
        'form'              : 'signup',
        'name' 				: $('#signupform input[name=name]').val(),
        'college' 			: $('#signupform input[name=college]').val(),
        'city' 				: $('#signupform input[name=city]').val(),
        'email' 			: $('#signupform input[name=email]').val(),
        'contact' 			: $('#signupform input[name=contact]').val(),
        'password' 	        : $('#signupform input[name=password]').val()
    };

    $.post('login.php', formData).done(function(response) {
        var data = $.parseJSON(response);
        $('.signup-msg').fadeIn();
        if ( ! data.success) {
            $('.signup-msg').html(data.error);
            $('.signup-msg').removeClass('msg-success');
        	$('.signup-msg').addClass('msg-error');
        } else {
            $('#signupform').trigger('reset');
            $('.signup-msg').html("Awesome! You can Log In now!");
            $('.signup-msg').removeClass('msg-error');
        	$('.signup-msg').addClass('msg-success');
        }
        $('.login-loader').fadeOut();
    });
}

var cssRule =
    "color: #fff;" +
    "font-size: 35px;" +
    "font-weight: bold;" +
    "text-shadow: 1px 1px 5px rgb(249, 162, 34);background: red;" +
    "filter: dropshadow(color=rgb(249, 162, 34), offx=1, offy=1);";
console.log("%cDON'T MESS WITH THIS WEBSITE, INSTEAD DEVELOP ONE (IF YOU HAVE THE GUTS)", cssRule);
console.log("%cDeveloped By :","color: red;font-size: 20px;" );
console.log("%cLokesh Devnani & Udit Vasu","color: blue; font-size: 20px; font-weight: bold;");
