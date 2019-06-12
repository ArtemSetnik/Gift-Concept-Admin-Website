<template>
    <div id="loading-bg">
      <div class="loading-logo">
        <img src="@/assets/images/logo/logo.png" alt="Logo">
      </div>
      <div class="loading">
        <div class="effect-1 effects"></div>
        <div class="effect-2 effects"></div>
        <div class="effect-3 effects"></div>
      </div>
    </div>
</template>

<script>
export default {
    methods: {
        handleLoginEvent(data) {
          console.log('handleLoginEvent');
            this.$store.dispatch('auth/updateAuthenticatedUser', {
                displayName: data.profile.username,
                email: data.profile.email,
                photoURL: data.profile.avatar,
            })
            this.$router.push(data.state.target || "/");
        }
    },
    created() {
        this.$auth.handleAuthentication();
        if (this.$auth.isAuthenticated()) this.$router.push('/');
    }
};
</script>

<style lang="scss">
@import "../assets/css/loader.css"
</style>
