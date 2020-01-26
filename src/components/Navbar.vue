<template>
    <div>
    <b-navbar class="mb-5 navbar" toggleable="lg" variant="dark" type="dark" fixed="top">
        <b-navbar-brand
          class="logo"
          to="/">{{ msg }}
        <font-awesome-icon :icon="['fa', 'lightbulb']" />
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
            <b-nav-item to="/items">All Items</b-nav-item>
            <b-nav-item v-if="isLoggedIn" to="/myitems">My Items</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown
              v-if="!isLoggedIn"
              text="Login"
              right
              id="nav-login-text"
              class="pt-1"
            >
                <b-dropdown-form class="p-3">
                    <h5>Login to existing account</h5>
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
                </b-dropdown-form>
            </b-nav-item-dropdown>
            <b-nav-item-dropdown v-if="!isLoggedIn" text="Register" right class="pt-1">
                <b-dropdown-form class="p-3">
                    <h5>Register New User</h5>
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
                    <b-button pill @click="register" variant="primary">Register</b-button>
                </b-dropdown-form>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-if="userImage" v-slot:button-content>
                <b-img
                  :src="`${apiUrl}/file/${userImage}`"
                  :alt="currentUser"
                  class="nav-user-icon"
                  rounded="circle"
                ></b-img>
            </template>
            <template v-else v-slot:button-content>
              <font-awesome-icon
                class="nav-placeholder-user-icon"
                :icon="['fa', 'user-circle']"
              />
              <!-- <em>User</em> -->
            </template>
            <b-dropdown-item v-if="isLoggedIn" to="/profile">Profile</b-dropdown-item>
            <b-dropdown-item
              v-if="isLoggedIn"
              @click="signout"
              to="/signout"
            >Sign Out</b-dropdown-item>
            <b-dropdown-item v-else to="/signout">You are not logged in</b-dropdown-item>
            </b-nav-item-dropdown>
        </b-navbar-nav>
        </b-collapse>
    </b-navbar>
    </div>
</template>

<script>
import axios from 'axios';
// eslint-disable-next-line
axios.defaults.headers.Authorization = 'Bearer ' + localStorage.getItem('token');

export default {
  name: 'Navbar',
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
    signout() {
      this.$emit('signout');
    },
  },
};
</script>
<style scoped>
  .navbar {
    /* background: rgb(31, 20, 10); */
    background-color: black;
    border-bottom: solid greenyellow 5px;
  }

  .drop-input {
      width: 300px;
  }

  ul.navbar-nav .nav-item .router-link-active, nav.navbar .router-link-exact-active {
    color: greenyellow;
  }

  /* .navbar-dark .navbar-nav li.show > .nav-link {
    color: greenyellow;
  } */
  /* #nav-login-text a {
    color: greenyellow;
  } */

  .nav-user-icon {
    height: 35px;
    width: 35px;
  }
  .nav-placeholder-user-icon {
    font-size: 25px;
    /* height: 30px;
    width: 30px; */
  }

  /* .navbar-dark .navbar-nav .active {
    color:greenyellow!important
  } */


</style>
