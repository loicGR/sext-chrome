<template>
  <div class='flex flex-col' :style='`width: ${frameWidth-2}px; height: ${maxHeight}px`' name='appvue'>
    <!--    Bandeau supérieur avec logo et titre-->
    <div class='bg-white drop-shadow-lg border-b border-gray-300 h-12 flex flex-col justify-center'>
      <div class='flex flex-row justify-center align-middle w-full'>
        <img class='h-8 mr-1' src='../assets/LogoScapin.svg' alt='Logo SCAPIN' />
        <span class='text-xl text-s_black font-roboto'>Scapin Screen Scanner</span>
      </div>
    </div>

    <div class='h-full w-full flex flex-col'>
      <smain v-if='user && project' :user.sync='user' :project='project'></smain>
      <project v-else-if='user && !project' @save='project = $event' />
      <login v-else :user.sync='user' />
    </div>

    <div class='flex flex-row justify-center' :style='`height: ${imgHeight}px`'>
      <div class='w-8/12'>
        <img src='@assets/image-fond.png' alt='fond' />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator';
import Login from '@src/sidebar/views/Login.vue';
import { iframeWidth } from '@src/utils/storage.utils';
import { ProjectDocument, UserDocument } from '@src/interfaces';
import { getUserByAuthId } from '@src/axios/user.axios';
import Project from '@src/sidebar/views/Project.vue';
import Smain from '@src/sidebar/views/Smain.vue';

@Component({
  components: { Smain, Project, Login },
})
export default class App extends Vue {
  // Les props
  // Les propriétés
  private frameWidth = 0;
  private user: UserDocument | null = null;
  private project: ProjectDocument | null = null;
  private maxHeight: number = 500;
  private imgHeight: number = 120;

  // Les propriétés calculées
  // Les hooks
  public async mounted() {
    // console.log('mounted App.vue')

    this.frameWidth = await iframeWidth();
    this.updateHeight();


    chrome.runtime.onMessage.addListener(async message => {
      // console.log('onMessage :', message)
      if (message.from === 'iframe' && message.show && !this.user) {
        // console.log('onMessage :', message)
        this.user = await getUserByAuthId();
        // console.log('onMessage get user:', this.user);
      }
    });

    window.addEventListener('resize', () => {
      this.updateHeight();
    });

  }

  // Les méthodes surveillées
  @Watch('user')
  private async onChangeUser() {
    if (this.user) {
      this.project = this.user.projects.length === 1 ? this.user.projects[0] : null;
    } else {
      this.project = null;
    }
  }

  @Watch('project')
  private async onChangeProject() {

  }

  // Les méthodes d'instance
  private updateHeight() {
    this.maxHeight = window.innerHeight;
    // console.log('innerHeight: ', this.maxHeight);
  }

  // Les méthodes statiques
}
</script>

<style scoped>

</style>
