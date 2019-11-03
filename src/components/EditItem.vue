<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h1>Edit Task</h1>
        <hr><br><br>
        <br><br>
        <div>
          <div>
            <b-img :src="`http://localhost:5000/file/${image}`" fluid alt="task"></b-img>
          </div>
          <div>{{ title }}</div>
          <div>{{ description }}</div>
        </div>
      </div>
      <div class="large-12 medium-12 small-12">
        <label>File
          <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
        </label>
          <button v-on:click="submitFile(id)">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      id: '',
      title: '',
      description: '',
      file: null,
      image: false,
    };
  },
  methods: {
    getItemData() {
      const path = `http://localhost:5000/todo/api/task/id/${this.$route.params.id}`;
      axios.get(path)
        .then((res) => {
          console.log(res.data);
          this.title = res.data.title;
          this.description = res.data.description;
          this.id = this.$route.params.id;
          this.image = res.data.image_name;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    submitFile(id) {
      console.log('this is submit file');
      const formData = new FormData();
      formData.append('file', this.file);
      const path = `http://localhost:5000/todo/api/photo/${id}`;
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
    handleFileUpload() {
      // eslint-disable-next-line
      this.file = this.$refs.file.files[0];
    },
  },
  created() {
    this.getItemData();
  },
};
</script>
<style scoped>
/* .bs-card {
  width: 350px;
  color: rgb(0, 255, 145);
} */
</style>
