
const IFRAME_ID = 'extension-frame-scapin'

export function loadIframe() {
  console.log('loadIframe')
  const iframe = document.createElement('iframe')
  iframe.setAttribute('id', IFRAME_ID)
  iframe.setAttribute('style', 'top: 0px; right: 0px;' +
    'border: 1px solid #83c0e6; border-radius: 0; box-shadow: 0 0 4px #83c0e6;' +
    'width: 0; height: 100%; z-index: 90000000; position:fixed; ' +
    'visibility:hidden; background-color: #f1f7ff; transition: width 0.8s;')
  iframe.src = chrome.runtime.getURL('src/sidebar/index.html')
  document.body.appendChild(iframe)
  return iframe
}

const getIframe = () => {
  return document.getElementById(IFRAME_ID)
}

export function unloadIframe(iframe: HTMLElement | null) {
  console.log('unloadIframe')

  if (iframe) {
    document.body.removeChild(iframe)
  }
}

async function toggle() {
  console.log('toggle')
  // await chrome.storage.sync.set({frames: []})
  // await chrome.storage.sync.remove('target')

  let iframe = getIframe()

  if (iframe) {
    if (iframe.style.width === '0px') {
      // iframe.style.border = '1px solid #83c0e6'
      iframe.style.visibility = 'visible'
      iframe.style.width = '310px'
    } else {
      iframe.style.width = '0px'
      setTimeout(() => {
        if (iframe) {
          iframe.style.visibility = 'hidden';
        }
      }, 800)
    }
  }
}

chrome.runtime.onMessage.addListener(async function () { toggle() })
