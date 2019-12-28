<template>
<div>
    <div class="container mt-5 py-5">
        <div class="row">
            <div class="col-md-6">
                <b-img
                  rounded="circle"
                  :src="userImage
                  ?
                  `${apiUrl}/file/${userImage}`
                  :
                  require('../assets/placeholder-image.png')"
                  :alt=currentUser
                  fluid
                  class="mb-5 profile-pic"
                >
                </b-img>
                <h1>{{ currentUser }}</h1>
            </div>
            <div class="col-md-6">
                <div>
                    <div>
                        <b-form-group label="Image:" label-for="file" label-cols-sm="12">
                            <b-form-file id="file" v-model="file" class="mb-5">
                            </b-form-file>
                            <button
                                @click="submitFile()"
                                type="button"
                                class="btn btn-primary px-3">Submit
                            </button>
                        </b-form-group>
                    </div>
                </div>
            </div>
        </div>
    </div>
  <Footer />
  </div>
</template>

<script>
import Footer from './Footer.vue';

export default {
  components: {
    Footer,
  },
  props: ['currentUser', 'currentUserId', 'userImage'],
  data() {
    return {
      file: null,
      mainProps: {
        blank: false, blankColor: '#777', width: 300, height: 300, class: 'm1 mb-3',
      },
      apiUrl: process.env.VUE_APP_APIURL,
    };
  },
  methods: {
    submitFile() {
      const payload = {
        userId: this.currentUserId,
        file: this.file,
      };
      this.$emit('submitFile', payload);
    },
  },
};
</script>
<style scoped>
  .profile-pic {
    background-color: #777;
    width: 300px;
    height: 300px;
  }

</style>
