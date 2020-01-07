<template>
        <footer class="container">
            <div class="row my-5">
                <div class="col-4">
                    <div class="text-left pt-5">
                        <h6 class="text-dark"> {{ msg }}</h6>
                        <a href="#" class="d-block">Link</a>
                        <a href="#" class="d-block">Link</a>
                        <a href="#" class="d-block">Link</a>
                        <a href="#" class="d-block">Link</a>
                    </div>
                </div>
                <div class="col-4">
                    <div class="text-left pt-5">
                        <h6 class="text-dark"> {{ msg }}</h6>
                        <a href="#" class="d-block">Link</a>
                        <a href="#" class="d-block">Link</a>
                        <a href="#" class="d-block">Link</a>
                        <a href="#" class="d-block">Link</a>
                    </div>
                </div>
                <div class="col-4">
                  <div class="pt-5">
                    <img src="../assets/footer_bulb.png" alt="lightbulb sprouting">
                    <p class="footer-logo-name">INSPO</p>
                  </div>
              </div>
            </div>
        </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      msg: 'This is the footer',
    };
  },
  methods: {

  },
};
</script>

<style scoped>
  .footer-logo-name  {
    font-size: 3em;
    font-family: 'Questrial', sans-serif;
    font-weight: lighter;
  }
</style>
