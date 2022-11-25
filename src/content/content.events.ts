import { showIframe } from '@src/content/sidebar.frame';
import { mappingPort } from '@src/content/index';
import ContentMapping from '@src/content/content.mapping';

export let currentElem: HTMLElement | null = null

export function startEventMapping() {
  // console.log('addEventListeners')
  document.addEventListener('mouseover', mouseOverEvent, false);
  document.addEventListener('mouseout', mouseOutEvent, false);
  document.addEventListener('keydown', keyPressEvent, true);
}

export function stopEventMapping() {
  // console.log('removeEventListeners')
  document.removeEventListener('mouseover', mouseOverEvent, false);
  document.removeEventListener('mouseout', mouseOutEvent, false);
  document.removeEventListener('keydown', keyPressEvent, true);

}

function clickEventListener(target: EventTarget, add: boolean = false) {
  // console.log(`clickEventListener add:${add} on:`, target)
  if (add) {
    target.addEventListener('click', clickEvent, true)
  } else {
    target.removeEventListener('click', clickEvent, true)
  }
}

const mouseOverEvent = async (event: MouseEvent) => {
  // console.log('mouveOverEvent event:', event.target)
  if (event.target) {
    clickEventListener(event.target, true)
    currentElem = event.target as HTMLElement
    currentElem.style.border = '2px dashed #83c0e6';
    currentElem.style.boxShadow = '0 0 10px #83c0e6';
    currentElem.focus()
    currentElem.style
  }
};

export function stopHighlight() {
  if (currentElem) {
    currentElem.style.border = '';
    currentElem.style.boxShadow = '';
  }
}

const mouseOutEvent = async (event: MouseEvent) => {
  // console.log('mouveOutEvent event:', event.target)
  if (event.target) {
    clickEventListener(event.target)
    stopHighlight()
  }
};

export const keyPressEvent = (event: KeyboardEvent) => {
  event.stopPropagation()
  event.preventDefault()
  console.log('keyPressEvent event:', event.code)
  if (event.code === 'Escape') {
    stopHighlight()
    stopEventMapping()
    showIframe()
  }

};

const clickEvent = async (event: Event) => {

  event.preventDefault();
  event.stopImmediatePropagation();
  event.stopPropagation();

  console.log('clickEvent event:', event);

  stopHighlight()
  if (event.target) {
    clickEventListener(event.target)
    const mapper = new ContentMapping()
    mapper.findMapping(event.target as HTMLElement)
  }
  stopEventMapping();

  if (mappingPort) {
    mappingPort.postMessage({action: 'end', target: event.target});
  }
  showIframe()
};
