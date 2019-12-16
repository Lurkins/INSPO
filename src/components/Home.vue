<template>
  <div>
    <Navbar />
    <Carousel />
    <Footer />
  </div>
</template>
<script>
import Footer from './Footer.vue';
import Navbar from './Navbar.vue';
import Carousel from './Carousel.vue';

export default {
  components: {
    Footer,
    Navbar,
    Carousel,
  },
  data() {
    return {
    };
  },
  methods: {
  },

};
</script>


<style scoped>

</style>
