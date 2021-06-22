<template>
  <body class="text-center" cz-shortcut-listen="true" >
    <form class="form-signin">
      <h1 class="h3 mb-3 font-weight-normal">Please log in</h1>
      <div v-if="error" style="color: red">Invalid username or password</div>
      <label for="inputUsername" class="sr-only">Username</label>
      <input id="inputUsername"  v-model="username" class="form-control" placeholder="Username" autofocus="" style="margin-bottom: 10px; margin-top:10px;" required>
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" v-model="password" class="form-control" placeholder="Password" required>
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
          username: '',
          error: false
        };
},
    methods: {
        login: async function () {
          if(this.username === '' || this.password === '') return;
            await axios.post("/auth/login", {
              username: this.username,
              password: this.password
            } ).then((resp) => {
                localStorage.setItem("token", resp.data.token);
                localStorage.setItem("user", JSON.stringify(resp.data.user));
                this.$router.push("/");
            }). catch(() => {this.error=true});
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