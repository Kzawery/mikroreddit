<template>
  <Navbar/>
  <div style="padding-top: 80px;"></div>
  <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet">
        <div class="card">
          <div class="card-body">
            <div class="e-profile">
              <div class="row">
                <div class="col-12 col-sm-auto mb-3">
                </div>
                <div class="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                  <div class="text-center text-sm-left mb-2 mb-sm-0">
                    <h4 class="pt-sm-2 pb-1 mb-0 text-nowrap">John Smith</h4>
                    <p class="mb-0">@johnny.s</p>
                  </div>
                  <div class="text-center text-sm-right">
                    <span class="badge badge-secondary">administrator</span>
                    <div class="text-muted"><small>Joined 09 Dec 2017</small></div>
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
                            <div class="form-group">
                              <label>Email</label>
                              <input class="form-control" type="text" placeholder="user@example.com">
                            </div>
                          </div>
                          <div class="col">
                            <div class="form-group">
                              <label>Username</label>
                              <input class="form-control" type="text" name="username" placeholder="johnny.s" value="johnny.s">
                            </div>
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
                              <input class="form-control" type="password" placeholder="••••••">
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col">
                            <div class="form-group">
                              <label>New Password</label>
                              <input class="form-control" type="password" placeholder="••••••">
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col">
                            <div class="form-group">
                              <label>Confirm <span class="d-none d-xl-inline">Password</span></label>
                              <input class="form-control" type="password" placeholder="••••••"></div>
                          </div>
                        </div>
                      </div>
                      
                    </div>
                    <div class="col">
                        <button class="btn btn-primary" type="submit">Save Changes</button>
                    </div>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>

      <!-- <div class="col-12 col-md-3 mb-3">
        <div class="card mb-3">
          <div class="card-body">
            <div class="px-xl-3">
              <button class="btn btn-block btn-secondary">
                <i class="fa fa-sign-out"></i>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div> -->
</template>

<script>
import Navbar from './Navbar';
export default {
    components: {
        Navbar,
    }
}
</script>

<style>
    .card {
        max-width: 500px;
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
        /* margin: 10px; */
    }
    .profile {
        padding-top:130px;
        width: 20%;
        margin: auto;
        max-width: 300px;
    }
    .form-control {
        margin-left: auto;
        margin-right: auto;
    }
</style>