<template>
  <Navbar/>
  <div class="space"></div>
  <div v-if="subreddits.length === 0">No subreddits were found!</div>
  <div v-if="subreddits.length > 0">
    <SubredditResult ref="subreddits" v-for="subreddit in subreddits" :subreddit="subreddit" :inpost="false" v-bind:key="subreddit.id"/>
  </div>
  <div v-if="posts.length === 0">No posts were found!</div>
  <div v-if="posts.length > 0">
    <Post ref="posts" v-for='post in posts' :post="post" :inpost="false" v-bind:key="post.author"/>
  </div>
</template>

<script>
import Navbar from "./Navbar";
import axios from "../services/axios";
import authHeader from "../services/auth";
import Post from "./Post";
import SubredditResult from "./SubredditResult";
import socketio from "../services/socketio";
export default {
  data: function() {
    return {
      posts : [],
      subreddits : []
    };
  },

  components: {
    SubredditResult,
    Navbar,
    Post,
  },
  name: "SearchResults",
  mounted() {
    axios.get(`/search`, {headers: authHeader(), params: {query: this.$route.params.query}}).then((resp) => {
      this.posts.push(...resp.data.posts);
      this.subreddits.push(...resp.data.subreddits);
    });
    socketio.on(`post/del`, (e) => {
      this.posts.splice(this.posts.findIndex(
          x => Number(x.id) === Number(e)
      ),1);
    });
  }
}
</script>

<style lang="scss" scoped>
@import "./src/SCSS/colors";
  .space {
    padding-top: 80px;
  }

  @media screen and (max-width: 600px) {
    .space {
      padding-top: 150px;
    }
  }
</style>