
const IFRAME_ID = 'extension-frame-scapin'
const IFRAME_WIDTH = 310

export async function loadIframe() {
  // console.log('loadIframe')

  // Sauvegarde de la largeur pour sa réutilisation dans App.vue
  // La constante IFRAME_WIDTH peut donc être modifiée sans que cela ait un impact sur App.vue
  await chrome.storage.sync.set({ 'IFRAME_WIDTH': IFRAME_WIDTH })
  await chrome.storage.sync.set({ sapiUrl: 'https://scapin.loicg.com/sapi' })

  const iframe = document.createElement('iframe')
  iframe.setAttribute('id', IFRAME_ID)
  iframe.setAttribute('style', 'top: 0px; right: 0px;' +
    'border: 1px solid #83c0e6; border-radius: 0; box-shadow: 0 0 4px #83c0e6;' +
    'width: 0; height: 100%; z-index: 90000000; position:fixed; ' +
    'visibility:hidden; background-color: white; transition: width 0.8s;')
  iframe.src = chrome.runtime.getURL('src/sidebar/index.html')
  document.body.appendChild(iframe)
  return iframe
}

const getIframe = () => {
  return document.getElementById(IFRAME_ID)
}

async function toggle() {
  // console.log('toggle')
  // await chrome.storage.sync.set({frames: []})
  // await chrome.storage.sync.remove('target')

  let iframe = getIframe()

  if (iframe) {
    if (iframe.style.width === '0px') {
      // iframe.style.border = '1px solid #83c0e6'
      iframe.style.visibility = 'visible'
      iframe.style.width = `${IFRAME_WIDTH}px`
      await chrome.runtime.sendMessage({ from: 'iframe', show: true } )
    } else {
      iframe.style.width = '0px'
      await chrome.runtime.sendMessage({ from: 'iframe', show: false })
      setTimeout(() => {
        if (iframe) {
          iframe.style.visibility = 'hidden';
        }
      }, 800)
    }
  }
}

chrome.runtime.onMessage.addListener(async function () { await toggle() })
