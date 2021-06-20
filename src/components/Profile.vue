<template>
  <Navbar/>
  <div style="padding-top: 120px;"></div>
  <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet">
          <div class="card-body" style="width: 60%">
            <div class="e-profile">
              <div class="row">
                <div class="col-12 col-sm-auto mb-3">
                </div>
                <div>
                  <div>
                    <p>{{user.nickname}}</p>
                    <p>{{user.email}}</p>
                  </div>
                </div>
              </div>
              <div class="tab-content pt-3">
                <div class="tab-pane active">
                  <form class="form" novalidate="">
                    <div class="row">
                      <div class="col">
                        <div class="row">
                          <div class="col">
                          </div>
                          <div class="col">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <br>
                        <div class="mb-2"><b>Change Password</b></div>
                        <br>
                        <div class="row">
                          <div class="col">
                            <div class="form-group">
                              <label>Current Password</label>
                              <input class="form-control" v-model="current" type="password" placeholder="••••••">
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col">
                            <div class="form-group">
                              <label>New Password</label>
                              <input class="form-control" v-model="newpassword" type="password" placeholder="••••••">
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col">
                            <div class="form-group">
                              <label>Confirm <span class="d-none d-xl-inline">Password</span></label>
                              <input class="form-control" v-model="confirmpassword" type="password" placeholder="••••••"></div>
                          </div>
                        </div>
                      </div>
                      
                    </div>
                    <div class="col">
                        <button class="btn btn-primary" @click="savePassword">Save Changes</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
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