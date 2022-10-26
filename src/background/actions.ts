import Tab = chrome.tabs.Tab;

export async function onClicked(tab: Tab) {
  console.log('action.onClicked tab:', tab)
  try {
    // await initStorageCache

    // const storage = await chrome.storage.sync.get(['token'])
    // await chrome.storage.sync.remove(['start'])

    // if  (storage.token) {
    //   console.log(storage.token)
    //   await chrome.storage.sync.set({start: 'start'})
    // }
    await chrome.tabs.sendMessage(tab.id ? tab.id : -1, 'toggle')
    // await chrome.scripting.executeScript({
    //   target: {tabId: tab.id ? tab.id : -1, allFrames: true},
    //   files: ['content.js']
    // })
  } catch (e) {
    console.log(e)
  }
}
