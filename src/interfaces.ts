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
