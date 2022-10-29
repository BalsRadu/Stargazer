<template>
    <div class="view feed">
      
      <article class="post" v-for="post in feed" :key="post.id">
        <header class="post-user">
          <img class="profile-picture" src="https://place-hold.it/30" />
          <span>{{ post.display_name }}</span>
          <button class="delete-post" @click="deletePost(post['_id'])">Delete Post</button>
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
    data() {
            return {
              feed: this.$store.state.feed,
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
      },
      deletePost(postId) {
      let api_url = this.$store.state.api_url
      this.$http.post(api_url + 'admin/deletepost', {
          postId: postId,
      }).then(response => {
          if(response.data.success){  
            let result = this.feed.find(post => {
              return post['_id'] === postId
            })
            this.feed.splice(this.feed.indexOf(result),1);
          }else{
              this.error = response.data.msg
              this.hasErrors = true
          }
        })
      }
    },
  }
  </script>
  
  <style lang="scss" scoped>
  .delete-post{
    
    position: relative;
    left: 70%;
    height: 20px;
    width: 120px;
  }

  div{
    color: #aaa;
  }
  
  </style>