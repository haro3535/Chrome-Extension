// chrome.storage.local.get('signed_in', (data) => {
//     if (data.signed_in) {
//       chrome.action.setPopup({popup: 'popup.html'});
//     } else {
//       chrome.action.setPopup({popup: 'popup_sign_in.html'});
//     }
//   });

// "use strict";

// document.getElementById('sideButton').addEventListener("click", () => {
//     chrome.sidePanel.open({
//         tabId: chrome.tabs.getCurrent()
//     });
// })

document.addEventListener('DOMContentLoaded', function() {
    var openSidePanelButton = document.getElementById('openSidePanel');
    openSidePanelButton.addEventListener('click', function() {
      chrome.runtime.sendMessage({ action: 'openSidePanel' });
      window.close();
    });
  });