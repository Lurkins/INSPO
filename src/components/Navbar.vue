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
                    placeholder="Jane Doe"
                ></b-input>

                <label class="sr-only" for="inline-form-input-username">Username</label>
                <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
                    <b-input id="inline-form-input-username" placeholder="Username"></b-input>
                </b-input-group>
                <b-button variant="primary">Login</b-button>
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
export default {
  name: 'Navbar',
  data() {
    return {
      msg: 'TestLogo',
    };
  },
  methods: {

  },
};
</script>
<style scoped>

</style>
