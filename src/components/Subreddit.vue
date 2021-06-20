<template>
  <Navbar/>
    <div id="myModal" class="modal">
        <div class="modal-content">
          <div style="width: 100%; align-content: end;"><span class="close" @click="closeModal">&times;</span></div>
              <div style="width: 100%; align-content: center; margin-bottom: 15px">
              <h4 class="text-nowrap">Add post</h4>
              </div>
          <form style="width: 100%; align-items: center">
            <div style="width: 70%; margin-left: auto;
    margin-right: auto;">
              <input class="form-control" v-model="title" style="margin-bottom: 5px; width: 100%" type="text" placeholder="Title" required>
              <textarea class="form-control" v-model="content" style="margin-bottom: 5px" placeholder="Content" required></textarea>
              <input class="form-control" v-model="link" style="margin-bottom: 5px" type="text" placeholder="Youtube link" pattern='(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?'>
              <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
              <div style="width: 100%; align-content: center">
                <button class="btn btn-primary" style="margin-bottom: 5px" @click="save">Save Changes</button>
              </div>
            </div>
          </form>
        </div>
    </div>

  <div id="editDesc" class="modal">
    <div class="modal-content">
      <div style="width: 100%; align-content: end;"><span class="close" @click="closeEditModal">&times;</span></div>
      <div style="width: 100%; align-content: center; margin-bottom: 15px">
        <h4 class="text-nowrap">Edit description</h4>
      </div>
      <form style="width: 100%; align-items: center">
          <textarea class="form-control" v-model="contentEdit" style="margin-bottom: 5px" placeholder="Content" required></textarea>
          <button class="btn btn-primary" style="margin-bottom: 5px" @click="edit">Save Changes</button>
      </form>
    </div>
  </div>

	<div class="sort" >
    <div v-text="subreddit.description"></div>
    <button class="sort-btn" @click="orderBy('new')" >&#128118;new</button>
    <button class="sort-btn" @click="orderBy('best')">&#128175;best</button>
    <button v-if="!member" @click="join" class="sort-btn">&#128578;join</button>
    <button v-if="member && !moderator" @click="leave" class="sort-btn">&#128577;leave</button>
    <button class="sort-btn" v-if="moderator" @click="openEditModal">&#128221;edit</button>
    <button class="sort-btn" v-if="member" @click="openModal">&#10133; post</button>
	</div>
	<div class='scrolling-component' ref='scrollComponent'>
        <div></div>
		<Post v-for='post in posts' :post="post" :inpost="false" v-bind:key="post.author"/>
	</div>
</template>
<script>

import Navbar from './Navbar';
import Post from './Post'
import axios from "../services/axios";
import authHeader from "../services/auth";
import socketio from "../services/socketio";

