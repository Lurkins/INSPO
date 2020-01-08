<template>
  <div id="app">
    <Navbar
      @login="onSubmitLogin($event)"
      @register="onSubmitRegister($event)"
      :currentUser="currentUser"
      :userImage="userImage"
      :isLoggedIn="isLoggedIn"
      :loginError="loginError"
      :registrationError="registrationError"
    />
    <transition name="fade-slide-up" mode="out-in">
      <router-view
        :currentUser="currentUser"
        :isLoggedIn="isLoggedIn"
        :userImage="userImage"
        :currentUserId="currentUserId"
        @submitFile="updateUserImage($event)"
        @register="onSubmitRegister($event)"
        :registrationError="registrationError"
        @login="onSubmitLogin($event)"
        :loginError="loginError"
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
      loginError: false,
      registrationError: false,
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
          // eslint-disable-next-line
          console.log("Successful Login", res);
          // eslint-disable-next-line
          this.currentUserId = res.data.data._id;
          this.currentUser = res.data.data.username;
          this.userImage = res.data.data.image_name;
          this.$router.replace(this.$route.query.redirect || '/profile');
          this.error = false;
          this.loginError = false;
          // eslint-disable-next-line
          console.log("Successful Login", res);
        //   this.onReset(evt);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
          this.loginError = true;
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
          // eslint-disable-next-line
          this.currentUserId = res.data.data._id;
          this.currentUser = res.data.data.username;
          this.userImage = res.data.data.image_name;
          this.$router.replace(this.$route.query.redirect || '/profile');
          this.registrationError = false;
        //   this.onReset(evt);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
          this.registrationError = true;
        });
    },
    loginFailed() {
      this.loginError = true;
    },
    updateUserImage(imageData) {
      const formData = new FormData();
      formData.append('file', imageData.file);
      const path = `${process.env.VUE_APP_APIURL}/users/photos/${imageData.userId}`;
      axios.post(path,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.token}`,
          },
        })
        .then((res) => {
          // eslint-disable-next-line
          console.log('SUCCESS!!');
          // eslint-disable-next-line
          this.userImage = res.data;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log('FAILURE!!', error);
        });
    },
  },
  created() {
    this.getUserData();
  },
};

</script>

<style lang="scss">
@import './assets/styles/custom.scss';
@import url('https://fonts.googleapis.com/css?family=Montserrat|Questrial&display=swap');

#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
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
