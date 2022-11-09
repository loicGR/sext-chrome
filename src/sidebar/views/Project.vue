<template>
  <div>
    <p class='text-xl'>TODO</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { UserDocument } from '@src/interfaces';

@Component
export default class Project extends Vue {
  // Les props
  @Prop({default: null}) private user!: UserDocument

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
