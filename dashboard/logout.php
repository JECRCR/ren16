<?php
   /*
    * Unset all the $_SESSION variables
    */
   session_start();
   session_unset();
   session_destroy();
   header('Location: /dashboard');

?>
