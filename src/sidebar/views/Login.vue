<template>
  <div class='mt-2 p-2'>
    <p class='title'>Login vue</p>
    <s-input label='Account' placeholder='Account identifier' type='text' v-model='input.account' :readonly='!!account'/>
    <s-input label='Email' placeholder='Email address' type='email' v-model='input.email' />
    <s-input label='Password' placeholder='Password' type='password' v-model='input.password'/>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import SInput from '@src/sidebar/components/SInput.vue';
import { AccountId } from '@src/utils/storage.utils';
import { UserDocument } from '@src/interfaces';

@Component({
  components: { SInput },
})
export default class Login extends Vue {
  // Les props
  @Prop({default: null}) user!: UserDocument

  // Les propriétés
  private account: string | undefined
  private input = {
    account: '',
    email: '',
    password: ''
  }

  // Les propriétés calculées
  // Les hooks
  public async mounted() {
    console.log('mounted Login.vue')
    this.account = await AccountId.get()
  }
  // Les méthodes surveillées
  // Les méthodes d'instance
  // Les méthodes statiques
}
</script>


<style scoped>

</style>
