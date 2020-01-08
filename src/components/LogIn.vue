<template>
    <div class="mx-auto pb-5 login-block rounded">
        <h1 class="mt-5 pt-5 text-white">Login</h1>
        <p class="signup-sub-text">Enter your username and password.</p>
        <b-form class="p-3">
            <b-alert
                :show="this.loginError"
                variant="danger"
            >Invalid login credentials.</b-alert>
            <label class="sr-only" for="inline-form-input-login-username">Username</label>
            <b-input
                id="inline-form-input-login-username"
                class="mb-2 drop-input"
                placeholder="Username"
                v-model="form.username"
                required
            ></b-input>
            <label class="sr-only" for="inline-form-input-login-password">Password</label>
            <b-input
                id="inline-form-input-login-password"
                v-model="form.password"
                placeholder="Password"
                class="mb-2 mb-2 drop-input"
                required
            ></b-input>
            <b-button pill @click="login" variant="primary">Login</b-button>
        </b-form>
    </div>
</template>

<script>
import axios from 'axios';
// eslint-disable-next-line
axios.defaults.headers.Authorization = 'Bearer ' + localStorage.getItem('token');

export default {
  name: 'LogIn',
  props: ['currentUser', 'userImage', 'isLoggedIn', 'loginError', 'registrationError'],
  data() {
    return {
      msg: 'INSPO',
      form: {
        username: '',
        password: '',
      },
      apiUrl: process.env.VUE_APP_APIURL,
    };
  },
  methods: {
    login() {
      const payload = {
        username: this.form.username,
        password: this.form.password,
      };
      this.$emit('login', payload);
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
  .login-block {
    width: 300px;
    background: rgb(31, 20, 10);
  }

  .signup-sub-text {
    color: greenyellow;
  }
</style>
