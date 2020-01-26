<template>
    <header class="container-fluid d-flex justify-content-center">
      <div class="row my-5 py-5">
        <div class="col-12 order-2 col-md-6 d-flex justify-content-center">
          <img
            class="hero-img"
            src="../assets/hero-bulb.jpg"
            alt="lightbulb with plant inside"
          ></div>
        <div class="col-12 col-md-6 order-1 order-md-2">
          <div class="mb-5">
            <h6 class="text-dark text-center hero-heading display-3">
                {{ logo }}
            </h6>
            <p class="hero-tagline text-nowrap">Grow your ideas.</p>
            <b-button
              pill
              to="/signup"
              variant="primary"
              class="hero-btn"
              size="lg"
            >Sign Up</b-button>
        </div>
        </div>
      </div>

    </header>
</template>

<script>
export default {
  name: 'TheHero',
  data() {
    return {
      logo: 'INSPO',
    };
  },
  methods: {

  },
};
</script>

<style scoped>
    .hero-img {
      height: auto;
    }

    .hero-heading {
      font-family: 'Questrial', sans-serif;
      font-weight: lighter;
    }
    .hero-tagline {
      font-family: 'Montserrat', sans-serif;
      font-size: 1.5em;
    }

    /* .hero-btn {
      background: #D62EFF;
    } */
    /* .hero-heading {
        position: absolute;
        top: 100px;
        right: 40%;
    } */
</style>
