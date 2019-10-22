<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h1>Tasks</h1>
        <hr><br><br>
        <button type="button" class="btn btn-success btn-sm">Add Task</button>
        <br><br>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Done?</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(task, index) in tasks" :key="index">
              <td>{{ task.title }}</td>
              <td>{{ task.description }}</td>
              <td>
                <span v-if="task.done">Yes</span>
                <span v-else>No</span>
              </td>
              <td>
            <div class="large-12 medium-12 small-12 cell">
      <label>File
        <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
      </label>
        <button v-on:click="submitFile()">Submit</button>
    </div>
<!-- Styled -->
    <!-- <b-form-file
      v-model="file"
      :state="Boolean(file)"
      placeholder="Choose a file or drop it here..."
      drop-placeholder="Drop file here..."
      accept=".jpg, .png, .gif"
    ></b-form-file>
    <div class="mt-3">Selected file: {{ file ? file.name : '' }}</div> -->
                <div class="btn-group" role="group">
                  <button type="button" class="btn btn-warning btn-sm">Complete</button>
                  <button type="button" class="btn btn-danger px-3 btn-sm">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tasks: [],
      file: null,
    };
  },
  methods: {
    getTasks() {
      const path = 'http://localhost:5000/todo/api/task';
      axios.get(path)
        .then((res) => {
          this.tasks = res.data.result;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    submitFile() {
      const formData = new FormData();
      formData.append('file', this.file);
      const path = 'http://localhost:5000/todo/api/photo';
      axios.post(path,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log('SUCCESS!!', res);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log('FAILURE!!', error);
        });
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
  },
  created() {
    this.getTasks();
  },
};
</script>
