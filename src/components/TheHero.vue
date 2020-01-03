<template>
    <header class="container-fluid">
        <div class="p-5">
            <h6 class="text-dark text-center hero-heading display-3 pt-4">
                {{ msg }}
            </h6>
            <p class="hero-tagline">Grow your ideas.</p>
            <b-button pill class="hero-btn" size="lg">Sign Up</b-button>
        </div>
        <img class="hero-img w-100" src="../assets/inspo-hero.jpg" alt="">
    </header>
</template>

<script>
export default {
  name: 'TheHero',
  data() {
    return {
      msg: 'INSPO',
    };
  },
  methods: {

  },
};
</script>

<style scoped>
    .hero-heading {
      font-family: 'Questrial', sans-serif;
      font-weight: lighter;
    }
    .hero-tagline {
      font-family: 'Montserrat', sans-serif;
      font-size: 1.5em;
    }

    .hero-btn {
      background: #D62EFF;
    }
    /* .hero-heading {
        position: absolute;
        top: 100px;
        right: 40%;
    } */
</style>
