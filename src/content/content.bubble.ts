export const BUBBLE_ID = '3s-mapping-bubble';

const CURSOR_OFFSET = 10;
const BUBBLE_WIDTH = 275;
const BUBBLE_HEIGHT = 150;

const Bubble = () => {
  return document.getElementById(BUBBLE_ID);
};

export function loadBubble() {
  if (!Bubble()) {
    const bubble = document.createElement('iframe');
    bubble.setAttribute('id', BUBBLE_ID);
    bubble.setAttribute('style',
      'width: ' + `${BUBBLE_WIDTH}` + 'px; ' + 'height: ' + `${BUBBLE_HEIGHT}` + 'px; ' +
      'border: none; visibility: hidden; position: absolute; z-index: 9000000');
    bubble.src = chrome.runtime.getURL('src/bubble/index.html');

    document.body.insertBefore(bubble, document.body.firstChild);
  }
}

export function hideBubble() {
  const bubble = Bubble();
  if (bubble) {
    bubble.style.visibility = 'hidden'
  }
}

export function showBubble() {
  const bubble = Bubble();
  if (bubble) {
    bubble.style.visibility = 'visible'
  }
}

export function bubblePosition(mouse: MouseEvent) {
  const bubble = Bubble();
  if (bubble) {
    const pageWidth = document.body.clientWidth
    const pageHeight = document.body.clientHeight
    const x = mouse.pageX
    const y = mouse.pageY
    const leftOffset = x + BUBBLE_WIDTH > pageWidth ?  - BUBBLE_WIDTH - CURSOR_OFFSET : CURSOR_OFFSET
    const topOffset = y + BUBBLE_HEIGHT > pageHeight ? - BUBBLE_HEIGHT - CURSOR_OFFSET : CURSOR_OFFSET
    bubble.style.top = `${mouse.pageY + topOffset}px`;
    bubble.style.left = `${mouse.pageX + leftOffset}px`;
  }
}


