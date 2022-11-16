<template>
  <div v-if='toy' class='bord survol text-base text-gray-400 my-2 flex flex-row items-center bg-white cursor-pointer '>
    <s-svg-icons v-if='toy.type' :name='toy.type.icon' :alt='toy.type.typename' />
    <p class='mx-1'>{{ toy.name }}</p>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ToyDocument } from '@src/interfaces';
import SSvgIcons from '@src/sidebar/components/SSvgIcons.vue';

@Component({
  components: { SSvgIcons },
})
export default class SToyItem extends Vue {
  // Les props
  @Prop({ default: null }) private toy!: ToyDocument | null;

  // Les propriétés
  // Les propriétés calculées
  // Les hooks
  // Les méthodes surveillées
  // Les méthodes d'instance
  // Les méthodes statiques
}
</script>

<style scoped>
.bord {
  @apply border border-gray-300 rounded shadow-md
}
.survol {
  @apply hover:border-gray-400 hover:shadow-xl p-1.5 hover:text-s_black hover:font-semibold
}
</style>
