<template>
  <div class='h-full'>
<!--    Ligne de présentation ex: "Antoine Lafouine on reposity KWEB" avec le lien "Logout" placé dessous-->
    <div class='mt-1 flex flex-row justify-center items-center'>
      <p class='font-roboto font-semibold'>{{userName}}</p>
      <p class='mx-1 font-roboto'>on repository</p>
      <p class='font-roboto font-semibold'>{{projectName}}</p>
    </div>
    <div class='flex flex-row justify-center'>
      <a @click='onLogOut' class='text-s_blue underline cursor-pointer'>Log out</a>
    </div>
  </div>


</template>

<script lang="ts">
import { Component, PropSync, Vue } from 'vue-property-decorator';
import { JwtToken } from '@src/utils/storage.utils';
import { UserDocument } from '@src/interfaces';

@Component
export default class Screen extends Vue {
  // Les props
  @PropSync('user') private theUser!: UserDocument | null

  // Les propriétés
  // Les propriétés calculées
  private get userName() {
    return this.theUser ? `${this.theUser.firstname} ${this.theUser.lastname}` : '??'
  }

  private get projectName() {
    return this.theUser && this.theUser.projects.length ? this.theUser.projects[0].name : '!!'
   }

  // Les hooks
  public mounted() {
    console.log('mounted Screen.vue')
  }
  // Les méthodes surveillées
  // Les méthodes d'instance
  private onLogOut() {
    JwtToken.logout()
    this.theUser = null
  }


  // Les méthodes statiques
}
</script>

<style scoped>

</style>
