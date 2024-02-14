chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
      text: "ON",
    });
  });


// Gets the message from the front-end and handles the request
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'openSidePanel') {
      // Open the side panel
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.sidePanel.open({tabId: tabs[0].id});
        chrome.sidePanel.setOptions({
          tabId: tabs[0].id,
          path: 'sidepanel/sidepanel.html',
          enabled: true
        })
      });
    }

    if (message.action === 'changeCursor') {
      console.log('selam')
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'changeCursor',
          cursorMod: message.cursorMod
        });
      });
    }

    if (message.action === 'changeOpacity') {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'changeOpacity',
          opacityValue: message.opacityValue
        });
      });
    }
  });