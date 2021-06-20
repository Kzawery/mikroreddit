<template>
  <div class="comment">
        <div class="comment-head">
            <div style="display: flex; align-items: center;">
                <p class="header-text" style="white-space: nowrap;">{{comment.user}}</p>
                <div style="width:100%"></div>
                <div style="text-align: end;" @click="deleteComment">
                  <p class="header-icon">&#10060;</p>
                </div>
            </div>
          <div class="separator"></div>
        </div>
        <div class="comment-body">
            <p class="header-text">{{comment.content}}</p>
        </div>
    </div>
</template>

<script>
import axios from "../services/axios";
import authHeader from "../services/auth";

export default {
    props: {
		comment: Object
	},
  methods: {
    deleteComment(){
      axios.delete(`comments/${this.comment.id}`, {headers: authHeader()}).then(()=> {}).catch(() => {});
    }
  },
  beforeMount() {
  }
}
</script>

<style lang="scss" scoped>
  @import "./src/SCSS/colors";
    .comment {
        padding: 5px;
        margin-bottom: 5px;
        min-height: 60px;
        background: $white;
        border: 1px solid $gray;
    }
    .comment-head {
        width: 100%;
        background: $white;
        text-align: start;
    }
    .comment-body {
      padding: 5px;
      text-align: start;
    }
    .separator {
        width: 100%;
        height: 2px;
        background: gray;
    }
    .header-text {
        font-size: 12px;
        margin-bottom: 5px;
    }
    .header-icon {
        font-size: 16px;
        margin: 0px;
        cursor: pointer;
        user-select: none;
    }

</style>    