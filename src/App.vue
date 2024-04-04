<script setup lang="ts">
import { ref } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import Post from "./components/Post.vue";

type Post = {
  id: number;
};

const posts = ref<Post[]>([]);

fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((json) => {
    //push the first 5 results into posts
    posts.value.push(...json.slice(0, 5));
  });

const movePost = (index: number, direction: number) => {
  const movedPost = posts.value[index];
  const newIndex = index + direction;

  posts.value.splice(index, 1);
  posts.value.splice(newIndex, 0, movedPost);

  // this.history.push({
  //   text: `Moved Post ${movedPost.id} from index ${index} to index ${newIndex}`,
  //   index: newIndex,
  // });
  console.log(index, posts.value);
};
</script>

<template>
  <Post
    v-for="post in posts"
    :key="post.id"
    :id="post.id"
    @click:move-down="movePost(post.id, 1)"
    @click:move-up="movePost(post.id, -1)"
  />
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped></style>
