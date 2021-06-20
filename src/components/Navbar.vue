<template>

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <div class="topnav">
    <router-link class="nav-link" to="/">Mikroreddit</router-link>
    <router-link class="nav-link" to="/profile">Profile</router-link>
    <router-link class="nav-link" @click="logout" to="/logout">Logout</router-link>
<!--    <button class="btn btn-outline-success" style="float: right" @click="logout">Logout</button>-->
    <div class="search-container">
      <form>
        <div>
          <input class="search" type="text" v-model="searchbar" placeholder="Search.." name="search">
          <button type="submit" @click="search"><i class="fa fa-search"></i></button>
        </div>
      </form>
    </div>
  </div>

</template>
  
<script>
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  name: 'Navbar',
  props: {
    msg: String
  },
  data: function() {
    return {
      searchbar: ''
    }
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/login");
    },
    search(){
      console.log(this.searchbar);

      this.$router.push({ path: `/search/${this.searchbar}`})
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./src/SCSS/colors";

* {box-sizing: border-box;}

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}

.topnav {
  overflow: hidden;
  background-color: #a2eb94;
  z-index: 100;
  position: fixed;
  width: 100%;
}

.topnav a {
  float: left;
  display: block;
  color: $black;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: $white;
  color: $black;
}

.topnav a.active {
  background-color: $light-green;
  color: $white;
}

.topnav .search-container {
  float: right;
}

.topnav input[type=text] {
  padding: 6px;
  margin-top: 8px;
  font-size: 17px;
  border: none;
}

.topnav button {
  float: right;
  padding: 6px 10px;
  margin-top: 8px;
  margin-right: 16px;
  background: $light-gray;
  font-size: 17px;
  border: none;
  cursor: pointer;
}

.topnav .search-container button:hover {
  background: #ccc;
}

@media screen and (max-width: 600px) {
  .button {
    float: start;
    background: $light-gray;
    font-size: 17px;
    border: none;
    cursor: pointer;
  }
  .search-container {
    width: 100%;
    align-content: start;
    padding-bottom: 5px;
  }
  .search {
    width: 80%;
  }
}

</style>
