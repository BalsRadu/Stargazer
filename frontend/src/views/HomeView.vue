<template>
  <div class="view feed">
    
    <article class="post" v-for="post in feed" :key="post.id">
      <header class="post-user">
        <img class="profile-picture" src="https://place-hold.it/30" />
        <span>{{ post.display_name }}</span>
      </header>
      <section class="post-picture">
        <img :src="post.image" :alt="post.desc" class="post-image">
      </section>
      <footer class="post-desc">
        <p class="description">
          <strong>{{ post.display_name}}:</strong> 
          <span>{{ post.desc }}</span>
        </p>
        <p class="timestamp">{{ timestampToDate(post.timestamp) }}</p>
      </footer>
    </article>
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