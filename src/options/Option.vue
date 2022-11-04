<template>
  <div class='flex flex-col p-3'>
    <button class='btn btn-blue ml-2 w-1/12' @click='onResetToken'>Reset Token</button>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class Option extends Vue {
  // Les props
  // Les propriétés
  // Les propriétés calculées
  // Les hooks
  public async mounted() {
    const items = await this.getAllStorageSyncData()
    console.log('items:')
    console.log(JSON.stringify(items,null, 2))
  }
  // Les méthodes surveillées
  // Les méthodes d'instance
  private async onResetToken() {
    await chrome.storage.sync.remove('token')
  }

  // Les méthodes statiques
  private getAllStorageSyncData = ()  => {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(null, (items) => {
        if (chrome.runtime.lastError) {
          return reject(chrome.runtime.lastError);
        }
        resolve(items);
      });
    });
  }
}
</script>


<style scoped>

</style>
