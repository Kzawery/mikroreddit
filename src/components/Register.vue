<template>
  <body class="text-center" cz-shortcut-listen="true">
    <form class="form-signin">
      <h1 class="h3 mb-3 font-weight-normal">Register</h1>
      <div v-if="error">
        Username or email was already used
      </div>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="email" id="inputEmail" v-model="email" class="form-control" placeholder="Email address" required="" autofocus="">
      <label for="inputUsername" class="sr-only">Username</label>
      <input id="inputUsername" v-model="username" class="form-control" placeholder="Username" required minlength="5">

      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" v-model="password" class="form-control" placeholder="Password" required minlength="5">
      <div v-if="diffrentPasswords" style="color: red">
        Passwords are not the same
      </div>
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="confirmPassword" v-model="confirmpassword" class="form-control" placeholder="Confirm Password" required minlength="5">
      <button class="btn btn-lg btn-primary" @click="register" type="submit">Sign in</button>
      <router-link to="/login">
        <button class="btn btn-lg btn-primary">Login</button>
      </router-link>
    </form>
  </body>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "../services/axios";
export default {
  data: function() {
    return {
      email: '',
      username: '',
      password: '',
      confirmpassword: '',
      diffrentPasswords: false,
      error: false
    }
  },
  methods: {
    register: function () {

      if(this.password !== this.confirmpassword) {
        this.diffrentPasswords = true;
        return;
      }
      if(this.email === '' || this.username === '' || this.password === '') return;
      axios.post("/auth/register", {
        email: this.email,
        username: this.username,
        password: this.password,
      }).then( () => {
        this.$router.push("/login");
      }). catch((error) => {
        console.log(error);
        this.error=true});
    },
  }
}
</script>
<style lang="scss" scoped>
  @import "./src/SCSS/colors";
  input {
    margin-bottom: 10px;
  }
  button {
    margin: 5px;
  }
  .form-signin{
    max-width: 200px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 100px;
  }
</style>