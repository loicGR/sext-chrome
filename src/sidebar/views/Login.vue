<template>
  <div class='mt-4 card'>
    <div class='toolbar-blue'>
      <p class='toolbar-title'>Connexion</p>
    </div>
    <div class='m-3'>
      <s-alert :msg='msgErr' type='error'/>
      <s-input label='Account Identifier' placeholder='Your account identifier' type='text' v-model='input.account' :readonly='existAccount'/>
      <s-input label='Email' placeholder='Email address' type='email' v-model='input.email' />
      <s-input label='Password' placeholder='Password' type='password' v-model='input.password'/>
      <div class='flex justify-center'>
        <button class='btn btn-blue' @click='onLogin'>Login</button>
      </div>
      <div class='py-2'>
        <a v-if='existAccount' @click='onChangeAccount' class='text-s_blue underline cursor-pointer'>Change account identifier</a>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, PropSync, Vue } from 'vue-property-decorator';
import SInput from '@src/sidebar/components/SInput.vue';
import { AccountId, UserEmail } from '@src/utils/storage.utils';
import { UserDocument } from '@src/interfaces';
import { getAuth, getUserByAuthId } from '@src/axios/user.axios';
import SAlert from '@src/sidebar/components/SAlert.vue';

@Component({
  components: { SAlert, SInput },
})
export default class Login extends Vue {
  // Les props
  @PropSync('user') private theUser!: UserDocument | null

  // Les propriétés
  private account: string | undefined | null
  private existAccount: boolean = false
  private input = {
    account: '',
    email: '',
    password: ''
  }
  private msgErr: string[] = []

  // Les propriétés calculées
  // Les hooks
  public async mounted() {
    // console.log('mounted Login.vue')
    this.account = await AccountId.get()
    this.input.account = this.account || ''
    this.input.email = await UserEmail.get() || ''
    this.existAccount = !!this.account
  }

  // Les méthodes surveillées
  // Les méthodes d'instance
  private async onLogin() {
    this.msgErr = []
    if (this.validInput()) {
      await AccountId.set(this.input.account);
      const response = await getAuth(this.input.email, this.input.password);
      if (typeof response === 'string') {
        // Failed login
        this.msgErr.push(response)
        this.existAccount = true;
      } else {
        // Successfully login
        const user = await getUserByAuthId();
        if (user) {
          await UserEmail.set(user.authid.email)
        }
        this.theUser = user
        // console.log('onLogin Successfully login -> user:', { ...this.theUser })
      }
    } else {
      // Message d'erreur
      if (this.input.account.length === 0 ) this.msgErr.push('Account Identifier is required')
      if (this.input.email.length === 0) this.msgErr.push('Email is required')
      if (this.input.password.length === 0) this.msgErr.push('Password is required')
    }
  }

  private async onChangeAccount() {
    // console.log('onChangeAccount')
    this.existAccount = false
    this.account = undefined
    await AccountId.clear()
  }

  private validInput() {
    const a = this.input.account
    const e = this.input.email
    const p = this.input.password
    return a.length > 0 && e.length > 0 && p.length > 0
  }

  // Les méthodes statiques
}
</script>


<style scoped>

</style>
