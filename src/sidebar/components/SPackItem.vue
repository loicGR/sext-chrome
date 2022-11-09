<template>
  <div v-if='item' class='w-full'>
    <div class='flex flex-row w-full'>
      <!--  Div de décalage pour l'effet d'arborescence -->
      <div :style="`width: ${item.isRoot ? 0 : 15}px`"/>

      <!-- Icône de début de ligne (package ouvert ou fermé)-->
      <s-pack-icon v-if='item.id' :isopen='isActive'/>
      <div v-else style="width: 20px; height: auto;"/>

      <div class='flex flex-row w-full justify-between ml-1'>
        <!-- Partie label -->
        <span class='text-base'>{{item.name}}</span>

        <!-- Checkbox de validation -->
        <input type='checkbox' :value='checkboxValue'/>
      </div>
    </div>

    <!-- Affichage des enfants-->
    <div v-if='item.children.length && isOpen' class='w-full'>

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue, Watch } from 'vue-property-decorator';
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

  // Les propriétés
  private activePackId: string | null = null
  private checkboxValue: string = ''

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
  @Watch('checkboxValue')
  private onChangeValue() {
    console.log('checkbon value:', this.checkboxValue)
  }
  // Les méthodes d'instance
  // Les méthodes statiques
}
</script>

<style scoped>

</style>
