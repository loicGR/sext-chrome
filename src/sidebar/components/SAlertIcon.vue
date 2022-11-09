<template>
<!--  <div class='flex flex-col justify-center'>-->
    <svg v-if='type === "error"' :class='css' style="width:24px;height:24px" viewBox="0 0 24 24">
      <path d="M8.27,3L3,8.27V15.73L8.27,21H15.73C17.5,19.24 21,15.73 21,15.73V8.27L15.73,3M9.1,5H14.9L19,9.1V14.9L14.9,19H9.1L5,14.9V9.1M11,15H13V17H11V15M11,7H13V13H11V7" />
    </svg>
    <svg v-if='type === "warning"' :class='css' style="width:24px;height:24px" viewBox="0 0 24 24">
      <path d="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16" />
    </svg>
    <svg v-if='type === "info"' :class='css' style="width:24px;height:24px" viewBox="0 0 24 24">
      <path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z" />
    </svg>
    <svg v-if='type === "success"' :class='css' style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20M16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z" />
    </svg>
<!--  </div>-->
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SAlertIcon extends Vue {
  // Les props
  @Prop() private type!: string
  @Prop({default: undefined}) css!: string
  // Les propriétés
  // Les propriétés calculées
  // Les hooks
  // Les méthodes surveillées
  // Les méthodes d'instance
  // Les méthodes statiques
}
</script>

<style scoped>

</style>
