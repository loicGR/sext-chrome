import { showIframe } from '@src/content/sidebar.frame';
import { mappingPort } from '@src/content/index';
import ContentMapping from '@src/content/content.mapping';

let iframes: HTMLIFrameElement[] = [];
let currentElem: HTMLElement | null = null;

/**
 * Démarrage du mapping suite à réception du message sur le port d'écoute mappingPort
 */
export function startMapping() {
  iframes = [];
  currentElem = null;
  startEventMapping();
}

export function stopMapping() {
  for(const iframe of iframes) {
    const iDoc = iframe.contentDocument || iframe.contentWindow
    if (iDoc) {
      stopEventMapping(iDoc);
    }
  }
  stopHighlight()
  stopEventMapping()
}

function startEventMapping(from: Document | Window | null = null) {
  // console.log('addEventListeners')
  (from || document).addEventListener('mouseover', mouseOverEvent, false);
  (from || document).addEventListener('mouseout', mouseOutEvent, false);
  (from || document).addEventListener('keydown', keyPressEvent, true);
}

function stopEventMapping(from: Document | Window | null = null) {
  // console.log('removeEventListeners')
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
      console.log('iframeEventListener iDoc: ', iDoc)
      startEventMapping(iDoc);
      iframes.push(elem);
    } else {
      stopEventMapping(iDoc);
      iframes.pop();
    }
  } catch (e: any) {
    if (add) {
      alert(`can't get inside an iframe`)
    }
    console.log('iframeEventListener failed :', e.message);
  }
}

const mouseOverEvent = (event: Event) => {
  console.log('mouveOverEvent event:', event.target);
  if (event.target) {
    const elem = event.target as HTMLElement;
    if (elem.tagName === 'IFRAME') {
      iframeEventListener(<HTMLIFrameElement>elem, true);
    }
    stopHighlight()
    clickEventListener(event.target, true);
    setFocus(elem)
    elem.style.outline = '2px dashed #83c0e6';
    elem.style.boxShadow = '0 0 10px #83c0e6';
    currentElem = elem;
  }
};

function setFocus(elem: HTMLElement) {
  const savedTabIndex = elem.getAttribute('tabindex')
  elem.setAttribute('tabindex', '-1');
  elem.focus();
  if (savedTabIndex) {
    elem.setAttribute('tabindex', savedTabIndex);
  }
}

export function stopHighlight(elem: HTMLElement | null = null) {
  const el = elem ? elem : currentElem
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
    stopMapping()
    showIframe();
  }

};

const clickEvent = async (event: Event) => {

  event.preventDefault();
  event.stopImmediatePropagation();
  event.stopPropagation();

  console.log('clickEvent event:', event);

  if (currentElem) {
    clickEventListener(currentElem);
    const mapper = new ContentMapping();
    mapper.findMapping(currentElem, iframes);
  }
  stopMapping();

  if (mappingPort) {
    mappingPort.postMessage({ action: 'end', target: event.target });
  }
  showIframe();
};
