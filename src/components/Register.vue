<template>
  <body class="text-center" cz-shortcut-listen="true">
    <form class="form-signin">
      <img class="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">
      <h1 class="h3 mb-3 font-weight-normal">Register</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input id="inputUsername" class="form-control" placeholder="Email address" required="" autofocus="">
      <label for="inputUsername" class="sr-only">Username</label>
      <input type="email" id="inputEmail" class="form-control" placeholder="Username" required="" autofocus="">
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="Password" required="">
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me"> Remember me
        </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
    </form>
    <form class="form-signin" style="padding-top: 10px;">
        <router-link to="/login">
            <button class="btn btn-lg btn-primary btn-block">Login</button>
        </router-link>
    </form>
  </body>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
export default {

}
</script>

<style>
  .form-signin {
        width: 30%;
        margin: auto;
        max-width: 300px;
    }
</style>