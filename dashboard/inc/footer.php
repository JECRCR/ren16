    <script src='../assets/js/jquery-1.11.2.min.js'></script>
    <script src='../assets/js/bootstrap.min.js'></script>
    <script type="text/javascript">
        function getRegistrationsList(id) {
            $(".table").fadeOut();
            $.post( "users.php", { eventID: id })
              .done(function( data ) {
                  var rows = jQuery.parseJSON(data);
                  var tbody='';
                  rows.forEach(function(rows) {
                      tbody += '<tr>';
                      $.each( rows, function( key, val ) {
                          tbody += "<td>" + val + "</td>";
                    });
                    tbody += '</tr>';
                });
                $(".table tbody").html(tbody);
                $(".table").fadeIn();
                $("#reg").html( $(".btn:first-child").text() + " : " + rows.length );
            });
        }

        function getEvents(id) {
            $('#event-dropdown').html('');
            $('.dropdown-toggle').html('loading...');

            $.getJSON( "/api/events/categories/"+id, function( data ) {
                var items = [];
                events = data['events'];
                $.each( events, function( key, val ) {
                    items.push( "<li><a id='" + val.id + "' href='#'>" + val.name + "</a><b>0</b></li>");
                });

                $('.dropdown-toggle').html(data['details'].name + ' Events <span class="caret"></span>');
                $('#event-dropdown').addClass('dropdown-menu');
                $('#event-dropdown').html(items);

                $.post( "regCount.php", { eventID: id })
                  .done(function( data ) {
                      events = obj = $.parseJSON( data );;
                      $.each( events, function( key, val ) {
                          $('#'+val.id).next().html(val.count);
                      });
                });

            });
        }

        $("#event-dropdown").on('click','a',function(){
            $(".btn:first-child").html($(this).text()+ ' <span class="caret"></span>');
            $(".btn:first-child").val($(this).text());
            var id = $(this).attr('id');
            getRegistrationsList(id);
        });
        $(".radio input[type='radio']").click(function() {
            var that = $(this);
            var id = that.val();
            getEvents(id);

        });
    </script>

    <?php
        if($eventID==0){
            //
        } else{
            echo '
                <script type="text/javascript">
                    getEvents('.$eventID.');
                </script>
            ';
        }
    ?>
</body>
</html>
