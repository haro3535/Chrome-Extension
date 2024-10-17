// Define user settings preferences
const userSettings = {
    saveHighlighting: true,
    highlightBackgroundHeight: 20
};

// Save user settings to Chrome storage
function saveSettings() {
    chrome.storage.sync.set({ userSettings: userSettings }, function() {
        console.log('Settings saved');
    });
}

// Get user settings from Chrome storage
function getSettings() {
    chrome.storage.sync.get(['userSettings'], function(result) {
        if (result.userSettings) {
            console.log('Settings retrieved', result.userSettings);
            // Update local settings with retrieved settings
            Object.assign(userSettings, result.userSettings);
        } else {
            console.log('No settings found, using default settings');
        }
    });
}

// Update the displayed value of the line height range input
const lineHeightInput = document.getElementById('lineHeight');
const lineHeightValue = document.getElementById('lineHeightValue');

lineHeightInput.addEventListener('input', function() {
    lineHeightValue.textContent = lineHeightInput.value;
});

// Update the displayed value of the highlight background height range input
const highlightBackgroundHeightInput = document.getElementById('highlightBackgroundHeight');
const highlightBackgroundHeightValue = document.getElementById('highlightBackgroundHeightValue');
const highlightPreview = document.getElementById('highlightPreview');

highlightBackgroundHeightInput.addEventListener('input', function() {
    const height = highlightBackgroundHeightInput.value;
    highlightBackgroundHeightValue.textContent = height + 'px';
    highlightPreview.style.height = height + 'px';
});

// Initialize settings on page load
document.addEventListener('DOMContentLoaded', function() {
    getSettings();
    highlightBackgroundHeightInput.value = userSettings.highlightBackgroundHeight;
    highlightBackgroundHeightValue.textContent = userSettings.highlightBackgroundHeight + 'px';
    highlightPreview.style.height = userSettings.highlightBackgroundHeight + 'px';
});


document.getElementById('saveSettings').addEventListener('click', function() {
    userSettings.highlightBackgroundHeight = highlightBackgroundHeightInput.value;
    saveSettings();
});