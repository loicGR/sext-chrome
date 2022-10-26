import {loadIframe } from '@src/sidebar/sidebar.frame';
import { addEventListeners } from '@src/content/content.events';

console.log('content loaded');
window.onload = async function() {
  loadIframe()
  addEventListeners()
}
