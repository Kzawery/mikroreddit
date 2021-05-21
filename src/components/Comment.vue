<template>
  <div class="comment">
        <div class="comment-head">
            <div style="display: flex; align-items: center;">
                <p class="header-text" style="white-space: nowrap;">{{comment.user}}</p>
                <div style="width:100%"></div>
                <div style="text-align: end;"><p class="header-icon">&#10060;</p></div>
            </div>
          <div class="separator"></div>
        </div>
        <div class="comment-body">
            <p class="header-text">{{comment.content}}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
		comment: Object
	},
}
</script>

<style>
    .reply-btn {
        display: inline-block;
        align-items: center;
        background: white;
        margin-top: 3px;
    }
    .form-control {
        resize: none;
    }
    .comment {
        padding: 5px;
        margin-bottom: 5px;
        min-height: 60px;
        background: white;
        border: 1px solid #dddd;
    }
    .comment-head {
        width: 100%;
        background: #FFF;
        text-align: start;
    }
    .comment-body {
        text-align: start;
    }
    .separator {
        width: 100%;
        height: 2px;
        background: gray;
    }
    .header-text {
        font-size: 12px;
        margin: 0px;
        margin-bottom: 5px;
    }
    .header-icon {
        font-size: 16px;
        margin: 0px;
        cursor: pointer;
        user-select: none;
    }

</style>    