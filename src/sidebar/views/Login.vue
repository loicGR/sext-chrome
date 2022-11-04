<template>
  <div class='mt-2 p-2'>
    <p class='title'>Login vue</p>
    <s-input label='Account' placeholder='Account identifier' type='text' v-model='account'/>
    <s-input label='Email' placeholder='Email address' type='email' v-model='email' :readonly='existEmail'/>
    <s-input label='Password' placeholder='Password' type='password' v-model='password'/>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator';
import SInput from '@src/sidebar/components/SInput.vue';
@Component({
  components: { SInput },
})
export default class Login extends Vue {
  // Les props
  // Les propriétés
  private account: string = ''
  private email: string = 'antoine@gmail.com'
  private password: string = ''
  private existEmail: boolean = true

  // Les propriétés calculées
  // Les hooks
  // Les méthodes surveillées
  @Watch('email')
  private onChangeEmail() {
    console.log('email:', this.email)
  }
  // Les méthodes d'instance
  // Les méthodes statiques
}
</script>


<style scoped>

</style>
