<template>
  <div :style='`width: ${frameWidth}px;`'>
    <div class='flex flex-row justify-center align-middle w-full mt-2'>
      <img class='h-8 mr-1' src='../icons/LogoScapin.svg' alt='Logo SCAPIN'/>
      <span class='text-xl text-s_black font-roboto'>Scapin Screen Scanner</span>
    </div>
    <p class='font-sans text-2xl text-scapin_blue'>This is the Scapin Screen Scanner</p>
    <p>Welcome</p>
    <div class='btn ml-2' @click='showLogin = ! showLogin'><p>test case</p></div>
    <button class='btn btn-blue ml-2' @click='showLogin = ! showLogin'>Test Cases</button>
    <button class='btn btn-green ml-2' @click='showLogin = ! showLogin'>TEST CASES</button>
    <button class='btn btn-red mt-2 ml-2' @click='showLogin = ! showLogin'>Login</button>
    <div class='inline-flex'>
      <img class='icon' :src='packageClosed' alt='closed'/>
    </div>

    <login v-if='showLogin'/>

  </div>
</template>

<script lang='ts'>
import packageClosed from '../icons/package-variant-closed.svg';
import { Component, Vue } from 'vue-property-decorator';
import Login from '@src/sidebar/views/Login.vue';

const IFRAME_WIDTH = 310

@Component({
  components: { Login },
})
export default class App extends Vue {
  // Les props
  // Les propriétés
  private showLogin: boolean = false
  private packageClosed = packageClosed
  private frameWidth = IFRAME_WIDTH-2

  // Les propriétés calculées
  // Les hooks
  // Les méthodes surveillées
  // Les méthodes d'instance
  // Les méthodes statiques
}
</script>

<style scoped>

</style>
