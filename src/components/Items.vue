<template>
<div>
  <Navbar />
  <div class="container">
    <div class="row">
      <div class="col-12">
          <h1 v-if="items" class="mt-5 pt-5">All the Items</h1>
          <h1 v-else class="mt-5 pt-5">No Items to Display</h1>
        <hr>
      </div>
    </div>
    </div>
    <div class="container-fluid">
      <b-card-group columns>
        <b-card
          bg-variant="light"
          class="shadow"
          v-for="(item) in items"
          :key="item._id.$oid"
          :title="item.title"
          v-bind:img-src="item.image_name ? `http://localhost:5000/file/${item.image_name}` : require('../assets/placeholder-image.png')"
          :img-alt="item.title"
          img-top
        >
          <b-card-text>
            {{ item.description }}
          </b-card-text>
          <template v-slot:footer>
            <small>
              <span v-if="item.done">Yes</span>
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
      items: [],
      file: null,
      image: false,
      addItemForm: {
        title: '',
        description: '',
        done: [],
      },
    };
  },
  methods: {
    getItems() {
      const path = 'http://localhost:5000/todo/api/item';
      axios.get(path, { headers: { Authorization: `Bearer ${localStorage.token}` } })
        .then((res) => {
          this.items = res.data;
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
      const path = `http://localhost:5000/todo/api/item/${id}`;
      axios.put(path)
        .then((res) => {
          this.items = res.data;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    handleDelete(id) {
      const path = `http://localhost:5000/todo/api/item/delete/${id}`;
      axios.delete(path)
        .then((res) => {
          this.items = res.data;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    handleEdit(id) {
      this.$router.push({ name: 'EditItem', params: { id } });
    },
    addItem(payload) {
      const path = 'http://localhost:5000/todo/api/item';
      axios.post(path, payload)
        .then(() => {
          this.getItems();
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
          this.getItems();
        });
    },
    initForm() {
      this.addItemForm.title = '';
      this.addItemForm.description = '';
      this.addItemForm.done = [];
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$refs.addItemModal.hide();
      let done = false;
      if (this.addItemForm.done[0]) done = true;
      const payload = {
        title: this.addItemForm.title,
        description: this.addItemForm.description,
        token: localStorage.token,
        done, // property shorthand
      };
      this.addItem(payload);
      this.initForm();
    },
    onReset(evt) {
      evt.preventDefault();
      this.$refs.addItemModal.hide();
      this.initForm();
    },
  },
  created() {
    this.getItems();
  },
};
</script>
<style scoped>
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
