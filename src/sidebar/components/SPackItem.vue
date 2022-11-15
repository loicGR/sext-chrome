<template>
  <div v-if='item' class='w-full'>
    <div class='flex flex-row w-full'>
      <!--  Div de décalage pour l'effet d'arborescence -->
      <div :style="`width: ${item.isRoot ? 0 : 15}px`"/>

      <div class='flex flex-row w-full justify-between ml-1'>
        <div class='flex flex-row w-full cursor-pointer' @click='activePackId = item.id'>
          <!-- Icône de début de ligne (package ouvert ou fermé)-->
          <s-pack-icon v-if='item.id' :isopen='isActive'/>
          <div v-else style="width: 20px; height: auto;"/>
          <span class='text-base '>{{item.name}}</span>
        </div>
        <button v-if='isActive' class='btn btn-blue' @click='selectedPackId = item.id'>screens</button>
      </div>
    </div>

    <!-- Affichage des enfants-->
    <div v-if='item.children.length && isOpen' class='w-full'>
      <s-pack-item v-for='child in item.children' :key='child.id' :item='child' :pack.sync='selectedPackId' :active.sync='activePackId'/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from 'vue-property-decorator';
import { TreeStructure } from '@src/interfaces';
import SPackIcon from '@src/sidebar/components/SPackIcon.vue';

@Component({
  name: 'SPackItem',
  components: { SPackItem, SPackIcon },
})
export default class SPackItem extends Vue {
  // Les props
  @Prop({default: null}) private item!: TreeStructure
  @PropSync('pack') private selectedPackId!: string
  @PropSync('active') private activePackId!: string | null

  // Les propriétés
  // Les propriétés calculées
  private get isActive() {
    return this.item ? this.activePackId === this.item.id : false
  }

  private get isOpen() {
    if (this.isActive) {
      return true
    } else if (this.item && this.item.children) {
      const idx = this.item.children.findIndex(c => c.id === this.activePackId)
      return idx >= 0
    } else {
      return false
    }
  }

  // Les hooks
  // Les méthodes surveillées
  // Les méthodes d'instance
  // Les méthodes statiques
}
</script>

<style scoped>

</style>
