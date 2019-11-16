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
            <b-nav-form>
              <label class="sr-only" for="inline-form-input-name">Name</label>
                <b-input
                    id="inline-form-input-name"
                    class="mb-2 mr-sm-2 mb-sm-0"
                    placeholder="Username"
                    v-model="form.username"
                ></b-input>

                <label class="sr-only" for="inline-form-input-username">Username</label>
                <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
                    <b-input
                        id="inline-form-input-username"
                        v-model="form.password"
                        placeholder="Password">
                    </b-input>
                </b-input-group>
                <b-button @click="onSubmit" variant="primary">Login</b-button>
            </b-nav-form>


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

</style>
