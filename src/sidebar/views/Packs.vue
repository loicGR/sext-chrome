<template>
  <div :id='ELEMID' class='h-full'>
    <div class='packs' :style='`height:  ${height}px`'>
      <s-pack-item v-for='item in treePacks' :key='item.id' :item='item' :pack.sync='packId' :active.sync='activePackId'/>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, PropSync, Vue } from 'vue-property-decorator';
import { TreeStructure } from '@src/interfaces';
import SPackItem from '@src/sidebar/components/SPackItem.vue';

@Component({
  components: { SPackItem },
})
export default class Packs extends Vue {
  // Les props
  @Prop({ default: [] }) private tree!: TreeStructure[];
  @PropSync('pack') private packId!: string | null;

  // Les propriétés
  private readonly ELEMID = '3s-page-packs'
  private height: number = 0;
  private helem: HTMLElement | null = null;
  private activePackId: string | null = null

  // Les propriétés calculées
  private get treePacks() {
    const unaffected: TreeStructure = {
      id: '', children: [], name: '(unpacked screens)', isRoot: true,
    };
    return [unaffected, ...this.tree];
  }

  // Les hooks
  public mounted() {
    // console.log(`mounted Packs.vue packId:${this.packId} tree:`, this.tree);
    this.helem = document.getElementById(this.ELEMID);
    this.changeHeigth();
    addEventListener('resize', this.changeHeigth);
  }

  // Les méthodes surveillées
  // Les méthodes d'instance
  private changeHeigth() {
    const client = this.helem ? this.helem.clientHeight : 0;
    this.height = client-30
    // console.log(`client: ${client}px, height: ${this.height}px`)
  }

  // Les méthodes statiques
}
</script>

<style scoped>
.packs {
  @apply flex flex-col m-3 p-2 border border-gray-300 rounded-lg bg-white overflow-y-auto
}
</style>
