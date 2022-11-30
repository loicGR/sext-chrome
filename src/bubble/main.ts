import Vue from 'vue'
import '../../styles/index.css'
import Bubble from '@src/bubble/Bubble.vue';

new Vue({
  render: (h) => h(Bubble),
}).$mount('#app');
