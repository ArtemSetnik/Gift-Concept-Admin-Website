<!-- =========================================================================================
    File Name: Error500.vue
    Description: 500 Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
    <div class="h-screen flex w-full bg-img">
        <div class="vx-col flex items-center justify-center flex-col sm:w-1/2 md:w-3/5 lg:w-3/4 xl:w-1/2 mx-auto text-center">
            <img src="../../assets/images/pages/500.png" alt="graphic-500" class="mx-auto mb-4">
            <h1 class="mb-12 text-5xl d-theme-heading-color">{{ error.code }}</h1>
            <p class="mb-16 d-theme-text-inverse">{{ error.message }}</p>
            <vs-button size="large" :to="to">Go to back</vs-button>
        </div>
    </div>
</template>

<script>
export default {
  computed: {
    error() {
      var error = this.$router.currentRoute.query.error;
      if(error.code) return error;
      return {
        code: "Internal Server Error!",
        message: error
      }
    },
    to() {
      return this.$router.currentRoute.query.to || "/";
    }
  }
}
</script>

