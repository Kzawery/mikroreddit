<template>
  <Navbar/>
	<div class="post" style="width: 100vw; padding-top: 80px" v-for='post in posts' :post="post" v-bind:key="post.author">
        <Post v-for='post in posts' :post="post" :inpost="true" v-bind:key="post.author"/>
        <Comment class="comment-section" v-for='comment in comments' :comment="comment" v-bind:key="comment.id"/>
    </div>
</template>
<script>

import Navbar from './Navbar';
import { ref } from 'vue'
import getPosts from '../post-loader'
import getComments from '../comments-loader'
import Comment from './Comment'
import Post from './Post'
export default {
    components: {
        Navbar,
        Comment,
        Post
     },
     
    setup() {
        const posts = ref(getPosts(1))
        const comments = ref(getComments(5))
        return {
            posts,    
            comments
        }
    },

}
</script>

<style>
    .comment-section {
        margin-left: auto;
        margin-right: auto;
        max-width: 600px; 
        padding: 5px;
    }

	.sort {
		padding-top :70px;
	}
	.sort-btn {
		background-color: Transparent;
		background-repeat:no-repeat;
		border: none;
		cursor:pointer;
		overflow: hidden;
		outline:auto;
		margin: 5px;
	}
	.scrolling-component {
		padding-top: 60px;
        overflow-x: hidden;
	}
	.post {
		width: 30%;
		margin-left: auto;
		margin-right: auto;
        padding: 0px;
	}

    .like-button {
        border: none;
		cursor:pointer;
		overflow: hidden;
		outline:none;
		margin: 5px;
        width: 30px;
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