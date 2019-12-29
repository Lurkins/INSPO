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
        <b-container class="bv-example-row">
            <b-row class="mt-5">
                <b-col>
                    <h3 class="my-5">Get you creativity flowing.</h3>
                </b-col>
                <b-col>
                    <b-img
                        class="my-5"
                        v-bind="mainProps"
                        rounded="circle"
                        alt="Circle image"
                    ></b-img>
                </b-col>
            </b-row>
        </b-container>
    </div>
    <div class="section-3">
        <b-container class="bv-example-row">
            <b-row>
                <b-col>
                    <b-img
                        class="my-5"
                        v-bind="mainProps"
                        rounded="circle"
                        alt="Circle image"
                    ></b-img>
                </b-col>
                <b-col>
                    <h3 class="my-5">See what's inspiring others.</h3>
                </b-col>
            </b-row>
        </b-container>
    </div>
    <div class="section-4">
        <b-container class="bv-example-row">
            <b-row>
                <b-col>
                    <h3 class="my-5">Make make something great.</h3>
                </b-col>
                <b-col>
                    <b-img
                        class="my-5"
                        v-bind="mainProps"
                        rounded="circle"
                        alt="Circle image"
                    ></b-img>
                </b-col>
            </b-row>
        </b-container>
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
}

.section-2 {
    background:rgb(137, 173, 82);
}
.section-3 {
    background:chartreuse;
}
.section-4 {
    background: greenyellow;
}

</style>
