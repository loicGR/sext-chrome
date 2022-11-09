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
