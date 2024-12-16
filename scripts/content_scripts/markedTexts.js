// scripts/content_scripts/markedTexts.js
// -------------------
// This script is responsible for save the marked text on the page.
// It listens for messages from the background script and saves the marked text.
// -------------------
// Author: Harun Onur


// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'saveMarkedText') {
        saveMarkedText(request.markedText);
    }
});


function sendTextToSidePanel(id, text, color) {
    // Send the text to the side panel
    chrome.runtime.sendMessage({ action: 'addTextCard', id, text, color });
}


// Save the marked text
// markedText: Span element that contains the marked text
function saveMarkedText(markedText) {
    // Get the marked texts from the local storage
    chrome.storage.local.get(['markedTexts'], (result) => {
        // If there is no marked text, create an empty array
        const markedTexts = result.markedTexts || [];
        // Add the new marked text to the array
        const newTextBlock = TextBlock(
            markedText.text,
            markedText.color,
            markedText.anchorNode,
            markedText.focusNode,
            markedText.anchorOffset,
            markedText.focusOffset,
            markedText.parentNode,
            true
        );
        markedTexts.push(newTextBlock);
        // Save the marked texts to the local storage
        chrome.storage.local.set({ markedTexts });

        // Send the marked text to the side panel
        sendTextToSidePanel(markedText.id, markedText.text, markedText.color);
    });
}


// Sample marked text
const TextBlock = {
    text: "This is a sample text",
    color: "#000000",
    anchorNode: null,
    focusNode: null,
    anchorOffset: 0,
    focusOffset: 0,
    parentNode: null,
    marked: false
}