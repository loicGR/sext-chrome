<template>
  <div v-if='toy' class='flex flex-col bord color-text bg-white my-2 p-1.5'>
    <!--    Icon type et Nom de l'élément graphique-->
    <div
      class=' flex flex-row items-center text-base cursor-pointer '
      @click='onClickToy'>
      <s-svg-icons v-if='toy.type' :name='toy.type.icon' :alt='toy.type.typename' />
      <p class='mx-1'>{{ toy.name }}</p>
    </div>
    <!--    Visualisation du mapping-->
    <div v-if='toy._id === currentToyId' class='flex flex-col'>
      <div v-if='toy.mapping && toy.mapping.length '>
        <div class='flex flex-row items-center bg-gray-100'>
          <div class='w-16 '>
            <p class='text-center'>Key</p>
          </div>
          <div class='w-full'>
            <p class='text-center'>Value</p>
          </div>
          <div class='btn-mapping' @click='onClickMap'>
            <s-svg-icons name='map' />
          </div>
        </div>
        <div v-for='(map, idx) in toy.mapping' :key='idx' class='flex flex-row items-center border-t border-gray-300'>
          <div class='w-16'>
            <p>{{ map.key }}</p>
          </div>
          <div class='w-full'>
            <p class='whitespace-normal'>{{ map.value }}</p>
          </div>
        </div>
      </div>
      <div v-else class='flex flex-row justify-between items-center bg-gray-100'>
        <div class='w-full'>
          <p class='text-center'>No mapping</p>
        </div>
        <div class='btn-mapping' @click='onClickMap'>
          <s-svg-icons name='map' />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, PropSync, Vue } from 'vue-property-decorator';
import { ToyDocument } from '@src/interfaces';
import SSvgIcons from '@src/sidebar/components/SSvgIcons.vue';

@Component({
  components: { SSvgIcons },
})
export default class SToyItem extends Vue {
  // Les props
  @Prop({ default: null }) private toy!: ToyDocument | null;
  @PropSync('current', { default: null }) private currentToyId!: string | null;

  // Les propriétés
  // Les propriétés calculées
  // Les hooks
  // Les méthodes surveillées
  // Les méthodes d'instance
  private onClickToy() {
    if (this.toy) {
      if (this.currentToyId === this.toy._id) {
        this.currentToyId = null;
      } else {
        this.currentToyId = this.toy._id;
      }
    }
  }

  private onClickMap() {
    console.log('onClickMap');
    this.$emit('tomap')
  }

  // Les méthodes statiques
}
</script>

<style scoped>
.bord {
  @apply border border-gray-300 rounded shadow-md hover:border-gray-400 hover:shadow-xl
}

.color-text {
  @apply text-gray-400 hover:text-s_black
}

.btn-mapping {
  @apply m-0.5 text-s_black rounded bg-gray-100 hover:bg-white hover:text-s_blue cursor-pointer
}
</style>
