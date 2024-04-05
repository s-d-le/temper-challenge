<script setup lang="ts">
import { ref } from "vue";
import Post from "./components/Post.vue";

type Post = {
  id: number;
};

const posts = ref<Post[]>([]);

const history = ref<{ text: string; index: number; state: number[] }[]>([]);

fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((json) => {
    //push the first 5 results into posts
    posts.value.push(...json.slice(0, 5));
  });

const movePost = (index: number, direction: number) => {
  const movedPost = posts.value[index];
  const newIndex = index + direction;

  //remove the selected post from the array
  posts.value.splice(index, 1);
  //insert the post at the new index
  posts.value.splice(newIndex, 0, movedPost);

  //history of the action
  history.value.push({
    text: `Moved Post ${movedPost.id} from index ${index} to index ${newIndex}`,
    index: newIndex,
    state: posts.value.map((post) => post.id), //save the state of the posts
  });

  console.log(index, history.value);
};

const goBack = (index: number) => {
  const targetState = history.value[index].state;
  //replace posts with the order stored in history.value.state
  posts.value = targetState.map(
    (id) => posts.value.find((post) => post.id === id)!
  );
  //remove all history items after the selected one
  history.value.splice(index + 1);
};
</script>

<template>
  <div>
    <Post
      v-for="(post, index) in posts"
      :key="post.id"
      :id="post.id"
      @click:move-down="movePost(index, 1)"
      @click:move-up="movePost(index, -1)"
      :hide-up-button="index === 0"
      :hide-down-button="index === posts.length - 1"
    />
  </div>
  <div>
    <h2>History</h2>
    <ul>
      <li v-for="(item, index) in history" :key="item.index">
        {{ item.text }}
        <button @click="goBack(index)">Time travel</button>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
