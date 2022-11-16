<template>
  <div class='flex flex-col h-full'>
    <div class='flex flex-row px-2 pt-2'>
      <button class='btn btn-blue px-1 py-0 flex flex-row items-center' @click='screenDoc = null'>
        <s-svg-icons name='arrow-left'/>
        <span class='mx-1'>Screens List</span>
      </button>
    </div>
    <div :id='ELEMID' class='h-full'>
      <div class='overflow-y-auto p-2' :style='`height:  ${height}px`'>
        <div class='flex flex-col'>
          <div class='flex flex-row justify-center' :style='`height: ${size}px; min-width:${size}px !important`'>
            <div class='bg-contain bg-center bg-no-repeat w-full' :style='`background-image: url(${shotUrl})`' />
          </div>
          <p class='text-base text-center text-s_black font-semibold'>{{screenDoc.name}}</p>
        </div>
        <s-toy-item v-for='toy in toys' :key='toy._id' :toy='toy' :current.sync='currentToyId'/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from 'vue-property-decorator';
import { ScreenDocument, ToyDocument } from '@src/interfaces';
import { fetchToys } from '@src/axios/toy.axios';
import SSvgIcons from '@src/sidebar/components/SSvgIcons.vue';
import SToyItem from '@src/sidebar/components/SToyItem.vue';
@Component({
  components: { SToyItem, SSvgIcons },
})
export default class Toys extends Vue {
  // Les props
  @PropSync('screen', {default: null}) private screenDoc!: ScreenDocument | null
  @Prop({default: ''}) private shotUrl!: string

  // Les propriétés
  private readonly ELEMID = '3s-page-toys'
  private helem: HTMLElement | null = null;
  private height: number = 0;
  private toys: ToyDocument[] = []
  private size = 200
  private currentToyId: string | null = null

  // Les propriétés calculées
  // Les hooks
  public async mounted() {
    // console.log(`mounted Toys.vue for screen:${this.screenDoc ? this.screenDoc.name : 'null'} `);
    this.helem = document.getElementById(this.ELEMID);
    this.changeHeigth();
    addEventListener('resize', this.changeHeigth);
    await this.loadToys()
  }
  // Les méthodes surveillées
  // Les méthodes d'instance
  private changeHeigth() {
    const client = this.helem ? this.helem.clientHeight : 0;
    this.height = client-30
    // console.log(`client: ${client}px, height: ${this.height}px`)
  }

  private async loadToys() {
    if (this.screenDoc) {
      this.toys = await fetchToys(this.screenDoc._id)
      // console.log('fetchToys :', this.toys)
    }
  }
  // Les méthodes statiques
}
</script>

<style scoped>

</style>
