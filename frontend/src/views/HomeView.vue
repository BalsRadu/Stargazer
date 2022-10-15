<template>
  <div class="view feed">
    
    <article class="post" v-for="post in feed" :key="post.id">
      <header class="post-user">{{ post.display_name }}</header>
      <section class="post-picture">
        <img :src="post.image" :alt="post.desc" class="post-image">
      </section>
      <footer class="post-desc">
        <p><strong>{{ post.display_name}}:</strong> {{ post.desc }}</p>
        <p class="timestamp">{{ timestampToDate(post.timestamp) }}</p>
      </footer>

    </article>

    <button @click="logout">Logout</button>
  </div>
</template>

<script>
export default {
  computed:{
    feed () {
      return this.$store.state.feed;
    }
  },
  methods: {
    logout () {
      this.$store.commit("logout");
    },
    timestampToDate (timestamp) {
      timestamp = new Number(timestamp);
      let date = new Date(timestamp);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      if (month < 10){
        month = "0" + month;
      }
      let day = date.getDay();
      if (day < 10){
        day = "0" + day;
      }

      return day + "/" + month + "/" + year;
    }
  }
}
</script>

<style lang="scss" scoped>

div{
  color: #aaa;
}

</style>