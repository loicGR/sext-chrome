<template>
  <svg v-if='name === "arrow-left"' :class='css' style='width:24px;height:24px' viewBox='0 0 24 24'>
    <path fill='currentColor' d='M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z' />
  </svg>
  <svg v-else-if='name === "checkbox-marked"' :class='css' style='width:24px;height:24px' viewBox='0 0 24 24'>
    <path fill='currentColor'
          d='M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z' />
  </svg>
  <svg v-else-if='name === "menu-down"' :class='css' style='width:24px;height:24px' viewBox='0 0 24 24'>
    <path fill='currentColor' d='M7,10L12,15L17,10H7Z' />
  </svg>
  <svg v-else-if='name === "alpha-b-box"' :class='css' style='width:24px;height:24px' viewBox='0 0 24 24'>
    <path fill='currentColor'
          d='M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M15,10.5V9A2,2 0 0,0 13,7H9V17H13A2,2 0 0,0 15,15V13.5C15,12.7 14.3,12 13.5,12C14.3,12 15,11.3 15,10.5M13,15H11V13H13V15M13,11H11V9H13V11Z' />
  </svg>
  <svg v-else-if='name === "link"' :class='css' style='width:24px;height:24px' viewBox='0 0 24 24'>
    <path fill='currentColor'
          d='M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z' />
  </svg>
  <svg v-else-if='name === "format-text"' :class='css' style='width:24px;height:24px' viewBox='0 0 24 24'>
    <path fill='currentColor'
          d='M18.5,4L19.66,8.35L18.7,8.61C18.25,7.74 17.79,6.87 17.26,6.43C16.73,6 16.11,6 15.5,6H13V16.5C13,17 13,17.5 13.33,17.75C13.67,18 14.33,18 15,18V19H9V18C9.67,18 10.33,18 10.67,17.75C11,17.5 11,17 11,16.5V6H8.5C7.89,6 7.27,6 6.74,6.43C6.21,6.87 5.75,7.74 5.3,8.61L4.34,8.35L5.5,4H18.5Z' />
  </svg>
  <svg v-else-if='name === "form-textbox"' style='width:24px;height:24px' viewBox='0 0 24 24'>
    <path fill='currentColor'
          d='M17,7H22V17H17V19A1,1 0 0,0 18,20H20V22H17.5C16.95,22 16,21.55 16,21C16,21.55 15.05,22 14.5,22H12V20H14A1,1 0 0,0 15,19V5A1,1 0 0,0 14,4H12V2H14.5C15.05,2 16,2.45 16,3C16,2.45 16.95,2 17.5,2H20V4H18A1,1 0 0,0 17,5V7M2,7H13V9H4V15H13V17H2V7M20,15V9H17V15H20Z' />
  </svg>
  <svg v-else-if='name === "map"' style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M15,19L9,16.89V5L15,7.11M20.5,3C20.44,3 20.39,3 20.34,3L15,5.1L9,3L3.36,4.9C3.15,4.97 3,5.15 3,5.38V20.5A0.5,0.5 0 0,0 3.5,21C3.55,21 3.61,21 3.66,20.97L9,18.9L15,21L20.64,19.1C20.85,19 21,18.85 21,18.62V3.5A0.5,0.5 0 0,0 20.5,3Z" />
  </svg>
  <svg v-else-if='name === "map-check"' style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M18.25,22L15.5,19L16.66,17.82L18.25,19.41L21.84,15.82L23,17.23M20.5,3A0.5,0.5 0 0,1 21,3.5V13.36C20.36,13.13 19.69,13 19,13C17.46,13 16.06,13.6 15,14.56V7.1L9,5V16.9L13.04,18.3C13,18.54 13,18.77 13,19C13,19.46 13.06,19.92 13.16,20.36L9,18.9L3.66,20.97C3.59,21 3.55,21 3.5,21A0.5,0.5 0 0,1 3,20.5V5.38C3,5.15 3.16,4.97 3.35,4.9L9,3L15,5.1L20.33,3" />
  </svg>
  <div v-else>
    <p>{{ alt ? alt : name }}</p>
  </div>


</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SSvgIcons extends Vue {
  // Les props
  @Prop() private name!: string;
  @Prop({ default: null }) alt!: string | null;
  @Prop({ default: undefined }) css!: string;

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
