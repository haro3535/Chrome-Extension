// scripts/informBox.js
// -------------------
// This script is responsible for showing a message to the user.
// It listens for messages from the background script and shows the message in a popup.
// -------------------
// Author: Harun Onur

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'showMessage') {
        showMessage(request.message);
    }
});


function showMessage(message) {
    const messageBox = document.getElementById('messageBox');
    document.getElementById('messageText').textContent = message;
    messageBox.classList.remove('hidden');

    setTimeout(() => {
        messageBox.classList.add('hidden');
    }, 2000);
}