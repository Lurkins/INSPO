<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h1>Tasks</h1>
        <img v-if="image" v-bind:src="`http://localhost:5000/file/${image}`" alt="${image}">
        <div v-else></div>
        <hr><br><br>
        <button type="button" class="btn btn-info btn-sm" v-b-modal.task-modal>Add Task</button>
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
            <tr v-for="(task) in tasks" :key="task._id.$oid">
              <td>{{ task.title }}</td>
              <td>{{ task.description }}</td>
              <td>
                <span v-if="task.done">Yes</span>
                <span v-else>No</span>
              </td>
              <td>
                <div class="btn-group" role="group">
                <button
                  v-on:click="handleComplete(task._id.$oid)"
                  type="button"
                  class="btn btn-success btn-sm"
                >Complete</button>
                <button
                  type="button"
                  class="btn btn-secondary px-3 btn-sm"
                  v-on:click="handleDelete(task._id.$oid)"
                >Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="large-12 medium-12 small-12 cell">
        <label>File
          <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
        </label>
          <button v-on:click="submitFile()">Submit</button>
      </div>
    </div>
      <b-modal ref="addTaskModal"
        id="task-modal"
        title="Add a new task"
        hide-footer>
        <b-form @submit="onSubmit" @reset="onReset" class="w-100">
          <b-form-group id="form-title-group"
            label="Task:"
            label-for="form-title-input">
          <b-form-input id="form-title-input"
            type="text"
            v-model="addTaskForm.title"
            required
            placeholder="Enter task">
          </b-form-input>
          </b-form-group>
          <b-form-group id="form-description-group"
            label="Description:"
            label-for="form-description-input">
          <b-form-input id="form-description-input"
            type="text"
            v-model="addTaskForm.description"
            required
            placeholder="Enter description">
          </b-form-input>
          </b-form-group>
        <b-form-group id="form-read-group">
        </b-form-group>
        <b-button class="mr-3" type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tasks: [],
      file: null,
      image: false,
      addTaskForm: {
        title: '',
        description: '',
        done: [],
      },
    };
  },
  methods: {
    getTasks() {
      const path = 'http://localhost:5000/todo/api/task';
      axios.get(path)
        .then((res) => {
          this.tasks = res.data;
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
    handleComplete(id) {
      // const name = this.tasks[0].title;
      const path = `http://localhost:5000/todo/api/task/${id}`;
      axios.put(path)
        .then((res) => {
          this.tasks = res.data;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    handleDelete(id) {
      // const name = this.tasks[0].title;
      const path = `http://localhost:5000/todo/api/task/delete/${id}`;
      axios.delete(path)
        .then((res) => {
          this.tasks = res.data;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    addTask(payload) {
      const path = 'http://localhost:5000/todo/api/task';
      axios.post(path, payload)
        .then(() => {
          this.getTasks();
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
          this.getTasks();
        });
    },
    initForm() {
      this.addTaskForm.title = '';
      this.addTaskForm.description = '';
      this.addTaskForm.read = [];
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$refs.addTaskModal.hide();
      let done = false;
      if (this.addTaskForm.done[0]) done = true;
      const payload = {
        title: this.addTaskForm.title,
        description: this.addTaskForm.description,
        done, // property shorthand
      };
      this.addTask(payload);
      this.initForm();
    },
    onReset(evt) {
      evt.preventDefault();
      this.$refs.addTaskModal.hide();
      this.initForm();
    },
  },
  created() {
    this.getTasks();
  },
};
</script>
