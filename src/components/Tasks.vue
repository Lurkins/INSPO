<template>
<div>
  <Navbar />
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h1>Tasks</h1>
        <hr><br><br>
        <b-form inline>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-form>
        <button type="button" class="btn btn-success btn-sm" v-b-modal.task-modal>Add Task</button>
        <br><br>
        <div>
          <b-card-group class="thisCard d-flex justify-content-around flex-wrap" columns>
            <b-card bg-variant="info" class="bs-card" v-for="(task) in tasks" :key="task._id.$oid" :title="task.title" v-bind:img-src="`http://localhost:5000/file/${task.image_name}`" img-alt="task" img-top>
              <b-card-text>
                {{ task.description }}
              </b-card-text>
                <div class="btn-group" role="group">
                  <button
                    v-on:click="handleComplete(task._id.$oid)"
                    type="button"
                    class="btn btn-light btn-sm"
                  >Complete</button>
                  <button
                    type="button"
                    class="btn btn-dark px-3 btn-sm"
                    v-on:click="handleDelete(task._id.$oid)"
                  >Delete</button>
                  <button
                    type="button"
                    class="btn btn-warning px-3 btn-sm"
                    v-on:click="handleEdit(task._id.$oid)"
                  >Edit</button>
                </div>
              <template v-slot:footer>
                <small class="thisCard">
                  <span v-if="task.done">Yes</span>
                  <span v-else>No</span></small>
              </template>
            </b-card>
          </b-card-group>
        </div>
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
  <Footer />
  </div>
</template>

<script>
import axios from 'axios';
import Footer from './Footer.vue';
import Navbar from './Navbar.vue';

export default {
  components: {
    Footer,
    Navbar,
  },
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
    handleEdit(id) {
      this.$router.push({ name: 'EditItem', params: { id } });
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
      this.addTaskForm.done = [];
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
<style scoped>
  .bs-card {
    width: 350px;
    color: rgb(0, 255, 145);
  }
</style>
