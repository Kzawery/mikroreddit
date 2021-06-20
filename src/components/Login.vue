<template>
  <body class="text-center" cz-shortcut-listen="true" >
    <form class="form-signin">
      <h1 class="h3 mb-3 font-weight-normal">Please log in</h1>
      <label for="inputUsername" class="sr-only">Username</label>
      <input id="inputUsername"  v-model="username" class="form-control" placeholder="Username" required="" autofocus="" style="margin-bottom: 10px; margin-top:10px;">
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" v-model="password" class="form-control" placeholder="Password" required="">
      <button class="btn btn-lg btn-primary btn-block" @click="login" style="margin: 0px; margin-bottom: 10px; margin-top:10px;">Login</button>
      <router-link to="/register">
        <button class="btn btn-lg btn-primary btn-block" style="margin: 0px;">Sign in</button>
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
          password: '',
          username: ''
        };
},
    methods: {
        login: async function () {
            await axios.post("/auth/login", {
              username: this.username,
              password: this.password
            } ).then( (resp) => {
                localStorage.setItem("token", resp.data.token);
                localStorage.setItem("user", JSON.stringify(resp.data.user));
                this.$router.push("/");
            }). catch((error) => {
              console.log(error);
              this.error=true});
          },
    }
}
</script>

<style lang="scss" scoped>
@import "./src/SCSS/colors";
    .form-signin {
        width: 30%;
        margin: auto;
        max-width: 300px;
        padding-top: 100px;
    }
    @media screen and (max-width: 600px) {
      .form-signin {
        width: 60%;
      }
    }
</style>