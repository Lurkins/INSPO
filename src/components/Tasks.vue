<template>
<div>
  <Navbar />
  <div class="container">
    <div class="row">
      <div class="col-12">
          <h1 v-if="tasks" class="mt-5 pt-5">All the Items</h1>
          <h1 v-else class="mt-5 pt-5">No Items to Display</h1>
        <hr>
      </div>
    </div>
    </div>
    <div class="container-fluid">
      <b-card-group columns>
        <b-card
          bg-variant="light"
          class="bs-card shadow"
          v-for="(task) in tasks"
          :key="task._id.$oid"
          :title="task.title"
          v-bind:img-src="task.image_name ? `http://localhost:5000/file/${task.image_name}` : require('../assets/placeholder-image.png')"
          :img-alt="task.title"
          img-top
        >
          <b-card-text>
            {{ task.description }}
          </b-card-text>
          <template v-slot:footer>
            <small>
              <span v-if="task.done">Yes</span>
              <span v-else>No</span>
            </small>
          </template>
        </b-card>
      </b-card-group>
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
      axios.get(path, { headers: { Authorization: `Bearer ${localStorage.token}` } })
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
        token: localStorage.token,
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
    color: #000;
  }
  @media (min-width: 576px) {
    .card-columns {
        column-count: 2;
    }
  }
  @media (min-width: 768px) {
    .card-columns {
        column-count: 2;
    }
  }
  @media (min-width: 992px) {
    .card-columns {
        column-count: 3;
    }
  }
  @media (min-width: 1200px) {
    .card-columns {
        column-count: 4;
    }
  }
</style>
