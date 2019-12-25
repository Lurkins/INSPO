<template>
  <div id="app">
    <Navbar />
    <transition name="fade-slide-up" mode="out-in">
    <router-view/>
    </transition>
  </div>
</template>

<script type="text/javascript">
import Navbar from './components/Navbar.vue';

export default {
  components: {
    Navbar, // register component
  },
};

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

.fade-slide-up-enter-active {
  transition: all 0.5s ease;
}
.fade-slide-up-leave-active {
  transition: all 0.5s ease;
}
.fade-slide-up-enter, .fade-slide-up-leave-to {
  /* transform: translateY(40px); */
  opacity: 0;
}
</style>
