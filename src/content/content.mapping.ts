import { IAttributes, IBound, IMap } from '@src/interfaces';
import * as R from 'ramda';

export default class ContentMapping {
  private rootDocument: Document | Window | null = document
  private ancestors: HTMLElement[] = [];
  private excludeAttributes = ['placeholder', 'method', 'style', 'value', 'class', 'tabindex'];

  public findMapping(elem: HTMLElement, iframes: HTMLIFrameElement[]) {
    console.groupCollapsed('Search mapping')
    let solution: IBound[] = []
    for (const iframe of iframes) {
      this.ancestors = this.getAncestors(iframe)
      solution = this.collectLocalisationInformation(0, this.ancestors.length, solution)
      this.rootDocument = iframe.contentDocument || iframe.contentWindow
    }
    this.ancestors = this.getAncestors(elem);
    solution = this.collectLocalisationInformation(0, this.ancestors.length, solution)
    console.log('findSolution :', solution);
    console.groupEnd()
    return solution
  }

  /**
   * Méthode récursive de récupération des ancêtres d'un élément
   * @param elem Element dont on recherche les ancêtres
   * @param ancestors
   * @private
   */
  private getAncestors(elem: HTMLElement | null, ancestors: HTMLElement[] = []): HTMLElement[] {
    if (elem) {
      ancestors.push(elem);
      return this.getAncestors(elem.parentElement, ancestors);
    } else {
      return ancestors;
    }
  }

  /**
   * Récupération du texte de l'élément s'il existe
   * @param el Element dont on récupère le texte
   */
  private getInnerText(el: HTMLElement) {
    if (el.innerText !== undefined) {
      if (el.innerText.includes('\n') || el.innerText.includes('\t')) return '';
      else return el.innerText;
    } else return '';
  }

  /**
   * Récupération de la position de l'élément par rapport à ses frères
   * @param element Element dont on recherche la position
   */
  private getRank(element: HTMLElement) {
    let index = 1;
    let condition = false;
    let previousElementSibling = element.previousElementSibling;
    while (previousElementSibling) {
      if (element.tagName === previousElementSibling.tagName) condition = true;
      previousElementSibling = <HTMLElement>previousElementSibling.previousElementSibling;
      index++;
    }
    if (condition) return index;
    else return 1;
  };

  /**
   * Récupération de la liste des attributs d'un élément
   * @param element Element dont on extrait la liste des attributs
   */
  private getAttributes(element: HTMLElement): IAttributes {
    return element.getAttributeNames().reduce((acc, name) => {
      return { ...acc, [name]: element.getAttribute(name) };
    }, {});
  };

  private collectLocalisationInformation(indexElemCible: number, fromAncestorIndex : number, solution: IBound[] = []): IBound[] {
    const borne = this.parentBorne(indexElemCible, fromAncestorIndex)
    solution.push(borne)
    if (borne.idxElem === indexElemCible) {
      // Fin de la recherche des bornes
      return solution
    } else {
      // exploration à partir de la borne parent
      return this.collectLocalisationInformation(indexElemCible, borne.idxElem, solution)
    }
  }

  /**
   * Identification dans la lignée des ancêtres du plus proche parent pour lequel **exploreElement**
   * renvoie une solution unique.
   * @param elemAncestorIndex Index de l'élément à partir duquel on remonte dans la lignée
   * @param fromAncestorIndex Index dans la lignée à partir duquel s'effectuent les appels à **querySelectorAll**
   */
  private parentBorne(elemAncestorIndex: number, fromAncestorIndex: number): IBound {
    console.log(`parentBorne idxElem:${elemAncestorIndex}, idxFrom:${fromAncestorIndex}`)
    if (elemAncestorIndex < fromAncestorIndex && fromAncestorIndex <= this.ancestors.length) {
      const from = fromAncestorIndex < this.ancestors.length ? this.ancestors[fromAncestorIndex] : null;
      for (let idxElem = elemAncestorIndex; idxElem < fromAncestorIndex; idxElem++) {
        const elem = this.ancestors[idxElem];
        const solution = this.exploreElement(elem, from);
        if (solution) {
          return {idxElem, idxFrom: fromAncestorIndex, map: solution}
        }
      }
    }
    return {idxElem: elemAncestorIndex, idxFrom: fromAncestorIndex, map: null}
  }

