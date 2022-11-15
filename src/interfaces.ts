export interface IBound {
  idxNode: number,
  from: IExploredElement | null
}

export interface INode {
  nodes: INodeElement[],
  from: IExploredElement | null
}

export interface INodeElement {
  tagName: string,
  index: number,
  text: string,
  attributes: any
}

export interface IExploredElement {
  length: number,
  selector: string,
  elements: NodeListOf<Element>
}

export interface UserDocument {
  _id: string;
  firstname: string;
  lastname: string;
  authid: { email: string };
  isActive: boolean;
  isDead: boolean;
  capacity: string;
  phone: string;
  picture: string;
  updatedAt: Date;
  createdAt: Date;
  projects: ProjectDocument[];
}

export interface ProjectDocument {
  _id: string,
  name: string
}

export interface TreenodeDocument {
  _id: string;
  _parent: string | null;
  prjid: string;
  storage: string;
  name: string;
  description: string;
}

export interface TreeStructure {
  id: string | null;
  name: string;
  children?: TreeStructure[];
  isRoot: boolean;
}

export interface ScreenDocument {
  _id: string
  prjid: string
  name: string
  description: string
  screenshot: string
  packid: string | null
}

export interface PictureDocument {
  _id: string
  type: string
  data: BufferSource

}

/**
 * Représente partiellement la structure de données renvoyée par la requête standard fetchToys.
 * Les propriétés non nécessaires ont été retirées
 */
export interface ToyDocument {
  _id: string
  name: string
  type: {
    icon: string
    typename: string
  }
  screen: string
  mapping: {key: string, value: string}[]
}
