<template>
<div>
  <Navbar />
    <div class="container mt-5 py-5">
        <b-img v-bind="mainProps" rounded="circle" alt="Circle image"></b-img>
        <h1>User Name</h1>
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
import Navbar from './Navbar.vue';

export default {
  components: {
    Footer,
    Navbar,
  },
  data() {
    return {
      mainProps: {
        blank: false, blankColor: '#777', width: 300, height: 300, class: 'm1 mb-3', src: 'http://placekitten.com/300/300',
      },
    };
  },
  methods: {
  },

};
</script>
<style scoped>
</style>
