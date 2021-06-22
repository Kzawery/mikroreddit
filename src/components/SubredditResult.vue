<template>
  <div class="card-body">
    <a>Subreddit: </a><router-link :to="'/r/' + subreddit.name">r/{{subreddit.name}}</router-link>
    <br>
    <a>Description: </a><a class="description">{{subreddit.description}}</a>
  </div>
</template>

<script>
export default {
  name: "SubredditResult",
  props: {
    subreddit: Object
  },
}
</script>

<style lang="scss" scoped>
@import "./src/SCSS/colors";
.card-body {
  border: 1px solid $gray;
  max-width: 300px;
  max-height: 100px;
  margin-left: auto;
  margin-right: auto;
  padding: 5px;
  margin-top: 10px;
  text-align: initial;
}
a {
  text-align: start;
}
.description {
  color: $light-green;
}
</style>