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
                    <img src="http://placekitten.com/200/300" alt="">
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
