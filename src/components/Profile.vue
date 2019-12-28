<template>
<div>
    <div class="container mt-5 py-5">
        <div class="row">
            <div class="col-md-6">
                <b-img v-bind=mainProps
                  rounded="circle"
                  :src="userImage
                  ?
                  `${apiUrl}/file/${userImage}`
                  :
                  require('../assets/placeholder-image.png')"
                  :alt=username
                  fluid
                  class="mb-5"
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
                                v-on:click="submitFile(`${currentUserId}`)"
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
import axios from 'axios';
import Footer from './Footer.vue';

export default {
  components: {
    Footer,
  },
  props: ['currentUser', 'isLoggedIn', 'currentUserId', 'userImage'],
  data() {
    return {
      // username: '',
      // userId: this.currentUserId,
      // id: '',
      // file: null,
      // image: false,
      mainProps: {
        blank: false, blankColor: '#777', width: 300, height: 300, class: 'm1 mb-3',
      },
      apiUrl: process.env.VUE_APP_APIURL,
    };
  },
  methods: {
    submitFile(userId) {
      const formData = new FormData();
      formData.append('file', this.file);
      const path = `${this.apiUrl}/users/photos/${userId}`;
      axios.post(path,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          // eslint-disable-next-line
          console.log('SUCCESS!!');
          // eslint-disable-next-line
          this.image = res.data;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log('FAILURE!!', error);
        });
    },
  },
};
</script>
<style scoped>
</style>
