<template>
  <div id="app">
    <AdminHeaderComponent v-if="isAdminAuthenticated"/>
    <HeaderComponent v-if="isUserAuthenticated"/>
    <router-view />
    <FooterComponent v-if="isUserAuthenticated"/>
    <AdminFooterComponent v-if="isAdminAuthenticated"/>
  </div>
</template>

<script>
  import HeaderComponent from "@/components/HeaderComponent.vue"
  import FooterComponent from "@/components/FooterComponent.vue"

  import AdminHeaderComponent from "@/components/AdminHeaderComponent.vue"
  import AdminFooterComponent from "@/components/AdminFooterComponent.vue"

  export default {
    components: {
      HeaderComponent,
      FooterComponent,
      AdminFooterComponent,
      AdminHeaderComponent
      
    },
    computed: {
      isUserAuthenticated () {
        return this.$store.state.isUserAuthenticated;
      },
      isAdminAuthenticated () {
        return this.$store.state.isAdminAuthenticated;
      }
    },
  }

</script>

<style lang="scss">
  @import "./assets/scss/main.scss";
</style>