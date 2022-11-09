<template>
  <div v-if='theMsg.length > 0' class='alert-box' :class='color'>
    <s-alert-icon :type='type' css='fill-white'/>
    <div class='text-white text-sm font-roboto ml-2' v-html='theMsg'></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import SAlertIcon from '@src/sidebar/components/sAlertIcon.vue';

@Component({
  components: { SAlertIcon },
})
export default class SAlert extends Vue {
  // Les props
  @Prop({default: ''}) private type!: string
  @Prop() private msg!: string | string[]

  // Les propriétés

  // Les propriétés calculées
  private get color() {
    switch (this.type) {
      case 'success':
        return 'bg-s_green'
      case 'info' :
        return 'bg-s_blue'
      case 'warning':
        return 'bg-s_orange'
      case 'error':
        return 'bg-s_red'
      default:
        return undefined
    }
  }

  private get theMsg() {
    if (typeof this.msg === 'string') {
      return this.msg
    } else {
      return this.msg.join('</br>')
    }
  }

  // Les hooks
  // Les méthodes surveillées
  // Les méthodes d'instance
  // Les méthodes statiques
}
</script>

<style scoped>
.alert-box {
  @apply rounded pl-2 py-1 flex flex-row items-center
}
</style>
