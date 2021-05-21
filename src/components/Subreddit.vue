<template>
  <Navbar/>
    <div id="myModal" class="modal">
        <div class="modal-content">
            <span class="close" @click="closeModal">&times;</span>
            <p>Some text in the Modal..</p>
        </div>
    </div>
	<div class="sort">
		<button class="sort-btn">&#128293;hot</button>
		<button class="sort-btn">&#128118;new</button>
		<button class="sort-btn">&#128175;best</button>
        <button class="sort-btn">&#128578;join</button>
        <button class="sort-btn">&#128577;leave</button>
        <button class="sort-btn" @click="this.list = !this.list">sort</button>
        <button class="sort-btn" @click="openModal">add post</button>
	</div>
	<div class='scrolling-component' ref='scrollComponent'>
        <div></div>
		<Post style="post" v-for='post in posts' :post="post" :list="list" :inpost="false" v-bind:key="post.author"/>
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
    data(){
        return {
            list: false
        }
    },
    methods: {
        openModal() {
            let modal = document.getElementById('myModal')
            modal.style.display = 'block'
        },
        closeModal() {
            let modal = document.getElementById('myModal')
            modal.style.display = 'none'
        },
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
            scrollComponent,
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
    .close {
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    }

    .close:hover,
    .close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
    }
	.post {
		width: 30%;
		margin-left: auto;
		margin-right: auto;
	}
    .modal {
        display: none; /* Hidden by default */
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        padding-top: 100px; /* Location of the box */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
        }

        /* Modal Content */
    .modal-content {
        background-color: #fefefe;
        margin: auto;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
    }
</style>