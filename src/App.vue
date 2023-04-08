<script setup>
const data = [
  {
    title: "My Blog - Ceblog",
    link: "https://ceblog.vercel.app",
  },
  {
    title: "My Github Page - celiae",
    link: "https://ceblog.vercel.app",
  },
];
const jump = (link) => {
  window.open(link);
};
</script>

<template>
  <div class="container">
    <div class="">
      <h1>Welcome</h1>
      <h2>Hi! These are my work.</h2>
    </div>
    <div class="card-wrapper">
      <div class="card" v-for="d in data" :key="d.title">
        <div @click="jump(d.link)">
          {{ d.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 2rem;
}
.card-wrapper {
  display: grid;
  grid-template-columns: auto auto;
}
.card {
  display: grid;
  align-items: center;
  padding-inline: 1rem;
  margin: 1rem;
  background: rgb(255, 164, 60);
  font-size: 1.2rem;
  cursor: pointer;
  color: rgb(46, 77, 66);
  font-weight: 800;
  transition: all 1s;
  height: 3rem;
}
.card:hover {
  background: rgb(233, 137, 27);
  padding-inline: 2rem;
}
</style>
