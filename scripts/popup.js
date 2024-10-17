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

// document.addEventListener('DOMContentLoaded', function() {
//     var openSidePanelButton = document.getElementById('openSidePanel');
//     openSidePanelButton.addEventListener('click', function() {
//       chrome.runtime.sendMessage({ action: 'openSidePanel' });
//       window.close();
//     });
//   });


  document.addEventListener('DOMContentLoaded', () => {
    chrome.runtime.sendMessage({ action: 'checkUserData' }).then((response) => {
      console.log(response.exists);
      if (response.exists) {
        console.log(response.userData);
        showMainPopup(response.userData.name);
      } else {
        showRegistrationPopup();
      }
    }) 
  });

async function showMainPopup(username) {
    try {
      let file = await fetch(chrome.runtime.getURL('popup/popup_registered_user.html'));
      let text = await file.text();
      document.body.innerHTML = text;
      document.getElementById('username').innerText = username;
      document.getElementById('openSidePanel').addEventListener('click', () => {
        chrome.runtime.sendMessage({ action: 'openSidePanel' });
        window.close();
      });
    }
    catch (e) {
      console.error(e);
    }
}

async function showRegistrationPopup() {
    try {
      let file = await fetch(chrome.runtime.getURL('popup/popup_register_user.html'));
      let text = await file.text();
      document.body.innerHTML = text;
    }
    catch (e) {
      console.error(e);
    }
}


document.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.target;
  const username = form.querySelector('input[name="username"]').value;
  // const email = form.querySelector('input[name="email"]').value;

  const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!usernameRegex.test(username)) {
    alert('Invalid username. It should be 3-16 characters long and can contain letters, numbers, and underscores.');
    return;
  }

  // if (!emailRegex.test(email)) {
  //   alert('Invalid email address.');
  //   return;
  // }

  chrome.runtime.sendMessage({
    action: "createUserData",
    userData: {
      name: username,
      lastActive: new Date().toDateString(),
      joinDate: new Date().toDateString(),
    }
  }, (response) => {
    if (response.success) {
      chrome.runtime.sendMessage({ action: 'openSidePanel' });
      window.close();
    } else {
      alert('Failed to save user data.');
    }
  });
});