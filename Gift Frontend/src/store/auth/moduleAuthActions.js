/*=========================================================================================
  File Name: moduleAuthActions.js
  Description: Auth Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import firebase from 'firebase/app'
import 'firebase/auth'
import router from '@/router'
import realtime from '@/classes/socketclient';

import Auth from "@/auth/authService"

export default {
  loginAttempt({ dispatch }, payload) {
    if(payload.checkbox_remember_me) {
      return Auth.rememberMe().then(() => {
        return dispatch('login', payload);
      })
    } else {
      return dispatch('login', payload);
    }
  },
  loginAttempt_old({ dispatch }, payload) {
    const newPayload = {
      userDetails: payload.userDetails,
      notify: payload.notify
    }
    if (!payload.checkbox_remember_me) {
      // localStorage.setItem('remember_me', false);
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(function () {
          dispatch('login', newPayload)
        })
        .catch(function (err) {
          payload.notify({
            time: 2500,
            title: 'Error',
            text: err.message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          });
        });
    } else {
      // localStorage.setItem('remember_me', true);
      dispatch('login', newPayload)
    }
  },

  login({ commit, state }, payload) {
    console.log("===========login ================");
    if (state.isUserLoggedIn()) {
      payload.notify({
        title: 'Login Attempt',
        text: 'You are already logged in!',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'warning'
      });
      return false
    }

    Auth.authenticate(payload.userDetails.email, payload.userDetails.password)
      .then(({error, data}) => {
        if(error) {
          return payload.notify({
            title: error.code,
            text: error.message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'warning'
          });
        }
        Auth.localLogin(data);
        console.log("===========authenticate then");
        router.push(router.currentRoute.query.to || "/");
      })
      .catch(error => {
        payload.notify({
          time: 2500,
          title: 'Error',
          text: error.message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        })
      })
  },

  login_old({ commit, state }, payload) {
    if (state.isUserLoggedIn()) {
      payload.notify({
        title: 'Login Attempt',
        text: 'You are already logged in!',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'warning'
      });
      return false
    }

    firebase.auth().signInWithEmailAndPassword(payload.userDetails.email, payload.userDetails.password)
      .then((result) => {
        router.push(router.currentRoute.query.to || '/');
        commit('UPDATE_AUTHENTICATED_USER', result.user.providerData[0])
      }, (err) => {
        payload.notify({
          time: 2500,
          title: 'Error',
          text: err.message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        });
      })
  },

  // Google Login
  loginWithGoogle({ commit, state }, payload) {
    if (state.isUserLoggedIn()) {
      payload.notify({
        title: 'Login Attempt',
        text: 'You are already logged in!',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'warning'
      });
      return false
    }
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        router.push(router.currentRoute.query.to || '/');
        commit('UPDATE_AUTHENTICATED_USER', result.user.providerData[0])
      }).catch((err) => {
        payload.notify({
          time: 2500,
          title: 'Error',
          text: err.message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        });
      })
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        user.updateProfile({
          roles: ['admin'],
        }).then(function () {
          // Profile updated successfully!
          // Login user
          console.log('success');
          // this.$vs.notify({
          //     title: 'Success',
          //     text: "done",
          //     iconPack: 'feather',
          //     icon: 'icon-check',
          //     color: 'success'
          // });
        }, function (error) {
          console.log("uiiiiiiiii");
          console.log(error.message);
          // this.$vs.notify({
          //     title: 'Error',
          //     text: error.message,
          //     iconPack: 'feather',
          //     icon: 'icon-alert-circle',
          //     color: 'danger'
          // });
        });

      }
    });
  },

  // Facebook Login
  loginWithFacebook({ commit, state }, payload) {
    if (state.isUserLoggedIn()) {
      payload.notify({
        title: 'Login Attempt',
        text: 'You are already logged in!',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'warning'
      });
      return false
    }
    const provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        router.push(router.currentRoute.query.to || '/');
        commit('UPDATE_AUTHENTICATED_USER', result.user.providerData[0])
      }).catch((err) => {
        payload.notify({
          time: 2500,
          title: 'Error',
          text: err.message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        });
      })
  },

  // Twitter Login
  loginWithTwitter({ commit, state }, payload) {
    if (state.isUserLoggedIn()) {
      payload.notify({
        title: 'Login Attempt',
        text: 'You are already logged in!',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'warning'
      });
      return false
    }
    const provider = new firebase.auth.TwitterAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        router.push(router.currentRoute.query.to || '/');
        commit('UPDATE_AUTHENTICATED_USER', result.user.providerData[0])
      }).catch((err) => {
        payload.notify({
          time: 2500,
          title: 'Error',
          text: err.message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        });
      })
  },

  // Github Login
  loginWithGithub({ commit, state }, payload) {
    if (state.isUserLoggedIn()) {
      payload.notify({
        title: 'Login Attempt',
        text: 'You are already logged in!',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'warning'
      });
      return false
    }
    const provider = new firebase.auth.GithubAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        router.push(router.currentRoute.query.to || '/');
        commit('UPDATE_AUTHENTICATED_USER', result.user.providerData[0])
      }).catch((err) => {
        payload.notify({
          time: 2500,
          title: 'Error',
          text: err.message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        });
      })
  },
  updateAuthenticatedUser({ commit }, payload) {
    commit('UPDATE_AUTHENTICATED_USER', payload)
  }
}
