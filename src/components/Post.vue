<template>

<div class="post" style="width: 100vw;" v-if="list">
  <div class="card-body" style="text-align: start;">
    <div style="text-align: end;"><p class="header-icon">&#10060;</p></div>
    <h5 class="card-title list" style="text-align: start;
    font-weight: bold;">{{post.title}}</h5>
    <h6 class="card-user list">posted by user: {{post.user}} on: <router-link :to="'/r/' + post.subname">/r/{{post.subname}}</router-link></h6>
    <div style="display: flex">
        <div style="flex: auto; text-align: start">
            <p class="card-text list" >{{post.content}}</p>
            <a v-if="post.videourl" class=""
                :href="post.videourl"> link
            </a>
        </div>
        <img :src="post.imagepath" style="width: 150px; height: 150xp;"/>
    </div>
    
    <br>
    <div class="bottom-panel">
        <div>
            <button @click="upvote" :class="{upvoted: upvoted}" class="button-like">&#128077;</button>
            <span class="votes">{{ votes }}</span>
            <button @click="downvote" :class="{downvoted: downvoted}" class="button-like">&#128078;</button>
            <router-link v-if="!inpost" :to="'/r/' + post.subname + '/posts/id'">&#128172; Comments</router-link>
            <p v-if="inpost" class="header-icon" @click="showReplayArea = !showReplayArea">&#128172;Comment</p>
        </div>
        <div v-if="showReplayArea" class="comment-div">
            <textarea class="form-control" aria-label="With textarea"></textarea>
             <div class="reply-btn">
                <p class="header-icon" style="display:flex">Comment&#128073;</p>
            </div>
        </div>
    </div>
  </div>
</div>
<div class="post" style="width: 100vw;" v-if="!list">
  <div class="card-body">
    <div style="text-align: end;"><p class="header-icon">&#10060;</p></div>
    <h5 class="card-title">{{post.title}}</h5>
    <h6 class="card-user">posted by user: {{post.user}} on: <router-link :to="'/r/' + post.subname">/r/{{post.subname}}</router-link></h6>
    <p class="card-text">{{post.content}}</p>
    <img :src="post.imagepath"/>
    <div v-if="post.videourl != ''" class="iframe-container">
        <iframe
        :src="post.videourl">
        </iframe>
    </div>
    <br>
    <div class="bottom-panel">
        <div>
            <button @click="upvote" :class="{upvoted: upvoted}" class="button-like">&#128077;</button>
            <span class="votes">{{ votes }}</span>
            <button @click="downvote" :class="{downvoted: downvoted}" class="button-like">&#128078;</button>
            <router-link v-if="!inpost" :to="'/r/' + post.subname + '/posts/id'">&#128172; Comments</router-link>
            <p v-if="inpost" class="header-icon" @click="showReplayArea = !showReplayArea">&#128172;Comment</p>
        </div>
        <div v-if="showReplayArea" class="comment-div">
            <textarea class="form-control" aria-label="With textarea"></textarea>
             <div class="reply-btn">
                <p class="header-icon" style="display:flex">Comment&#128073;</p>
            </div>
        </div>
    </div>
  </div>
</div>

</template>
<script>
export default {
	props: {
		post: Object,
        inpost: Boolean,
        list: Boolean
	},
    data: function() {
    return {
      upvoted: false,
      downvoted: false,
      showReplayArea: false,
    }
    },
    methods: {
    upvote: function() {
      this.upvoted = !this.upvoted;
      this.downvoted = false;
    },
    downvote: function() {
      this.downvoted = !this.downvoted;
      this.upvoted = false;
    }
    },
    computed: {
    votes: function() {
      if (this.upvoted) {
        return this.post.votes + 1;
      } else if (this.downvoted) {
        return this.post.votes - 1;
      } else {
        return this.post.votes;
      }
    }
  }
    
}
</script>
<style scoped>
    .button-like {
        border: none;
		cursor:pointer;
		overflow: hidden;
		outline:none;
		margin: 5px;
        width: 30px;
    }
    .list {
        font-size: 12px;
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
        background: white;
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
        color: #888;
        text-align: start;
    }
    img {
        width: 100%;
        padding-bottom: 10px;
    }
    .card-body {
        border: 1px solid #dddd;
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
    background-color: #FF8B60;
    color: white;
    }

    .downvoted {
    background-color: #9494FF;
    color: white;
    }
	.post {
		background: #fff;
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