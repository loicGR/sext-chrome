import { showIframe } from '@src/content/sidebar.frame';
import ContentMapping from '@src/content/content.mapping';
import { BUBBLE_ID, bubblePosition, hideBubble, showBubble } from '@src/content/content.bubble';
import { IBound } from '@src/interfaces';
import { bubblePostMessage, toysPostMessage } from '@src/content/index';

let iframes: HTMLIFrameElement[] = [];
let currentElem: HTMLElement | null = null;
let currentSolution: IBound[] = [];

/**
 * Démarrage du mapping suite à réception du message sur le port d'écoute mappingPort
 */
export function startMapping() {
  iframes = [];
  currentElem = null;
  startEventMapping();
}

export function stopMapping() {
  for (const iframe of iframes) {
    const iDoc = iframe.contentDocument || iframe.contentWindow;
    if (iDoc) {
      stopEventMapping(iDoc);
    }
  }
  hideBubble();
  stopHighlight();
  stopEventMapping();
}

function startEventMapping(from: Document | Window | null = null) {
  // console.log('addEventListeners')
  (from || document).addEventListener('mousemove', mouseMoveEvent, false);
  (from || document).addEventListener('mouseover', mouseOverEvent, false);
  (from || document).addEventListener('mouseout', mouseOutEvent, false);
  (from || document).addEventListener('keydown', keyPressEvent, true);
}

function stopEventMapping(from: Document | Window | null = null) {
  // console.log('removeEventListeners')
  (from || document).removeEventListener('mousemove', mouseMoveEvent, false);
  (from || document).removeEventListener('mouseover', mouseOverEvent, false);
  (from || document).removeEventListener('mouseout', mouseOutEvent, false);
  (from || document).removeEventListener('keydown', keyPressEvent, true);

}

function clickEventListener(target: EventTarget, add: boolean = false) {
  // console.log(`clickEventListener add:${add} on:`, target)
  if (add) {
    target.addEventListener('click', clickEvent, true);
  } else {
    target.removeEventListener('click', clickEvent, true);
  }
}

function iframeEventListener(elem: HTMLIFrameElement, add: boolean = false) {
  try {
    const iDoc = elem.contentDocument || elem.contentWindow;
    if (add) {
      console.log('iframeEventListener iDoc: ', iDoc);
      startEventMapping(iDoc);
      iframes.push(elem);
    } else {
      stopEventMapping(iDoc);
      iframes.pop();
    }
  } catch (e: any) {
    if (add) {
      bubblePostMessage('solution', {solution: null})
    }
    console.log('iframeEventListener failed :', e.message);
  }
}

const mouseMoveEvent = (event: Event) => {
  bubblePosition(event as MouseEvent);
  showBubble();
};

const mouseOverEvent = (event: Event) => {
  console.log('mouveOverEvent event:', event.target);
  if (event.target) {
    const elem = event.target as HTMLElement;
    if (elem.getAttribute('id') !== BUBBLE_ID) {
      if (elem.tagName === 'IFRAME') {
        iframeEventListener(<HTMLIFrameElement>elem, true);
      }
      // Supprime la surbrillance de l'actuel currentElem
      stopHighlight();

      // Installe l'écoute de l'évènement clic sur l'élément survolé
      clickEventListener(event.target, true);

      // Positionne le focus pour garantir l'écoute des évènements du clavier
      setFocus(elem);

      // Installe la surbrillance sur l'élément survolé
      elem.style.outline = '2px dashed #83c0e6';
      elem.style.boxShadow = '0 0 10px #83c0e6';

      // Recherche les solutions pour l'élément survolé
      const mapper = new ContentMapping();
      currentSolution = mapper.findMapping(elem, iframes);

      // Transmet la solution à la bulle
      bubblePostMessage('solution', currentSolution);

      // Initialise currentElem
      currentElem = elem;
    }
  }
};

function setFocus(elem: HTMLElement) {
  const savedTabIndex = elem.getAttribute('tabindex');
  elem.setAttribute('tabindex', '-1');
  elem.focus();
  if (savedTabIndex) {
    elem.setAttribute('tabindex', savedTabIndex);
  }
}

export function stopHighlight(elem: HTMLElement | null = null) {
  const el = elem ? elem : currentElem;
  if (el) {
    el.style.outline = '';
    el.style.boxShadow = '';
  }
}

const mouseOutEvent = (event: Event) => {
  console.log('mouveOutEvent event:', event.target);
  if (event.target) {
    const elem = event.target as HTMLElement;
    if (elem.tagName === 'IFRAME') {
      iframeEventListener(<HTMLIFrameElement>elem);
    }
    clickEventListener(event.target);
    stopHighlight(elem);
  }
};

export const keyPressEvent = (event: Event) => {
  event.stopPropagation();
  event.preventDefault();
  const code = (event as KeyboardEvent).code;
  console.log('keyPressEvent event:', code);
  if (code === 'Escape') {
    stopMapping();
    showIframe();
  }

};

const clickEvent = async (event: Event) => {

  event.preventDefault();
  event.stopImmediatePropagation();
  event.stopPropagation();

  console.log('clickEvent event:', event);

  stopMapping();
  showIframe();

  toysPostMessage('stop', currentSolution);

};
