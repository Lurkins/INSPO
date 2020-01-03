<template>
  <div>
    <TheHero />
    <!-- <Carousel /> -->
    <b-container class="bv-example-row">
        <b-row class="my-5">
            <b-col>
                <font-awesome-icon :icon="['fas', 'cogs']" class="icon mb-3" />
                <p>Find something that inspires you.</p>
            </b-col>
            <b-col>
                <font-awesome-icon :icon="['fas', 'camera-retro']" class="icon mb-3" />
                <p>Capture your inspiration with a photo and description.</p>
            </b-col>
            <b-col>
                <font-awesome-icon :icon="['fa', 'lightbulb']" class="icon mb-3" />
                <p>Generate ideas from your inspiration.</p>
            </b-col>
        </b-row>
    </b-container>
    <div class="section-2">
        <h3 class="p-3 section-heading text-left">
            Get creative.
        </h3>
        <!-- <b-container class="bv-example-row">
            <b-row>
                <b-col>

                </b-col>
            </b-row>
        </b-container> -->
    </div>
    <div class="section-3">
        <h3 class="p-3 section-heading text-left">
            See what's inspiring others.
        </h3>
        <!-- <b-container class="bv-example-row">
            <b-row>
                <b-col>
                </b-col>
            </b-row>
        </b-container> -->
    </div>
    <div class="section-4">
        <h3 class="p-3 section-heading text-left">
            Create something great.
        </h3>
        <!-- <b-container class="bv-example-row">
            <b-row>
                <b-col>
                    <h3 class="my-5 display-4 text-left text-light">Create something great.</h3>
                </b-col>
            </b-row>
        </b-container> -->
    </div>
    <Footer />
  </div>
</template>
<script>
import Footer from './Footer.vue';
// import Carousel from './Carousel.vue';
import TheHero from './TheHero.vue';

export default {
  components: {
    Footer,
    // Carousel,
    TheHero,
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
.icon {
    font-size: 6em;
    color: rgb(31, 20, 10);;
}

.section-2 {
    background-color:white;
    background-image: url('~@/assets/creative.jpg');
    height: 100vh;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
}
.section-3 {
    background-image: url('~@/assets/others.jpg');
    height: 100vh;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
}
.section-4 {
    background-image: url('~@/assets/make.jpg');
    height: 100vh;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
}

.section-heading {
    background: rgba(31, 20, 10, 0.762);
    color: #D62EFF;
    font-size: 2.5em;
    font-weight: 300;
    /* border-top: solid 9px greenyellow; */
}


p {font-size: 1.2em;}


</style>
