<template>
  <div class='flex flex-col h-full'>
    <div class='flex flex-row px-2 pt-2'>
      <button class='btn btn-blue px-1 py-0 flex flex-row items-center' @click='packId = null'>
        <s-svg-icons name='arrow-left' />
        <span class='mx-1'>Packs List</span>
      </button>
    </div>
    <div :id='ELEMID' class='h-full'>
      <div class='overflow-y-auto p-2' :style='`height:  ${height}px`'>
        <s-screen-item v-for='screen in screens' :key='screen._id'
                       :screen='screen' :picture.sync='screenPictures'
                       @selected='onSelect(screen)' />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, PropSync, Vue } from 'vue-property-decorator';
import SLoading from '@src/sidebar/components/SLoading.vue';
import { PictureDocument, ScreenDocument } from '@src/interfaces';
import { fetchScreens } from '@src/axios/screen.axios';
import SScreenItem from '@src/sidebar/components/SScreenItem.vue';
import SSvgIcons from '@src/sidebar/components/SSvgIcons.vue';

@Component({
  components: { SSvgIcons, SScreenItem, SLoading },
})
export default class Screens extends Vue {
  // Les props
  @PropSync('pack', { default: '' }) private packId!: string | null;
  @PropSync('pictures', { default: [] }) private screenPictures!: PictureDocument[];
  @PropSync('screen', { default: null }) screenDoc!: ScreenDocument | null;
  @Prop({ default: null }) private prjid!: string | null;

  // Les propriétés
  private readonly ELEMID = '3s-page-packs';
  private height: number = 0;
  private helem: HTMLElement | null = null;
  private screens: ScreenDocument[] = [];

  // Les propriétés calculées
  // Les hooks
  public async mounted() {
    // console.log(`mounted Screens.vue packId:${this.packId} `);
    this.helem = document.getElementById(this.ELEMID);
    this.changeHeigth();
    addEventListener('resize', this.changeHeigth);
    await this.loadScreensData();
  }

  // Les méthodes surveillées
  // Les méthodes d'instance
  private changeHeigth() {
    const client = this.helem ? this.helem.clientHeight : 0;
    this.height = client - 30;
    // console.log(`client: ${client}px, height: ${this.height}px`)
  }

  private async loadScreensData() {
    if (this.prjid && this.packId) {
      this.screens = await fetchScreens(this.prjid, this.packId);
      this.screens.sort((a,b) => a.name.localeCompare(b.name))
    }
  }

  private onSelect(screen: ScreenDocument) {
    // console.log('Selected screen:', screen.name);
    this.screenDoc = screen;
  }

  // Les méthodes statiques
}
</script>

<style scoped>


</style>
