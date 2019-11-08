<template>
        <footer class="container-fluid bg-dark">
            <div class="row">
                <div class="col-sm-12">
                    <div class="p-5">
                        <h6 class="text-light my-5 py-5 "> {{ msg }}</h6>
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
