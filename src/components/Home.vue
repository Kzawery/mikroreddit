<template>
  <Navbar/>
  <div id="myModal" class="modal">
    <div class="modal-content">
      <div style="width: 100%; align-content: end;"><span class="close" @click="closeModal">&times;</span></div>
      <div style="width: 100%; align-content: center; margin-bottom: 15px">
        <h4 class="text-nowrap">Create subreddit</h4>
      </div>
      <form style="width: 100%; align-items: center">
        <div style="width: 70%; margin-left: auto;
    margin-right: auto;">
          <input class="form-control" v-model="subname" style="margin-bottom: 5px; width: 100%" type="text" placeholder="Subname" required>
          <input class="form-control" v-model="description" style="margin-bottom: 5px" placeholder="Description" required>
          <div style="width: 100%; align-content: center">
            <button class="btn btn-primary" style="margin-bottom: 5px" @click="save">Save Changes</button>
          </div>
        </div>
      </form>
    </div>
  </div>
	<div class='scrolling-component' ref='scrollComponent'>
    <div class="sorthome">
      <button class="sort-btn" @click="orderBy('new')" >&#128118;new</button>
      <button class="sort-btn" @click="orderBy('best')">&#128175;best</button>
      <button class="sort-btn" @click="openModal">&#10133; create</button>
    </div>
		<Post ref="posts" v-for='post in posts' :post="post" :inpost="false" v-bind:key="post.author"/>
	</div>
</template>
<script>

import Navbar from './Navbar';
import Post from './Post'
import axios from "../services/axios";
import authHeader from "../services/auth";

export default {
    components: {
        Navbar,
        Post
     },
  data: function () {
      return {
        posts : [],
        page: 0,
        sort: "best",
        subname: "",
        description: ""
      }
  },
  methods: {
      async getPosts() {
        await axios.get(`/posts?page=${this.page}`, {headers: authHeader(), params : {'sort': this.sort}})
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
            console.log(this.page);
            this.getPosts();
          }
        }
      },
      openModal() {
        let modal = document.getElementById('myModal')
        modal.style.display = 'block'
      },
      closeModal() {

        let modal = document.getElementById('myModal')
        modal.style.display = 'none'
      },
      save() {
        let subname = this.subname;
        let description = this.description;
        axios.post(`/subreddits/create`, {'subname': subname, 'description': description}, {headers: authHeader()}).then(
            ()=>{
              this.closeModal();
              this.$router.push(`/r/${subname}`);
            }
        ).catch(()=>{
          alert("Subreddit with this name already exists");
        })
      },
      async orderBy(text) {
        if(this.sort !== text) {
          this.sort = text;
          this.posts = [];
          this.page = 0;
          await this.getPosts();
        }
      }
  },
    async beforeMount() {
      await this.getPosts();
    },
    async mounted() {
      await this.getFeed();
  }
}
</script>

<style lang="scss" scoped>
@import "./src/SCSS/colors";
	.sorthome {
    padding-bottom: 10px;
    padding-top: 50px;
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
  .modal {
    background-color: rgba(191, 185, 185, 0.5);
  }
	.modal-content{
    margin-top: 100px;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
  @media screen and (max-width: 600px) {
    .sorthome {
      padding-top: 90px;
    }
  }
</style>