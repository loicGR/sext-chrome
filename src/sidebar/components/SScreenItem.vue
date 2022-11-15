<template>
  <div v-if='screen' class='border border-gray-300 rounded drop-shadow-md  my-2 flex flex-col bg-white '>
    <s-loading :loading='loading' />
    <div class='flex flex-row items-center cursor-pointer' @click='$emit("selected")'>

      <!-- Partie gauche l'image de l'écran-->
      <div class='flex flex-col justify-center fond m-1'
           :style='`height: ${size}px; min-width:${size}px !important`'>
        <div class='bg-contain bg-center bg-no-repeat h-full' :style='`background-image: url(${shotUrl})`' />
      </div>

      <!--      Partie droite : Nom et description de l'écran-->
      <div class='w-100 pl-3'>
        <p class='text-base'>{{ screen.name }}</p>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, PropSync, Vue } from 'vue-property-decorator';
import { PictureDocument, ScreenDocument } from '@src/interfaces';
import pictures from '@src/utils/picture.utils';
import { fetchPicture } from '@src/axios/screen.axios';
import SLoading from '@src/sidebar/components/SLoading.vue';

@Component({
  components: { SLoading },
})
export default class SScreenItem extends Vue {
  // Les props
  @Prop({ default: null }) private screen!: ScreenDocument | null;
  @PropSync('pictures', { default: [] }) private screenPictures!: PictureDocument[];

  // Les propriétés
  private size = 75;
  private loading: boolean = false;
  private shotUrl: string = '';

  // Les propriétés calculées
  // Les hooks
  public mounted() {
    this.loadShotUrl();
  }

  // Les méthodes surveillées
  // Les méthodes d'instance
  private loadShotUrl() {
    if (this.screen && this.screen.screenshot) {
      const url = pictures.getUrl(this.screen.screenshot);
      if (url) {
        this.shotUrl = url;
      } else {
        this.shotUrl = '';
        this.loading = true;
        fetchPicture(this.screen.screenshot).then(picture => {
          this.shotUrl = pictures.setUrl(picture);
          this.loading = false;
        });
      }
    } else {
      this.shotUrl = '';
    }
  }

  // Les méthodes statiques
}
</script>

<style scoped>
.fond {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
}
</style>