  /**
   * Recherche une solution de localisation discriminante par exploration des caractéristiques de l'élément.
   * @param elem Element pour lequel une solution de localisation discriminante est recherchée
   * @param from Element (ou document si null) à partir duquel la recherche est exécutée
   * @private
   */
  private exploreElement(elem: HTMLElement, from: HTMLElement | null): IMap | null {
    const attributes = this.getAttributes(elem);
    const classList = attributes.hasOwnProperty('class') ? attributes.class.trim().split(' ') : [];
    const rank = this.getRank(elem);
    let selector = '';
    console.log('exploreElement elem:', elem)
    let selectorKey = elem.tagName === 'IFRAME' ? 'iframe' : 'selector';

    // Recherche d'une solution par l'identifiant id
    if (this.findBy(attributes, elem, 'id', from)) {
      return { key: 'id', value: attributes.id };
    }

    // Recherche d'une solution par l'attribut name
    if (this.findBy(attributes, elem, 'name', from)) {
      return { key: 'name', value: attributes.name };
    }

    // Recherche d'une solution par le nom d'une classe
    for (const cls of classList) {
      if (cls.length > 0 && this.query(elem, `.${cls}`, from)) {
        return { key: 'class', value: cls };
      }
    }

    // Recherche d'une solution par l'attribut role
    if (this.findBy(attributes, elem, 'role', from)) {
      return { key: 'role', value: attributes.name };
    }

    // Recherche d'une solution par le tagName et son rang dans la fratrie
    selector = `${elem.tagName}`;
    if (this.query(elem, selector, from)) {
      return { key: selectorKey, value: selector };
    }

    // Même recherche en prenant en compte le rang dans la fratrie
    selector = `${elem.tagName}:nth-child(${rank})`;
    if (this.query(elem, selector, from)) {
      return { key: selectorKey, value: selector };
    }

    // Recherche d'une solution par association du tag et d'une classe
    for (const cls of classList) {
      if (cls.length > 0) {
        selector = `${elem.tagName}.${cls}`;
        if (this.query(elem, selector, from)) {
          return { key: selectorKey, value: selector };
        }
      }
    }

    // Même recherche en prenant en compte le rang dans la fratrie
    for (const cls of classList) {
      if (cls.length > 0) {
        selector = `${elem.tagName}.${cls}:nth-child(${rank})`;
        if (this.query(elem, selector, from)) {
          return { key: selectorKey, value: selector };
        }
      }
    }

    // Recherche d'une solution par association du tag et d'un attribut
    for (const [key, value] of Object.entries(attributes)) {
      if (!this.excludeAttributes.includes(key)) {
        selector = `${elem.tagName}[${key}="${value}"]`;
        if (this.query(elem, selector, from)) {
          return { key: selectorKey, value: selector };
        }
        // Recherche d'une solution par association du tag d'un attribut et d'une classe
        for (const cls of classList) {
          selector = `${elem.tagName}.${cls}[${key}="${value}"]`;
          if (this.query(elem, selector, from)) {
            return { key: selectorKey, value: selector };
          }
        }
      }
    }

    // Même recherche en prenant en compte le rang dans la fratrie
    for (const [key, value] of Object.entries(attributes)) {
      if (!this.excludeAttributes.includes(key)) {
        selector = `${elem.tagName}[${key}="${value}"]:nth-child(${rank})`;
        if (this.query(elem, selector, from)) {
          return { key: selectorKey, value: selector };
        }

        // Recherche d'une solution par association du tag d'un attribut et d'une classe
        for (const cls of classList) {
          selector = `${elem.tagName}.${cls}[${key}="${value}"]:nth-child(${rank})`;
          if (this.query(elem, selector, from)) {
            return { key: selectorKey, value: selector };
          }
        }
      }
    }

    // Aucune solution unique trouvée
    return null;
  }

  /**
   * Renvoie Vrai si le sélecteur passé en paramètre à la méthode **querySelectorAll** localise un seul élément et
   * que cet élément est celui ciblé par la recherche, Faux dans le cas contraire
   * @param elem Element cible de la recherche
   * @param selector Sélecteur CSS à appliquer
   * @param from Element (ou document si null) à partir duquel la méthode est exécutée
   * @private
   */
  private query(elem: HTMLElement, selector: string, from: HTMLElement | null) {
    const iDoc = (this.rootDocument as (Document | null)) || document
    const elements = (from || iDoc).querySelectorAll(selector);
    console.log(`query(${selector}) => ${elements.length} elements found`);
    return elements.length === 1 && R.equals(elements[0], elem);
  }

  /**
   * Sucre syntaxique pour une meilleure lisibilité du code
   * @param attributes
   * @param elem
   * @param attr
   * @param from
   * @private
   */
  private findBy(attributes: IAttributes, elem: HTMLElement, attr: string, from: HTMLElement | null) {
    return attributes.hasOwnProperty(attr) && this.query(elem, `[${attr}="${attributes[attr]}"]`, from);
  }

}
