<template>
  <div class='bg-sbg_blue rounded border border-s_blue h-full w-full px-1' :style='`height: ${height}px; overflow: hidden`'>
    <!--    Icon type et Nom de l'élément graphique-->
    <div v-if='toy' class=' flex flex-row items-center text-base'>
      <s-svg-icons v-if='toy.type' :name='toy.type.icon' :alt='toy.type.typename' />
      <p class='mx-1'>{{ toy.name }}</p>
    </div>

    <!--    Visualisation du mapping-->
    <div class='flex flex-col h-full'>
      <div v-if='solutions.length '>
        <div class='flex flex-row items-center'>
          <div class='w-16 '>
            <p class='text-center'>Key</p>
          </div>
          <div class='w-full'>
            <p class='text-center'>Value</p>
          </div>
        </div>
        <div v-for='(solution, idx) in solutions' :key='idx' class='w-full'>
          <div v-if='solution.map' class='flex flex-row items-center border-t border-gray-300'>
            <div class='w-16'>
              <p>{{ solution.map.key }}</p>
            </div>
            <div class='w-full'>
              <p class='whitespace-normal'>{{ solution.map.value }}</p>
            </div>
          </div>
          <div v-else>
            <p class='text-center text-s_red'>At least, no unique solution found</p>
          </div>

        </div>
      </div>
      <div v-else class='w-full'>
        <p class='text-center'>No mapping solution found</p>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { IBound, IMessage, ToyDocument } from '@src/interfaces';
import SSvgIcons from '@src/sidebar/components/SSvgIcons.vue';

@Component({
  components: { SSvgIcons },
})
export default class Bubble extends Vue {
  // Les props
  // Les propriétés
  private height: number = window.innerHeight;
  private toy: ToyDocument | null = null;
  private solutions: IBound[] = [];

  // Les propriétés calculées
  // Les hooks
  public mounted() {
    window.addEventListener('resize', () => {
      this.updateHeight();
    });
    this.connect();
  }

  // Les méthodes surveillées
  // Les méthodes d'instance
  private updateHeight() {
    this.height = window.innerHeight;
  }

  private connect() {

    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      if (tabs && tabs[0] && tabs[0].id) {
        const tabId = tabs[0].id;
        const port = chrome.tabs.connect(tabId, { name: 'bubble' });
        console.log(`Bubble tabs.connect tabId:${tabId}, port:`, port);

        port.onMessage.addListener((msg: IMessage) => {
          // console.log('Bubble.vue onMessage :', msg);
          if (msg.action === 'toy') {
            this.toy = msg.data;
          }
          if (msg.action === 'solution') {
            this.solutions = msg.data;
          }
        });
      }
    });

  }

  // Les méthodes statiques
}
</script>

<style scoped>

</style>
