<template>
  <div :style='`width: ${frameWidth}px;`'>
    <div class='flex flex-row justify-center align-middle w-full mt-2'>
      <img class='h-8 mr-1' src='../icons/LogoScapin.svg' alt='Logo SCAPIN'/>
      <span class='text-xl text-s_black font-roboto'>Scapin Screen Scanner</span>
    </div>
    <button class='btn btn-red mt-2 ml-2' @click='showLogin = ! showLogin'>Login</button>

    <login v-if='showLogin'/>

  </div>
</template>

<script lang='ts'>
import packageClosed from '../icons/package-variant-closed.svg';
import { Component, Vue } from 'vue-property-decorator';
import Login from '@src/sidebar/views/Login.vue';
import Storage from '@src/sidebar/storage.utils';

@Component({
  components: { Login },
})
export default class App extends Vue {
  // Les props
  // Les propriétés
  private showLogin: boolean = false
  private packageClosed = packageClosed
  private frameWidth = 0
  private account: string = ''
  private email: string = ''


  // Les propriétés calculées
  // Les hooks
  public async mounted() {
    console.log('mounted App')
    // Récupération de la largeur de l'iframe
    this.frameWidth = await Storage.iframeWidth() - 2
    this.account = await Storage.getAccount()
    this.email = await Storage.getEmail()


  }

  // Les méthodes surveillées
  // Les méthodes d'instance
  // Les méthodes statiques
}
</script>

<style scoped>

</style>
