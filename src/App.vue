<template>
  <div id="app">
    <Navbar
      @login="onSubmitLogin($event)"
      @register="onSubmitRegister($event)"
      :currentUser="currentUser"
      :isLoggedIn="isLoggedIn"
    />
    <transition name="fade-slide-up" mode="out-in">
      <router-view
        :currentUser="currentUser"
        :isLoggedIn="isLoggedIn"
        :userImage="userImage"
        :currentUserId="currentUserId"
      />
    </transition>
  </div>
</template>

<script type="text/javascript">
import axios from 'axios';
import Navbar from './components/Navbar.vue';

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      isLoggedIn: false,
      currentUser: '',
      currentUserId: '',
      userImage: '',
    };
  },
  methods: {
    getUserData() {
      if (localStorage.token) {
        const path = `${process.env.VUE_APP_APIURL}/users/user`;
        axios.get(path, { headers: { Authorization: `Bearer ${localStorage.token}` } })
          .then((res) => {
            this.isLoggedIn = true;
            this.currentUser = res.data.username;
            // eslint-disable-next-line
            this.currentUserId = res.data._id.$oid;
            this.userImage = res.data.image_name;
          })
          .catch((error) => {
            // eslint-disable-next-line
            console.error(error);
          });
      } else {
        // eslint-disable-next-line
        console.log('there is no token');
      }
    },
    onSubmitLogin(payload) {
      const path = `${process.env.VUE_APP_APIURL}/auth`;
      axios.post(path, payload)
        .then((res) => {
          if (!res.data.data.token) {
            this.loginFailed();
            return;
          }
          localStorage.token = res.data.data.token;
          this.isLoggedIn = true;
          this.currentUser = res.data.data.username;
          this.userImage = res.data.image_name;
          this.$router.replace(this.$route.query.redirect || '/profile');
          this.error = false;
          // eslint-disable-next-line
          console.log(res);
        //   this.onReset(evt);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    onSubmitRegister(payload) {
      const path = `${process.env.VUE_APP_APIURL}/register`;
      axios.post(path, payload)
        .then((res) => {
          if (!res.data.data.token) {
            this.loginFailed();
            return;
          }
          localStorage.token = res.data.data.token;
          this.isLoggedIn = true;
          this.currentUser = res.data.data.username;
          this.userImage = res.data.image_name;
          this.$router.replace(this.$route.query.redirect || '/profile');
          this.error = false;
          // eslint-disable-next-line
          console.log(res);
        //   this.onReset(evt);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
  },
  created() {
    this.getUserData();
  },
};

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

.fade-slide-up-enter-active {
  transition: all 0.5s ease;
}
.fade-slide-up-leave-active {
  transition: all 0.5s ease;
}
.fade-slide-up-enter, .fade-slide-up-leave-to {
  /* transform: translateY(40px); */
  opacity: 0;
}
</style>
