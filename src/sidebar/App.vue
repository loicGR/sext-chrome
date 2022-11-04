<template>
  <div :style='`width: ${frameWidth}px;`'>
    <div class='flex flex-row justify-center align-middle w-full mt-2'>
      <img class='h-8 mr-1' src='../icons/LogoScapin.svg' alt='Logo SCAPIN'/>
      <span class='text-xl text-s_black font-roboto'>Scapin Screen Scanner</span>
    </div>
    <screen v-if='user'></screen>
    <login v-else/>

  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import Login from '@src/sidebar/views/Login.vue';
import { iframeWidth } from '@src/utils/storage.utils';
import { UserDocument } from '@src/interfaces';
import { getUserByAuthId } from '@src/axios/user.axios';
import Screen from '@src/sidebar/views/Screen.vue';

@Component({
  components: { Screen, Login },
})
export default class App extends Vue {
  // Les props
  // Les propriétés
  private frameWidth = 0
  private user: UserDocument | null = null



  // Les propriétés calculées
  // Les hooks
  public async mounted() {
    console.log('mounted App.vue')

    this.frameWidth = await iframeWidth() - 2

    chrome.runtime.onMessage.addListener(async message => {
      // console.log('onMessage :', message)
      if (message.from === 'iframe' && message.show && !this.user) {
        this.user = await getUserByAuthId()
      }
    })

  }

  // Les méthodes surveillées
  // Les méthodes d'instance
  // Les méthodes statiques
}
</script>

<style scoped>

</style>
