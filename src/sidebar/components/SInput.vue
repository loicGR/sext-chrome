<template>
  <label class='label flex flex-col justify-items-start my-2'>
    {{ label }}
    <input class='input' :type='type' :placeholder='placeholder' :value='value' :readonly='readonly'
           :class='readonly ? "readonly" : undefined'
           @change='$emit("input", $event.target.value)'>
  </label>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SInput extends Vue {
  // Les props
  @Prop({ default: 'text' }) private type!: string;
  @Prop() private label!: string;
  @Prop() private placeholder!: string;
  @Prop() private value!: any;
  @Prop({ default: false }) private readonly!: boolean;

  // Les propriétés

  // Les propriétés calculées
  // Les hooks
  // Les méthodes surveillées
  // Les méthodes d'instance
  // Les méthodes statiques
}
</script>

<style scoped>
.label {
  @apply text-sm text-gray-500
}

.input {
  @apply text-sm text-s_black font-semibold border border-gray-400 p-1.5 rounded cursor-text focus:outline-0 focus:bg-slate-50
}

/* Utilisation indirecte */
.readonly {
  @apply border-0 focus:outline-none cursor-auto
}
</style>
