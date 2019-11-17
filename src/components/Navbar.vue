<template>
    <div>
    <b-navbar class="mb-5" toggleable="lg" type="dark" variant="success" fixed="top">
        <b-navbar-brand to="/">{{ msg }}</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
            <b-nav-item href="#">Link</b-nav-item>
            <b-nav-item href="#" disabled>Disabled</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown text="Sign In" right>
                <b-dropdown-form class="p-3">
                    <h5>Sign in to existing account</h5>
                    <label class="sr-only" for="inline-form-input-username">Username</label>
                    <b-input
                        id="inline-form-input-username"
                        class="mb-2 drop-input"
                        placeholder="Username"
                        v-model="form.username"
                    ></b-input>

                    <label class="sr-only" for="inline-form-input-password">Password</label>
                    <b-input
                        id="inline-form-input-password"
                        v-model="form.password"
                        placeholder="Password"
                        class="mb-2 mb-2 drop-input"
                    ></b-input>
                    <b-button @click="onSubmit" variant="primary">Login</b-button>
                </b-dropdown-form>
            </b-nav-item-dropdown>
            <b-nav-item-dropdown text="Register" right>
                <b-dropdown-form class="p-3">
                    <h5>Register New User</h5>
                    <label class="sr-only" for="inline-form-input-username">Username</label>
                    <b-input
                        id="inline-form-input-username"
                        class="mb-2 drop-input"
                        placeholder="Username"
                        v-model="form.username"
                    ></b-input>

                    <label class="sr-only" for="inline-form-input-password">Password</label>
                    <b-input
                        id="inline-form-input-password"
                        v-model="form.password"
                        placeholder="Password"
                        class="mb-2 drop-input"
                    ></b-input>
                    <b-button @click="onSubmit" variant="primary">Login</b-button>
                </b-dropdown-form>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
                <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
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
  data() {
    return {
      msg: 'TestLogo',
      form: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    initForm() {
      this.username = '';
      this.password = '';
    },
    onSubmit(evt) {
      evt.preventDefault();
      const path = 'http://localhost:5000/auth';
      const payload = {
        username: this.form.username,
        password: this.form.password,
      };
      axios.post(path, payload)
        .then((res) => {
          if (!res.data.data.token) {
            this.loginFailed();
            return;
          }

          localStorage.token = res.data.data.token;
          this.error = false;

          this.$router.replace(this.$route.query.redirect || '/profile');
          // eslint-disable-next-line
          console.log(res);
        //   this.onReset(evt);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
      // eslint-disable-next-line
      console.log(this.form.username);
    },

  },
};
</script>
<style scoped>
    .drop-input {
        width: 300px;
    }
</style>
