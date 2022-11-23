import { hideIframe, loadIframe, toggle } from '@src/content/sidebar.frame';
import { startEventMapping } from '@src/content/content.events';
import Port = chrome.runtime.Port;


// console.log('content loaded');
window.onload = async function() {
  await loadIframe();
  // startEventMapping()
};


export let mappingPort: Port | null = null

/**
 * Réception de message en provenance de l'extension
 */
chrome.runtime.onMessage.addListener(async (message, sender) => {
  if (sender.tab) {
    // console.log('content - From content script:', message)
  } else {
    // console.log('content - From extension:', message)
  }
  if (message === 'toggle') {
    await toggle();
  }
});

chrome.runtime.onConnect.addListener(port => {
  if (port.name === 'mapping') {
    mappingPort = port
    console.log('Content onConnect port "mapping"')
    port.onMessage.addListener(msg => {
      console.log('Content onMessage :', msg)
      hideIframe()
      startEventMapping()
    })
    port.onDisconnect.addListener(() => {
      console.log('Content onDisconnect')
      mappingPort = null
    })
  }
})

