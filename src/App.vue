<script setup lang="ts">
import { ref } from "vue";
import Post from "./components/Post.vue";
import Card from "./components/Card.vue";

type Post = {
  id: number;
};

const posts = ref<Post[]>([]);

const initialState = ref<number[]>([]);

const history = ref<{ text: string; index: number; state: number[] }[]>([]);

fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((json) => {
    //push the first 5 results into posts
    posts.value.push(...json.slice(0, 5));
    //store initial state to reset on last time travel. this will be omitted in the UI
    initialState.value.push(...posts.value.map((post) => post.id));
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
    text: `Moved post ${movedPost.id} from index ${index} to index ${newIndex}`,
    index: newIndex,
    state: posts.value.map((post) => post.id), //save the state of the posts
  });
};

const goBack = (index: number) => {
  console.log(index);
  // get the target state from the history
  const targetState = history.value[index].state;
  //reset the posts to the initial state if user select the first history entry
  if (index === 0) {
    posts.value = initialState.value.map(
      (id) => posts.value.find((post) => post.id === id)!
    );
  } else {
    posts.value = targetState.map(
      (id) => posts.value.find((post) => post.id === id)!
    );
  }
  //remove all history items after the selected one
  history.value.splice(index);
};
</script>

<template>
  <div
    class="flex flex-row gap-x-16 justify-center pt-10 bg-slate-200 h-screen text-neutral-700"
  >
    <div v-auto-animate class="w-1/2 gap-y-4 flex flex-col">
      <h1 class="text-3xl font-medium">Sortable Post List</h1>
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
      <Card class="min-w-100">
        <div class="p-6">
          <h2 class="text-2xl font-medium">List of actions commited</h2>
        </div>
        <div class="bg-neutral-100 p-6">
          <div v-if="history.length === 0" class="p-6 text-center">
            No actions commited yet
          </div>

          <Card v-else v-auto-animate class="divide-y divide-solid">
            <div v-for="(item, index) in history" :key="item.index" class="p-6">
              {{ item.text }}
              <button
                v-if="index !== history.length - 1"
                @click="goBack(index)"
                class="text-gray-700 bg-green-400 rounded py-2 px-4 ml-4"
              >
                Time travel
              </button>
            </div>
          </Card>
        </div>
      </Card>
    </div>
  </div>
</template>

<style scoped></style>
