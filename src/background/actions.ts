import Tab = chrome.tabs.Tab;

export async function onClicked(tab: Tab) {
  console.log('action.onClicked tab:', tab)
  try {
    await chrome.tabs.sendMessage(tab.id ? tab.id : -1, 'toggle')
  } catch (e) {
    console.log(e)
  }
}
