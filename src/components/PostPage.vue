<template>
  <Navbar/>
      <div style="padding-top: 100px">
        <Post v-for='post in posts' :post="post" :inpost="true" v-bind:key="post.author"/>
        <div class="comment-section">
        <Comment  v-for='comment in comments' :comment="comment" v-bind:key="comment.id"/>
        </div>
      </div>
</template>
<script>

import Navbar from './Navbar';
import Comment from './Comment'
import Post from './Post'
import axios from "../services/axios";
import authHeader from "../services/auth";
import socketio from "../services/socketio";
export default {
    components: {
        Navbar,
        Comment,
        Post
     },
  data: function () {
    return {
      posts : [],
      comments: [],
      page: 0,
    }
  },
  methods: {
    async getPost() {
      await axios.get(`/posts/${this.$route.params.id}`, {headers: authHeader()})
          .then((res) => {
            if(res.data.length > 0) {
              this.posts.push(...res.data);
            } else {
              this.$router.push('/');
            }
          }, (err) => {
            console.log(err);
            this.$router.push('/');
          })
    },
    async getComments() {
      await axios.get(`/comments/${this.$route.params.id}`, {headers: authHeader(), params : {'page': this.page}})
          .then((res) => {
            this.comments.push(...res.data)
            this.page++;
          }, (err) => {
            console.log(err)
          })
    },
  },
  mounted() {
    socketio.on(`comment/add`, (e) => {
      this.comments.unshift(e);
    });
    socketio.on(`comment/del`, (e) => {
      this.comments.splice(this.comments.findIndex(
          x => Number(x.id) === Number(e)
      ),1);
    });
  },
  async beforeMount() {
      await this.getPost();
      await this.getComments();
    },
}
</script>

<style lang="scss" scoped>
@import "./src/SCSS/colors";
  .comment-section {
      margin-left: auto;
      margin-right: auto;
      max-width: 600px;
      width: 100vw;
  }
</style>