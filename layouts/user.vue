<template>
  <v-app dark>
    <v-container>
        <Nuxt />
    </v-container>
    
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>

  </v-app>
</template>

<script>
export default {

}
</script>

<style>

</style>