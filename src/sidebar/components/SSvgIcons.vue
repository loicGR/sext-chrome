<template>
  <svg v-if='name === "arrow-left"' :class='css' style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
  </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SSvgIcons extends Vue {
  // Les props
  @Prop() private name!: string
  @Prop({default: undefined}) css!: string
  // Les propriétés
  // Les propriétés calculées
  // Les hooks
  // Les méthodes surveillées
  // Les méthodes d'instance
  // Les méthodes statiques
}
</script>

<style scoped>

</style>
