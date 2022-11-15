<template>
  <div v-if='loading' class='h-1 rounded mx-1.5 animated-background'></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SLoading extends Vue {
  // Les props
  @Prop({default: false}) private loading!: boolean
  // Les propriétés
  // Les propriétés calculées
  // Les hooks
  // Les méthodes surveillées
  // Les méthodes d'instance
  // Les méthodes statiques
}
</script>

<style scoped>
.animated-background {
  animation-duration: 2s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
  background: linear-gradient(to right, #ffffff 35%, #83c0e6 45%, #83c0e6 55%, #ffffff 65%);
  background-size: 310px 5px;
  position: relative;
}

@keyframes placeHolderShimmer {
  0% {
    background-position: -310px 0
  }
  100% {
    background-position: 310px 0
  }
}
</style>
