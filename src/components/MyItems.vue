<template>
<div>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <transition name="fade">
            <h1 class="mt-5 py-5">My INSPO items</h1>
        </transition>
        <b-button
          pill
          block
          type="button"
          variant="success"
          class="mb-5"
          v-b-modal.item-modal
        >Add Item</b-button>
      </div>
    </div>
    </div>
    <div class="container-fluid container-item">
      <b-card-group columns>
        <transition-group name="fade" tag="div">
          <b-card
              bg-variant="dark"
              text="light"
              class="shadow text-light mb-4"
              v-for="(item) in items"
              :key="item._id.$oid"
              :title="item.title"
              v-bind:img-src="item.image_name
                  ?
                  `${apiUrl}/file/${item.image_name}`
                  :
                  require('../assets/placeholder-image.png')"
              :img-alt="item.title"
              img-top
          >
            <b-card-text>
              {{ item.description }}
            </b-card-text>
              <!-- <div class="btn-group" role="group"> -->
                <!-- <button
                  v-on:click="handleComplete(item._id.$oid)"
                  type="button"
                  class="btn btn-success btn-sm"
                >Complete</button> -->
                <div>
                  <b-button
                    pill
                    block
                    type="button"
                    variant="primary"
                    class="btn btn-primary mb-3"
                    v-on:click="handleEdit(item._id.$oid)"
                  >Edit</b-button>
                </div>
                <div>
                  <b-button
                    pill
                    block
                    type="button"
                    class="btn btn-danger mb-3"
                    v-on:click="handleDelete(item._id.$oid)"
                  >Delete</b-button>
                </div>

              <!-- </div> -->
            <!-- <template v-slot:footer>
              <small>
                <span v-if="item.done">Yes</span>
                <span v-else>No</span>
              </small>
            </template> -->
          </b-card>
        </transition-group>
      </b-card-group>
    </div>
    <!-- modal -->
      <b-modal ref="addItemModal"
        id="item-modal"
        title="Add a new item"
        hide-footer>
        <b-form @submit="onSubmit" @reset="onReset" class="w-100">
          <b-form-group id="form-title-group"
            label="Item:"
            label-for="form-title-input">
          <b-form-input id="form-title-input"
            type="text"
            v-model="addItemForm.title"
            required
            placeholder="Enter item">
          </b-form-input>
          </b-form-group>
          <b-form-group id="form-description-group"
            label="Description:"
            label-for="form-description-input">
          <b-form-input id="form-description-input"
            type="text"
            v-model="addItemForm.description"
            required
            placeholder="Enter description">
          </b-form-input>
          </b-form-group>
        <b-form-group id="form-read-group">
        </b-form-group>
        <b-button pill class="mr-3" type="submit" variant="primary">Submit</b-button>
        <b-button pill type="reset" variant="danger">Cancel</b-button>
      </b-form>
    </b-modal>
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
  data() {
    return {
      items: [],
      addItemForm: {
        title: '',
        description: '',
      },
      apiUrl: process.env.VUE_APP_APIURL,
    };
  },
  methods: {
    getUserItems() {
      const path = `${this.apiUrl}/users/items`;
      axios.get(path, { headers: { Authorization: `Bearer ${localStorage.token}` } })
        .then((res) => {
          this.items = res.data;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    handleComplete(id) {
      const path = `${this.apiUrl}/items/status/${id}`;
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
      const path = `${this.apiUrl}/items/${id}`;
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
      const path = `${this.apiUrl}/items`;
      axios.post(path, payload, { headers: { Authorization: `Bearer ${localStorage.token}` } })
        .then(() => {
          this.getUserItems();
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
          this.getUserItems();
        });
    },
    initForm() {
      this.addItemForm.title = '';
      this.addItemForm.description = '';
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$refs.addItemModal.hide();
      const payload = {
        title: this.addItemForm.title,
        description: this.addItemForm.description,
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
    this.getUserItems();
  },
};
</script>
<style scoped>
    .container-item {
      min-height: 70vh;
    }
    .fade-enter-active {
      transition: opacity .5s ease-in-out;
    }

    .fade-enter-to {
      opacity: 1;
    }

    .fade-enter {
      opacity: 0;
    }

    [v-cloak] {
    display:none;
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
