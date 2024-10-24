# Dino Marker Chrome Extension

#### Video Demo: https://youtu.be/XQSkzPWTCZU


## Description

Dino Marker is a Chrome extension designed to provide a text marker functionality. It includes a popup interface for signing in and starting the marking process, as well as a side panel for additional settings and help. This extension aims to enhance the user's browsing experience by allowing them to highlight and manage text on web pages efficiently.

## Features

- **Popup Interface**: Provides a simple interface to sign in and start marking text.
- **Side Panel**: Offers settings and help options.
- **Custom Cursor**: Changes the cursor style when marking text.
- **Opacity Control**: Adjusts the opacity of the marked text.
- **Color Change**: Allows changing the color of the marked text.
- **Persistent Storage**: Saves user data and preferences with no expiration time.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/Chrome-Extension.git
    ```
2. Navigate to the project directory:
    ```sh
    cd Chrome-Extension
    ```
3. Load the extension in Chrome:
    1. Open Chrome and go to `chrome://extensions/`.
    2. Enable "Developer mode" by clicking the toggle switch in the top right corner.
    3. Click the "Load unpacked" button and select the project directory.

## Usage

1. Click on the extension icon in the Chrome toolbar.
2. If you are not signed in, you will see the sign-in popup ([popup_sign_in.html](popup/popup_sign_in.html)).
3. Once signed in, you can start marking text by clicking the "Start Marking" button.
4. Use the side panel to access settings and help:
    - Open the side panel by clicking the "Open Side Panel" button in the popup ([popup.html](popup/popup.html)).
    - Navigate through the side panel using the menu buttons ([sidepanel.html](sidepanel/sidepanel.html)).

## Development

### Project Structure

- **background.js**: Handles background tasks and message passing.
- **content.js**: Contains content scripts for interacting with web pages.
- **popup/**: Contains HTML and JavaScript files for the popup interface.
- **sidepanel/**: Contains HTML and JavaScript files for the side panel.
- **scripts/**: Contains additional JavaScript files for various functionalities.

### Scripts

- **popup.js**: This script handles events and actions within the popup interface. It manages user interactions such as signing in and starting the marking process. The file can be found at `scripts/popup.js`.
- **load.js**: This script is responsible for managing content loading and appending scripts in the side panel. It ensures that the necessary scripts are loaded when the side panel is opened. The file can be found at `scripts/load.js`.
- **background.js**: This script runs in the background and handles tasks such as message passing and managing the extension's state. It ensures that the extension's functionality is maintained even when the popup or side panel is not open. The file can be found at `scripts/background.js`.
- **content.js**: This script is injected into web pages and interacts with the page's content. It handles tasks such as marking text and changing the cursor style. The file can be found at `scripts/content.js`.
- **sidepanel_help.js**: This script defines a function to open a link in a new tab by sending a message to `background.js`. It adds an event listener to an element with the ID `myLink` to trigger this function. The file can be found at `scripts/sidepanel_help.js`.
- **sidepanel_home.js**: This script manages the home section of the side panel, handling user interactions and displaying relevant information. The file can be found at `scripts/sidepanel_home.js`.
- **sidepanel_settings.js**: This script manages the settings section of the side panel, allowing users to customize their preferences. The file can be found at `scripts/sidepanel_settings.js`.

### Configuration

- **manifest.json**: Defines the extension's metadata and permissions. This file is crucial for the extension's functionality and includes permissions for using the Chrome Storage API. The file can be found at `manifest.json`.
- **tailwind.config.js**: Configures Tailwind CSS for styling. This file allows you to customize the design and layout of the extension. The file can be found at `tailwind.config.js`.

## Storing User Data and Preferences

To record user data and preferences in a Chrome extension with no expiration time, you can use the Chrome Storage API. This API allows you to store, retrieve, and manage user data and preferences.

### Save Data

Use the `chrome.storage.sync.set` method to save user data and preferences. This method stores data in the Chrome sync storage, which is synced across the user's devices.

```javascript
// Save user data
function saveUserData(data) {
  chrome.storage.sync.set({ userData: data }, function() {
    console.log('User data saved.');
  });
}

// Example usage
const userData = {
  theme: 'dark',
  fontSize: '16px',
  customColor: '#ff0000'
};
saveUserData(userData);
