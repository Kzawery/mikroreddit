<template>
  <body class="text-center" cz-shortcut-listen="true" >
    <form class="form-signin">
      <img class="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="" style="margin-bottom: 10px; margin-top:10px;">
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="Password" required="">
        <span class="forgot-password" @click="forgotPassword()" style="margin-bottom: 10px; margin-top:10px;"> Forgot password?</span>
      <button class="btn btn-lg btn-primary btn-block" type="submit" style="margin: 0px; margin-bottom: 10px; margin-top:10px;">Login</button>
    </form>
    <form class="form-signin" >
        <router-link to="/register">
            <button class="btn btn-lg btn-primary btn-block" style="margin: 0px;">Sign in</button>
        </router-link>
    </form>
  </body>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";

export default {
    methods: {
        forgotPassword: function() {
          console.log('forgot password')
        }
    }
}
</script>

<style>
    .form-signin {
        width: 30%;
        margin: auto;
        max-width: 300px;
    }
    .forgot-password:hover {
      text-decoration: underline;
      cursor: pointer;
    }
</style>