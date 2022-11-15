<template>
  <div class='w-full h-full flex flex-col' name='page-main'>
    <!--    Ligne de présentation ex: "Antoine Lafouine on reposity KWEB" avec le lien "Logout" placé dessous-->
    <div class='mt-1 flex flex-row justify-center items-center'>
      <p class='font-roboto font-semibold'>{{ userName }}</p>
      <p class='mx-1 font-roboto'>on repository</p>
      <p class='font-roboto font-semibold'>{{ project.name }}</p>
    </div>
    <div class='flex flex-row justify-center'>
      <a @click='onLogOut' class='text-s_blue underline cursor-pointer'>Log out</a>
    </div>
    <toys v-if='screenDoc' :screen.sync='screenDoc'/>
    <screens v-else-if='packId' :pack.sync='packId' :pictures.sync='pictures' :prjid='project._id || null'
             :screen.sync='screenDoc' />
    <packs v-else :pack.sync='packId' :tree='treePacks' />
  </div>
</template>

<script lang='ts'>
import { Component, Prop, PropSync, Vue } from 'vue-property-decorator';
import { JwtToken } from '@src/utils/storage.utils';
import {
  PictureDocument,
  ProjectDocument,
  ScreenDocument,
  TreenodeDocument,
  TreeStructure,
  UserDocument,
} from '@src/interfaces';
import { fetchPackTree } from '@src/axios/screen.axios';
import SPackItem from '@src/sidebar/components/SPackItem.vue';
import Packs from '@src/sidebar/views/Packs.vue';
import Screens from '@src/sidebar/views/Screens.vue';
import Toys from '@src/sidebar/views/Toys.vue';

@Component({
  components: { Toys, Screens, Packs, SPackItem },
})
export default class Smain extends Vue {
  // Les props
  @PropSync('user') private theUser!: UserDocument | null;
  @Prop({ default: null }) private project!: ProjectDocument;

  // Les propriétés
  private packId: string | null = null;
  private treePacks: TreeStructure[] = [];
  private pictures: PictureDocument[] = [];
  private screenDoc: ScreenDocument | null = null;

  // Les propriétés calculées
  private get userName() {
    return this.theUser ? `${this.theUser.firstname} ${this.theUser.lastname}` : '??';
  }

  // Les hooks
  public async mounted() {
    if (this.project) {
      this.treePacks = await this.loadTreePacks();
    } else {
      this.treePacks = [];
    }
    console.log(`mounted Screen.vue packId:${this.packId} treePacks:`, { ...this.treePacks });
  }

  // Les méthodes surveillées
  // Les méthodes d'instance
  private onLogOut() {
    JwtToken.logout();
    this.theUser = null;
  }

  private async loadTreePacks() {
    const nodes = await fetchPackTree(this.project._id);
    return this.buildTree(nodes);
  }

  private buildTree(nodes: TreenodeDocument[], from: string | null = null) {
    const children: TreenodeDocument[] = [];
    const returnedTree: TreeStructure[] = [];

    for (const node of nodes) {
      if (node._parent === from) {
        children.push(node);
      }
    }

    children.sort((a, b) => a.name.localeCompare(b.name));

    for (const child of children) {
      const childNode: TreeStructure = {
        id: child._id,
        name: child.name,
        isRoot: !from,
      };
      const childrenOfChild = this.buildTree(nodes, child._id);
      if (childrenOfChild.length > 0) {
        childNode.children = childrenOfChild;
      } else {
        childNode.children = [];
      }
      returnedTree.push(childNode);
    }

    return returnedTree;
  }


  // Les méthodes statiques
}
</script>

<style scoped>

</style>
