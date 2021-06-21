<template>
<div class="post">
  <div class="card-body">
    <div style="text-align: end;"><p v-if="moderator || post.user_id === user.id" @click="delPost" class="header-icon">&#10060;</p></div>
    <h5 class="card-title">{{post.title}}</h5>
    <h6 class="card-user">posted by user: {{post.nickname}} on: <router-link :to="'/r/' + post.subname">/r/{{post.subname}}</router-link></h6>
    <p class="card-text" v-html="URLify(post.content)"></p>
    <img :src="post.imagepath"/>
    <div v-if="post.videourl" class="iframe-container">
        <iframe
        :src="parseyt(post.videourl)">
        </iframe>
    </div>
    <br>
    <div class="bottom-panel">
        <div>
            <button @click="upvote" :class="{upvoted: upvoted}" class="button-like">&#128077;</button>
            <span class="votes">{{ amount }}</span>
            <button @click="downvote" :class="{downvoted: downvoted}" class="button-like">&#128078;</button>
            <router-link v-if="!inpost" :to="'/r/' + post.subname + '/posts/' + post.id">&#128172; Comments</router-link>
            <p v-if="inpost" class="header-icon" @click="showReplayArea = !showReplayArea">&#128172; Comment</p>
        </div>
        <div v-if="showReplayArea" class="comment-div">
            <textarea class="form-control" style="max-width: 100%;" v-model="commentholder" aria-label="With textarea"></textarea>
             <div class="reply-btn" @click="comment">
                <p class="header-icon" style="display:flex">Comment&#128073;</p>
            </div>
        </div>
    </div>
  </div>
</div>
</template>
<script>
import axios from "../services/axios";
import authHeader from "../services/auth";

export default {

	props: {
		post: Object,
    inpost: Boolean,
	},
    data: function() {
    return {
      upvoted: false,
      downvoted: false,
      showReplayArea: false,
      amount: 0,
      commentholder: "",
      member: false,
      moderator: false,
      user: JSON.parse(localStorage.getItem('user'))
    }
    },
    methods: {
    upvote: async function () {
      if(this.downvoted) {
        this.amount++;
      }
      if(this.upvoted) {
        this.amount--;
      } else {
        this.amount++;
      }
      this.upvoted = !this.upvoted;
      this.downvoted = false;
      await axios.post(`/posts/upvote/${this.post.id}`, {}, {headers: authHeader()}).then((resp) => {
        console.log(resp);
      }).catch((err) => {
        console.log(err);
      })
    },
    URLify: function(string){
      const URLMatcher = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\\/%=~_|$])/igm
      const urls = string.match(URLMatcher);
      if (urls) {
        urls.forEach(function (url) {
          string = string.replace(url, '<a target="_blank" href="' + url + '">' + url + "</a>");
        });
      }
      return string.replace("(", "<br/>(");
    },
    downvote: async function() {
      if(this.upvoted) {
        this.amount--;
      }
      if(this.downvoted) {
        this.amount++;
      } else {
        this.amount--;
      }
      this.downvoted = !this.downvoted;
      this.upvoted = false;
      axios.post(`/posts/downvote/${this.post.id}`, {}, {headers: authHeader()}).then((resp) => {
        console.log(resp);
      }).catch((err) => {
        console.log(err);
      })
    },
    delPost: function (){
      console.log(this.post);
        axios.post(`/posts/delete`,{'id': this.post.id, 'subname': this.post.subname},{headers: authHeader()}).then(()=>{
          this.$router.go(0);
        }).catch((err) => {
          console.log(err)});
    },
    parseyt: function (url) {
      url = url.split("watch?v=");
      return url[0] + "embed/" +url[1];
    },
    comment: function () {
      axios.post(`/comments/add`, {'content': this.commentholder, 'postId': this.post.id}, {headers: authHeader()})
          .then(()=>{
            this.commentholder = '';
            this.showReplayArea = false;
          })
          .catch((err) => {
        console.log(err)});
    },
    },
  async beforeMount() {
    await axios.get(`users/subreddit/moderator/${this.post.subname}`,  {headers: authHeader()}).then((resp) => {
      if(resp.data.rows.length > 0) {
        this.moderator = true;
      } else {
        this.moderator = false;
      }
    }).catch(() => {});

    this.amount = this.post.votes;
    if (this.post.upvoted === 1) {
      this.upvoted = true;
    } else if (this.post.upvoted === -1) {
      this.downvoted = true;
    }
  },
}
</script>
<style lang="scss" scoped>
  @import "./src/SCSS/colors";
    .button-like {
      border: none;
      cursor:pointer;
      overflow: hidden;
      outline:none;
      margin: 5px;
      width: 30px;
    }
    .header-icon {
      font-size: 16px;
      margin: 0px;
      cursor: pointer;
      user-select: none;
      display: inline;
    }
    .reply-btn {
      display: inline-block;
      align-items: center;
      background: $white;
      margin-top: 3px;
    }
    .form-control {
        resize: none;
    }
    .bottom-panel{
        text-align: start;
    }
    .card-text {
        text-align: start;
    }
    .card-user {
        color: $gray;
        text-align: start;
    }
    img {
        width: 100%;
        padding-bottom: 10px;
    }
    .card-body {
        border: 1px solid $gray;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
    }
    .votes {
        display: inline-block;
        text-align: center;
        width: 1.5em;
    }

    .upvoted {
    background-color: $upvote;
    color: white;
    }

    .downvoted {
    background-color: $downvote;
    color: white;
    }
    .post {
      position: relative;
      background: $white;
      overflow: hidden;
      margin-bottom: 10px;
    }
    
    .iframe-container{
    position: relative;
    width: 100%;
    padding-bottom: 56.25%; 
    height: 0;
    }
    .iframe-container iframe{
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    }
	.post h2 {
		font-size: 1.3em;
		padding-bottom: 0.25rem;
	}
</style>