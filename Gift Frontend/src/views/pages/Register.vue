<!-- =========================================================================================
		File Name: Register.vue
		Description: Register Page
		----------------------------------------------------------------------------------------
		Item Name: Vuesax Admin - VueJS Dashboard Admin Template
			Author: Pixinvent
		Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div class="h-screen flex w-full bg-img">
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 mx-auto self-center">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row">
            <div class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center">
              <img src="@/assets/images/pages/register.jpg" alt="register" class="mx-auto">
            </div>
            <div class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center d-theme-dark-bg">
              <div class="p-8">
                <div class="vx-card__title">
                  <h4 class="mb-4">Select Account Type</h4>
                  <p>Please select a account type you want.</p>
                </div>
                <div class="clearfix">
                  <vs-button to="/seller/register" class="w-full my-6">Seller Register</vs-button>
                  <vs-button to="/driver/register" class="w-full mb-12">Driver Register</vs-button>
                  <vs-button type="border" to="/pages/login" class="w-full mt-12">Go to Login</vs-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
      isTermsConditionAccepted: true
    };
  },
  computed: {
    validateForm() {
      return (
        !this.errors.any() &&
        this.username != "" &&
        this.email != "" &&
        this.password != "" &&
        this.confirm_password != "" &&
        this.isTermsConditionAccepted === true
      );
    }
  },
  methods: {
    registerUser() {
      if (!this.validateForm) return false;
      if (this.$store.state.auth.isUserLoggedIn()) {
        this.notifyAlreadyLogedIn();
        return;
      }

      // create user using firebase
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          () => {
            this.$vs.notify({
              title: "Account Created",
              text: "You are successfully registered!",
              iconPack: "feather",
              icon: "icon-check",
              color: "success"
            });
          },
          error => {
            this.$vs.notify({
              title: "Error",
              text: error.message,
              iconPack: "feather",
              icon: "icon-alert-circle",
              color: "danger"
            });
          }
        );

      // update user profile. In this case add username
      const username = this.username;
      const loginPayload = {
        userDetails: {
          email: this.email,
          password: this.password
        },
        notify: this.$vs.notify
      };
      const store = this.$store;
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          user
            .updateProfile({
              displayName: username
            })
            .then(
              function() {
                // Profile updated successfully!
                // Login user
                store.dispatch("auth/login", loginPayload);
              },
              function(error) {
                this.$vs.notify({
                  title: "Error",
                  text: error.message,
                  iconPack: "feather",
                  icon: "icon-alert-circle",
                  color: "danger"
                });
              }
            );
        }
      });
    },
    notifyAlreadyLogedIn() {
      this.$vs.notify({
        title: "Login Attempt",
        text: "You are already logged in!",
        iconPack: "feather",
        icon: "icon-alert-circle",
        color: "warning"
      });
    }
  }
};
</script>
