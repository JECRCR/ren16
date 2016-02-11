var apiUrl = '../api/';
$(document).ready(function(){
    $.ajax({
        url: apiUrl+"events/categories/1",
        method: 'GET',
        dataType: 'json',
        success: function(data){
            console.log(data);
        }
    });
});