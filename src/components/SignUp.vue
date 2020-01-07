<template>
    <div class="mx-auto pb-5 signup-block rounded">
        <h1 class="mt-5 pt-5 text-white">Sign Up</h1>
        <p class="signup-sub-text">Enter a username and a password.</p>
        <b-form class="p-3 mx-auto">
            <b-alert
                :show="this.registrationError"
                variant="danger"
            >Registration failed. Make sure password is at least 5 characters.
            </b-alert>
            <label
                class="sr-only"
                for="inline-form-input-register-username"
            >Username</label>
            <b-input
                id="inline-form-input-username"
                class="mb-2 drop-input"
                placeholder="Username"
                v-model="form.username"
                required
            ></b-input>

            <label
                class="sr-only"
                for="inline-form-input-register-password"
            >Password</label>
            <b-input
                id="inline-form-input-password"
                v-model="form.password"
                placeholder="Password"
                class="mb-2 drop-input"
                required
            ></b-input>
            <b-button pill @click="register" class="mt-5" variant="primary">Submit</b-button>
        </b-form>
    </div>
</template>

<script>
import axios from 'axios';
// eslint-disable-next-line
axios.defaults.headers.Authorization = 'Bearer ' + localStorage.getItem('token');

export default {
  name: 'SignUp',
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
