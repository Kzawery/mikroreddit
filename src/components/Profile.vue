<template>
  <Navbar/>
  <div style="padding-top: 120px;"></div>
  <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet">
    <div class="card-body" style="width: 60%">
      <div>
        <p>{{user.nickname}}</p>
        <p>{{user.email}}</p>
      </div>
        <form class="form" novalidate="">
              <div class="mb-2"><b>Change Password</b></div>
              <br>
              <label>Current Password</label>
              <input class="form-control" v-model="current" type="password" placeholder="••••••">
              <label>New Password</label>
              <input class="form-control" v-model="newpassword" type="password" placeholder="••••••">
            <div class="form-group">
              <label>Confirm <span class="d-none d-xl-inline">Password</span></label>
              <input class="form-control" v-model="confirmpassword" type="password" placeholder="••••••"></div>
          <div class="col">
              <button class="btn btn-primary" @click="savePassword">Save Changes</button>
          </div>
        </form>
      </div>
</template>
<script>
import Navbar from './Navbar';
import axios from "../services/axios";
import authHeader from "../services/auth";
export default {
    components: {
        Navbar,
    },
    data: function() {
      return {
        user: JSON.parse(localStorage.getItem('user')),
        current: "",
        newpassword: "",
        confirmpassword: "",
      }
  },
  methods: {
      savePassword: async function () {
        if (this.newpassword === this.confirmpassword) {
          await axios.post(`users/changepassword/`, {'currentpassword': this.current, 'newpassword': this.newpassword}, {headers: authHeader()}).then(() => {
            localStorage.clear();
            this.$router.push("/login");
            console.log('halo');
          }).catch((err) => {
            console.log(err);
          });
        }
      },
  }
}
</script>

<style lang="scss" scoped>
@import "./src/SCSS/colors";
    .card-body{
      margin-left: auto;
      margin-right: auto;
    }
    button {
        margin: 10px;
    }
    input {
        margin-left: auto;
        margin-right: auto;
        max-width: 300px;
    }
    .row {
      display: block;
    }
    .form-control {
        margin-left: auto;
        margin-right: auto;
    }
</style>