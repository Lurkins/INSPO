<template>
<div>
    <div class="container mt-5 py-5">
        <b-img v-bind="mainProps" rounded="circle" alt="Circle image"></b-img>
        <h1>{{ currentUser }}</h1>
    </div>
      <b-container class="bv-example-row">
        <b-row>
            <b-col>1 of 3</b-col>
            <b-col>2 of 3</b-col>
            <b-col>3 of 3</b-col>
        </b-row>
    </b-container>
  <Footer />
  </div>
</template>

<script>
// import axios from 'axios';
import Footer from './Footer.vue';

export default {
  components: {
    Footer,
  },
  props: ['currentUser', 'isLoggedIn'],
  data() {
    return {
      username: '',
      mainProps: {
        blank: false, blankColor: '#777', width: 300, height: 300, class: 'm1 mb-3', src: 'http://placekitten.com/300/300',
      },
      apiUrl: process.env.VUE_APP_APIURL,
    };
  },
  methods: {
  //   getUserData() {
  //     const path = `${this.apiUrl}/users/bob`;
  //     axios.get(path, { headers: { Authorization: `Bearer ${localStorage.token}` } })
  //       .then((res) => {
  //         // this.items = res.data;
  //         this.username = res.data.data.username;
  //         // console.log(res.data.data.username);
  //       //   this.image = res.data.image_name;
  //       })
  //       .catch((error) => {
  //         // eslint-disable-next-line
  //         console.error(error);
  //       });
  //   },
  // },
  // created() {
  //   this.getUserData();
  },
};
</script>
<style scoped>
</style>
