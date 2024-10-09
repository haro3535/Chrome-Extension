// sidepanel_help.js

// Function to send a message to background.js to open a link in a new tab
function openLinkInNewTab(url) {
    chrome.runtime.sendMessage({ action: 'openLink', url: url });
}

document.getElementById('myLink').addEventListener('click', () => {
    // Example usage
    openLinkInNewTab('https://www.linkedin.com/in/harunonur');
})
