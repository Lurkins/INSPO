<template>
  <div>
    <Navbar />
    <Carousel />
    <b-container class="bv-example-row">
        <b-row>
            <b-col class="bg-secondary">
                <b-img v-bind="mainProps" rounded="circle" alt="Circle image"></b-img>
            </b-col>
            <b-col>
                <b-img v-bind="mainProps" rounded="circle" alt="Circle image"></b-img>
            </b-col>
            <b-col class="bg-secondary">
                <b-img v-bind="mainProps" rounded="circle" alt="Circle image"></b-img>
            </b-col>
        </b-row>
    </b-container>
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
