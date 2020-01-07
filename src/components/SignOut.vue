<template>
    <div class="mx-auto pb-5 signup-block rounded">
        <h1 class="my-5 pt-5 text-white">You signed out.</h1>
        <b-button
            pill
            to="/login"
            variant="primary"
            class="hero-btn"
            size="lg"
        >Sign back in</b-button>
    </div>
</template>

<script>
import axios from 'axios';
// eslint-disable-next-line
axios.defaults.headers.Authorization = 'Bearer ' + localStorage.getItem('token');

export default {
  name: 'SignOut',
  props: ['currentUser', 'userImage', 'isLoggedIn', 'loginError', 'registrationError'],
  data() {
    return {

    };
  },
  methods: {
    register() {
      const payload = {
        username: this.form.username,
        password: this.form.password,
      };
      this.$emit('register', payload);
      this.initForm();
    },
    initForm() {
      this.form.username = '';
      this.form.password = '';
    },
  },
};
</script>
<style scoped>
  .signup-block {
    width: 300px;
    background: rgb(31, 20, 10);
  }

  .signup-sub-text,
  .navbar-dark
  .navbar-nav
  .router-link-active,
  .navbar-dark
  .router-link-exact-active {
    color: greenyellow;
  }

  .nav-user-icon {
    height: 35px;
    width: 35px;
  }
  .nav-placeholder-user-icon {
    font-size: 25px;
    /* height: 30px;
    width: 30px; */
  }

</style>
