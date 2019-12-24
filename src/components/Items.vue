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
      apiUrl: process.env.VUE_APP_APIURL,
    };
  },
  methods: {
    getItems() {
      const path = `${this.apiUrl}/items`;
      axios.get(path, { headers: { Authorization: `Bearer ${localStorage.token}` } })
        .then((res) => {
          this.items = res.data;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
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
