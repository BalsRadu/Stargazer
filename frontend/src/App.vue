<template>
  <div id="app">
    <HeaderComponent v-if="isAuthenticated"/>
    <router-view />
    <FooterComponent v-if="isAuthenticated"/>
  </div>
</template>

<script>
  import HeaderComponent from "@/components/HeaderComponent.vue"
  import FooterComponent from "@/components/FooterComponent.vue"

  export default {
    components: {
      HeaderComponent,
      FooterComponent
    },
    computed: {
      isAuthenticated () {
        return this.$store.state.isAuthenticated;
      }
    },
  }

</script>

<style lang="scss">
  @import "./assets/scss/main.scss";
</style>