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
        <div>
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group
                id="input-group-1"
                label="Title:"
                label-for="input-1"
            >
                <b-form-input
                id="input-1"
                v-model="form.title"
                type="text"
                required
                placeholder="Enter title"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Description:" label-for="input-2">
                <b-form-input
                id="input-2"
                v-model="form.description"
                required
                placeholder="Enter description"
                ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
            </b-form>
            <b-card class="mt-3" header="Form Data Result">
            <pre class="m-0">{{ form }}</pre>
            </b-card>
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
      form: {
        title: '',
        description: '',
      },
      show: true,
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
    onSubmit(evt) {
      evt.preventDefault();
      const path = `http://localhost:5000/todo/api/task/edit/${this.id}`;
      const payload = {
        title: this.form.title,
        description: this.form.description,
      };
      axios.put(path, payload)
        .then((res) => {
          console.log(res.data);
          this.title = res.data.result.title;
          this.description = res.data.result.description;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
      console.log(JSON.stringify(this.form));
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.title = '';
      this.form.description = '';
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
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
