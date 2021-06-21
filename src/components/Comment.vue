<template>
  <div class="comment">
        <div class="comment-head">
            <div style="display: flex; align-items: center;">
                <p class="header-text" style="white-space: nowrap;">{{comment.user}}</p>
                <div style="width:100%"></div>
                <div style="text-align: end;" v-if="comment.user_id === user.id || moderator" @click="deleteComment">
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
    comment: Object,
  },
  data: function () {
    return {
      user: JSON.parse(localStorage.getItem('user')),
      moderator: false
    }
  },
  methods: {
    deleteComment() {
      axios.delete(`comments/${this.comment.id}`, {headers: authHeader()}).then(() => {
      }).catch(() => {
      });
    },
  },
  async beforeMount() {
    await axios.get(`comments/moderator/${this.comment.id}`,  {headers: authHeader()}).then((resp) => {
      console.log(resp.data.name);
      axios.get(`users/subreddit/moderator/${resp.data.name}`,  {headers: authHeader()}).then((resp) => {
        if(resp.data.rows.length > 0) {
          this.moderator = true;
        } else {
          this.moderator = false;
        }
      }).catch(() => {});

    }).catch(() => {});
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