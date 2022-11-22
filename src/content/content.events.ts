import { showIframe } from '@src/content/sidebar.frame';
import { mappingPort } from '@src/content/index';


export function startEventMapping() {
  console.log('addEventListeners')
  document.addEventListener('mouseover', mouseOverEvent, false);
  document.addEventListener('mouseout', mouseOutEvent, false);
  // document.addEventListener('keypress', keyPressEvent, false);
}

export function stopEventMapping() {
  console.log('removeEventListeners')
  document.removeEventListener('mouseover', mouseOverEvent, false);
  document.removeEventListener('mouseout', mouseOutEvent, false);
  // document.removeEventListener('keypress', keyPressEvent, false);
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
  }
  // if (await getTarget() !== undefined && event.target.id != 'extension-frame-scapin') {
  //   currentElement = event.target;
  //
  //   const savedTabIndex = event.target.getAttribute('tabindex')
  //   event.target.setAttribute('tabindex', '-1');
  //   event.target.focus();
  //   event.target.setAttribute('tabindex', savedTabIndex);
  //
  //   if (R.equals(currentElement.tagName, 'IFRAME')) {
  //     solutions = [];
  //     nodes = R.reverse(getNodesAttributes(getListOfNodes(currentElement)));
  //     const optimalSolution = findOptimalSolution(nodes.length, null);
  //
  //     await addToFrames(optimalSolution);
  //     console.log(await getFrames());
  //   }
  //   else {
  //     event.target.style.border = '2px dashed #83c0e6';
  //     event.target.style.boxShadow = '0 0 10px #83c0e6';
  //   }
  // }
};

const mouseOutEvent = async (event: MouseEvent) => {
  // console.log('mouveOutEvent event:', event.target)
  if (event.target) {
    clickEventListener(event.target)
  }
  // if (await getTarget() !== undefined) {
  //   if (R.equals(event.target.tagName, 'IFRAME') && event.target.id != 'extension-frame-scapin') {
  //     await removeFromFrames();
  //   }
  //   if (event.target.id != 'extension-frame-scapin') {
  //     currentElement.style.boxShadow = '';
  //   }
  //   currentElement.style.border = '';
  //   event.stopPropagation();
  // }
};

export const keyPressEvent = async (event: KeyboardEvent) => {
  // console.log('keyPressEvent event:', event.code)
  // const storageTarget = await getTarget();
  // if (R.equals(event.code, 'KeyS') && currentElement.id != 'extension-frame-scapin' && storageTarget !== undefined) {
  //   currentElement.style.border = '';
  //   currentElement.style.boxShadow = '';
  //
  //   solutions = [];
  //   console.clear();
  //
  //   nodes = R.reverse(getNodesAttributes(getListOfNodes(currentElement)));
  //   const optimalSolution = findOptimalSolution(nodes.length, null);
  //
  //   if (optimalSolution) {
  //     await addSolutionToDB(optimalSolution, storageTarget);
  //   }
  // }
  // else if (R.equals(event.code, 'KeyC')) {
  //   await chrome.storage.sync.set({frames: []});
  //   await chrome.storage.sync.remove('target');
  // }
};

const clickEvent = async (event: Event) => {

  event.preventDefault();
  event.stopImmediatePropagation();
  event.stopPropagation();

  console.log('clickEvent event:', event);

  if (event.target) {
    clickEventListener(event.target)
  }
  stopEventMapping();

  if (mappingPort) {
    mappingPort.postMessage({action: 'end', target: event.target});
  }
  showIframe()
};
