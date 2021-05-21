<template>
  <Navbar/>
	<div class="sort">
		<button class="sort-btn">&#128293;hot</button>
		<button class="sort-btn">&#128118;new</button>
		<button class="sort-btn">&#128175;best</button>
	</div>
	<div class='scrolling-component' ref='scrollComponent'>
		<Post style="post" v-for='post in posts' :post="post" :inpost="false" v-bind:key="post.author"/>
	</div>
</template>
<script>

import Navbar from './Navbar';
import { ref, onMounted, onUnmounted } from 'vue'
import getPosts from '../post-loader'
import Post from './Post'
export default {
    components: {
        Navbar,
        Post
     },
     
    setup() {
        const posts = ref(getPosts(10))
        const scrollComponent = ref(null)
        const loadMorePosts = () => {
			let newPosts = getPosts(10)
			posts.value.push(...newPosts)
		}
        onMounted(() => {
			window.addEventListener("scroll", handleScroll)
		})

		onUnmounted(() => {
			window.removeEventListener("scroll", handleScroll)
		})
        const handleScroll = () => {
			
			let element = scrollComponent.value
			if ( element.getBoundingClientRect().bottom <= window.innerHeight ) {
				loadMorePosts()
			}
		}
        return {
            posts,
            scrollComponent
        }
    },

}
</script>

<style>
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
		padding-top: 20px;
	}
	.post {
		width: 30%;
		margin-left: auto;
		margin-right: auto;
	}
</style>