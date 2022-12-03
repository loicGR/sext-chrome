import { hideIframe, loadIframe, toggle } from '@src/content/sidebar.frame';
import { startMapping } from '@src/content/content.events';
import { loadBubble } from '@src/content/content.bubble';
import { IMessage } from '@src/interfaces';
import Port = chrome.runtime.Port;


// console.log('content loaded');
window.onload = async function() {
  await loadSettings();
  initiatePort();
  loadBubble();
  loadIframe();
};

async function loadSettings() {
  // TODO Mettre l'URL par défaut si elle n'existe pas dans les settings
  // URL par défaut pour l'accès à la base de données
  await chrome.storage.sync.set({ sapiUrl: 'https://scapin.loicg.com/sapi' });

}


let toysPort: Port | null = null;
let bubblePort: Port | null = null

function initiatePort() {

  chrome.runtime.onConnect.addListener(port => {
    console.log('Content onConnect port:', port);
    if (port.name === 'toys') {
      toysPort = port
      port.onMessage.addListener((msg: IMessage) => {
        console.log('Content onMessage :', msg);
        if (msg.action === 'start') {
          startMapping();
          hideIframe();
          bubblePostMessage('toy', msg.data)
        }
      });
    }
    if (port.name === 'bubble') {
      bubblePort = port
    }
  });
}

export function bubblePostMessage(action: string, data: any) {
  if (bubblePort) {
    // console.log(`bubblePostMessage action:${action}, data:`, data)
    bubblePort.postMessage({action, data})
  }
}

export function toysPostMessage(action: string, data: any) {
  if (toysPort) {
    // console.log(`toysPostMessage action:${action}, data:`, data)
    toysPort.postMessage({action, data})
  }
}

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
