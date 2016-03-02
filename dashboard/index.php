<?php
    require_once("inc/functions.php");

   /*
    * If posted information from login form
    */
   if (isset($_POST['submitLogin'])){
      if (check_credentials($_POST)){
         start_session($_POST['uname']);

      }else{
         $msg = "Invalid Login Credentials!";
      }
   }
   /*
    * If user is logged-in
    * redirect to home.php
    */
   if(isset($_SESSION['username'])){
       header('Location: home.php?u='.$_SESSION['username']);
   }

   require "inc/header.php";
?>
       <div class="container">
            <form method="POST" class="form-signin col-md-6 col-md-offset-3 col-xs-10 col-xs-offset-1">
                <?php
                     if(isset($msg)){
                         echo "<div class='alert alert-danger' role='alert'>Invalid Login Credentials!</div>";
                     }
                 ?>
                <input type="text" name="uname" class="form-control" placeholder="Username" required autofocus>
                <input type="password" name="pword" class="form-control" placeholder="Password" required>
                <button name="submitLogin" class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
            </form>
       </div>
   </body>
</html>
