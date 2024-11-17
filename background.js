chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
      text: "ON",
    });
  });


  const userData = {
    name: 'Annonymous',
    lastActive: new Date().toDateString(),
    joinDate: new Date().toDateString(),
  }

  const highlight = {
    text: 'This is a highlighted text',
    color: 'rgb(96,165,250,0.5)',
    date: new Date().toDateString(),
  }


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
    else if (message.action === "checkUserData") {
      chrome.storage.sync.get(['userData']).then((result) => {
        if (result.userData) {
          sendResponse({ userData: result.userData, exists: true });
        } else {
          sendResponse({ exists: false });
        }
      });
      return true; // Keep the message channel open for sendResponse
    }
    else if (message.action === "createUserData") {
      chrome.storage.sync.set({ userData: message.userData }, () => {
          sendResponse({ success: true });
      });
      return true; // Keep the message channel open for sendResponse
    }
    else if (message.action === 'changeSidePanelView') {
      chrome.sidePanel.setOptions({
        
      })
    }
    else if (message.action === 'changeCursor') {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'changeCursor',
          cursorMod: message.cursorMod
        });
      });
    }
    else if (message.action === 'changeOpacity') {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'changeOpacity',
          opacityValue: message.opacityValue
        });
      });
    }
    else if (message.action === 'changeColor') {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'changeColor',
          color: message.color
        });
      });
    }
    else if (message.action === 'openLink') {
      chrome.tabs.create({ url: message.url });
    }
    else if (message.action === 'saveHighlights') {
      chrome.storage.local.get({ highlights: [] }, (result) => {
        const highlights = result.highlights;
        message.highlights.forEach((highlight) => {
          highlights.push(highlight);
        });
        chrome.storage.local.set({ highlights: highlights }, () => {
          sendResponse({ success: true });
        });
      });
      return true; // Keep the message channel open for sendResponse
    }
    else if (message.action === 'getHighlights') {
      chrome.storage.local.get({ highlights: [] }, (result) => {
        sendResponse({ highlights: result.highlights });
      });
      return true; // Keep the message channel open for sendResponse
    }

  });