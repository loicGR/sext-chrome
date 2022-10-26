import { onClicked } from '@src/background/actions';

console.log('background loaded');

chrome.action.onClicked.addListener(async (tab) => await onClicked(tab))