export default {
  components: {
    Navbar,
    Post
  },
  data: function () {
    return {
      posts : [],
      page: 0,
      file: '',
      title: '',
      content: '',
      link: '',
      sort: 'best',
      member: false,
      moderator: false,
      contentEdit: '',
      subreddit: {}
    }
  },
  methods: {
    getPosts() {
      axios.get(`/posts?page=${this.page}`, {headers: authHeader(), params: {'subname':this.$route.params.subname, 'sort': this.sort}})
          .then((res) => {
            console.log(res.data);
            this.posts.push(...res.data)
          }, (err) => {console.log(err)})
    },
    getFeed() {
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          this.page++;
          this.getPosts();
        }
      }
    },
    join(){
      this.member = !this.member;
      axios.post(`/subreddits/join`, {'subname': this.$route.params.subname, "userId": JSON.parse(localStorage.getItem('user')).id}, {headers: authHeader()}).then(()=>{
          });
    },
    openEditModal() {
      document.getElementById('editDesc').style.display = 'block';
    },
    closeEditModal() {
      document.getElementById('editDesc').style.display = 'none';
    },
    edit() {
      axios.put(`/subreddits/edit/${this.$route.params.subname}`, {description: this.contentEdit}, {headers: authHeader()}).then(() => {
        this.closeEditModal();
        this.subreddit.description = this.contentEdit;
      }).catch(() => {});
    },
    leave(){
        this.member = !this.member;
        axios.post(`/subreddits/leave`, {'subname': this.$route.params.subname}, {headers: authHeader()}).then(()=>{
      });
    },
    async orderBy(text) {
      if(this.sort !== text) {
        this.sort = text;
        this.posts = [];
        this.page = 0;
        await this.getPosts();
      }
    },
    handleFileUpload(){
      this.file = this.$refs.file.files[0];
    },
    save() {
      if(this.title==="" || this.content==="") return
      const formData = new FormData();
      formData.append("title", this.title);
      formData.append("content", this.content);
      formData.append("link", this.link);
      formData.append("subreddit", this.$route.params.subname);
      formData.append('file', this.file);


      axios.post(`/posts`, formData, {headers: authHeader(), 'Content-Type': 'multipart/form-data'}).then((resp) => {
        console.log(resp);
        this.closeModal();

        socketio.on(`post/add`, (e) => {
          this.posts.unshift(e);
        });

      }).catch((err) => {
        console.log(err);
      });

    },
    openModal() {
      let modal = document.getElementById('myModal')
      modal.style.display = 'block'
    },
    closeModal() {
      this.title = "";
      this.content = "";
      this.link = "";
      this.file = "";
      let modal = document.getElementById('myModal')
      modal.style.display = 'none'
    },
},
  async beforeMount() {

    await axios.get( `/subreddits/${this.$route.params.subname}`,{headers: authHeader()}).then((resp) => {
      console.log(resp);
      this.subreddit = resp.data;
    }).catch((err) => {
      console.log(err);
    });

    await axios.get(`users/subreddit/${this.$route.params.subname}`,  {headers: authHeader()}).then((resp) => {
      if(resp.data.rows.length > 0) {
        this.member = true;
      } else {
        this.member = false;
      }
    }).catch(() => {});

    await axios.get(`users/subreddit/moderator/${this.$route.params.subname}`,  {headers: authHeader()}).then((resp) => {
      if(resp.data.rows.length > 0) {
        this.moderator = true;
        this.member = true;
      } else {
        this.moderator = false;
      }
    }).catch(() => {});
    await this.getPosts();
  },
  async mounted() {
    await this.getFeed();
  }
}
</script>

<style lang="scss" scoped>
@import "./src/SCSS/colors";

	.sort {
    background: $light-green;
    padding-top: 70px;
	}
	.sort-btn {
		background-color: $transparent;
		background-repeat:no-repeat;
		border: none;
		cursor:pointer;
		overflow: hidden;
		outline:auto;
		margin: 5px;
	}
	.scrolling-component {
		padding-top: 20px;
	}
    .close {
        color: $light-gray;
        float: right;
        font-size: 28px;
        font-weight: bold;
    }

    .close:hover,
    .close:focus {
        color: $black;
        text-decoration: none;
        cursor: pointer;
    }
    .modal {
        display: none;
        position: fixed;
        z-index: 1;
        padding-top: 100px;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgb(0,0,0);
        background-color: rgba(0,0,0,0.4);
        }

    .modal-content {
        background-color: $white;
        margin: auto;
        padding: 20px;
        border: 1px solid $gray;
        width: 40%;
    }
@media screen and (max-width: 600px) {
  .sort {
    padding-top: 150px;
  }
  .modal-content {
    margin-top: 50px;
    width: 90%;
  }
}
  p > label {
    display: block;
  }
  textarea {
    max-width: 300px;
  }

  input:invalid {
    box-shadow: 0 0 5px 1px $red;
  }
  textarea:invalid {
    box-shadow: 0 0 5px 1px $red;
  }
  input:focus:invalid {
    box-shadow: none;
  }
</style>