// Define user settings preferences
const userSettings = {
    saveHighlighting: true,
    lineHeightLevel: 'option1',
};

chrome.runtime.sendMessage({ action: 'checkUserData' }).then((response) => {
    if (response.exists) {
        document.getElementById('userName').innerText = response.userData.name;
    } else {
        document.getElementById('userName').innerText = 'Anonymous';
    }
});

// Save user settings to Chrome storage
function saveSettings() {
    chrome.storage.sync.set({ userSettings: userSettings }, function() {
        showMessage('Settings saved');
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
        document.getElementById('saveHighlighting').checked = userSettings.saveHighlighting;

        // Set the selected radio button
        document.getElementById(userSettings.lineHeightLevel).checked = true;
    });
}

getSettings();

// Get the selected radio button id
function getSelectedRadioButtonId() {
    const radios = document.getElementById('thicknessArea').querySelectorAll('input[type="radio"]');
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            return radios[i].id;
        }
    }
    return 'option1';
}


document.getElementById('saveSettings').addEventListener('click', function() {
    userSettings.lineHeightLevel = getSelectedRadioButtonId();
    userSettings.saveHighlighting = document.getElementById('saveHighlighting').checked;
    saveSettings();
});

document.getElementById('logOut').addEventListener('click', function() {
    showMessage('Log out not supported yet!');
    // chrome.runtime.sendMessage({ action: 'logout' });
});