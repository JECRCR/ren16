var showEventCategories = function() { };

var hideEventDetails = function() { };

$(".explore-button").click(showEventCategories);

function showLoginModal(){
    $(".login-modal").fadeIn();
}

function getRegEvents(token) {
    $.post('registrations.php', {token: token}).done(function(response) {
        var data = $.parseJSON(response);
        var content;
        if(data.length == 0){
            content = "No registrations found!";
        } else{
            content = '<ul>';
            data.forEach(function (item) {
              content = content + "<li>" + item.name + "<i>[ " + item.teamname + " ]</i></li>";
            });
            content += '</ul>';
        }
        $('.reg-events').html(content);
    });
}

function showAccountModal(){
    $(".account-modal").fadeIn();
    getRegEvents(sessionStorage.token);
}
function clickOutsideLogin(e){
    var container = $(".login-content");
    if(!container.is(e.target) && container.has(e.target).length ==0 )
        $(".login-modal").fadeOut();
}
function clickOutsideReg(e){
    var container = $(".account-content");
    if(!container.is(e.target) && container.has(e.target).length ==0 )
        $(".account-modal").fadeOut();
}

function isFormEmpty(data) {
    var empty = false;
    $.each( data, function( key, value ) {
        if(!value){
            empty = true;
            return false;
        }
    });
    return empty;
}

function createSession(token) {
    if(typeof(Storage) !== "undefined") {
        sessionStorage.token = token;
    } else {
        alert("Please update your browser!");
    }
}

function submitLogIn() {
    var formData = {
        'form'              : 'login',
        'email' 			: $('#loginform input[name=email]').val().trim(),
        'password' 	        : $('#loginform input[name=password]').val().trim()
    };

    if(isFormEmpty(formData)){
        alert("All fields are required!");
        return false;
    }

    $('.login-loader').fadeIn();
    $('.login-msg').hide();
    $.post('login.php', formData).done(function(response) {
        var data = $.parseJSON(response);
        $('.login-msg').fadeIn();
        if ( ! data.success) {
            $('.login-msg').html(data.error);
        	$('.login-msg').fadeIn();
        } else {
            createSession(data.token);
            location.reload();
        }
        $('.login-loader').fadeOut();
    });
}

function submitSignUp() {
    var formData = {
        'form'              : 'signup',
        'name' 				: $('#signupform input[name=name]').val().trim(),
        'college' 			: $('#signupform input[name=college]').val().trim(),
        'city' 				: $('#signupform input[name=city]').val().trim(),
        'email' 			: $('#signupform input[name=email]').val().trim(),
        'contact' 			: $('#signupform input[name=contact]').val().trim(),
        'password' 	        : $('#signupform input[name=password]').val().trim()
    };

    if(isFormEmpty(formData)){
        alert("All fields are required!");
        return false;
    }

    $('.login-loader').fadeIn();
    $('.signup-msg').hide();
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

function submitRegister() {
    var formData = {
        'form'              : 'register',
        'teamname' 			: $('#registerform input[name=teamname]').val().trim(),
        'team' 		        : $('#registerform textarea[name=teammembers]').val().trim(),
        'eventID' 		    : $('.event-details header h1').attr('id'),
        'token' 			: sessionStorage.token
    };

    if(isFormEmpty(formData)){
        alert("All fields are required!");
        return false;
    }

    $('.register-msg').fadeIn();
    $('.register-msg').html("Registering...");
    $.post('registrations.php', formData).done(function(response) {
        var data = $.parseJSON(response);
        if ( ! data.success) {
            $('.register-msg').html(data.error);
        } else {
            $('#registerform').trigger('reset');
            $('.register-msg').html("Thanks for registering!");
        }
    });
}

function initialize() {
            var mapCanvas = document.getElementById('venue-map');
            var mapOptions = {
                center: new google.maps.LatLng(26.784, 75.818,17),
                zoom: 15,
                disableDefaultUI: true,
                scaleControl: true,
                zoomControl: true,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles: [{"featureType":"landscape","stylers":[{"hue":"#FFBB00"},{"saturation":43.400000000000006},{"lightness":37.599999999999994},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#FFC200"},{"saturation":-61.8},{"lightness":45.599999999999994},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":51.19999999999999},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":52},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#0078FF"},{"saturation":-13.200000000000003},{"lightness":2.4000000000000057},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#00FF6A"},{"saturation":-1.0989010989011234},{"lightness":11.200000000000017},{"gamma":1}]}]
            };
            var map = new google.maps.Map(mapCanvas, mapOptions);
            var companyPos = new google.maps.LatLng(26.781571, 75.820218,17);
            var companyMarker = new google.maps.Marker({
                position: companyPos,
                map: map,
                title:"JECRC"
            });
            var infowindow = new google.maps.InfoWindow({
                content: "<img src='assets/img/site/college.jpg' style='width:100%;' />",
                disableAutoPan:true,
                maxWidth:120
            });

            google.maps.event.addListener(companyMarker, 'mouseover', function() {
                infowindow.open(map,companyMarker);
            });
            google.maps.event.addListener(companyMarker, 'mouseout', function() {
                infowindow.close();
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
