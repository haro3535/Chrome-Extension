# Dino Marker Extension

## Description
Dino Marker Extension is a Chrome extension designed to provide a text marker functionality. The extension includes a popup interface that opens the side panel, where users can sign in, start the marking process, and access additional settings and help options. All interactions and configurations are managed through the side panel.

## Features

- **Popup Interface**: The extension includes a user-friendly popup interface that appears when you click the extension icon in the Chrome toolbar. This interface allows users to sign in to their account and start the text marking process with just a few clicks.
- **Side Panel**: The side panel is the main UI of this extension. Users will interact with the side panel for marking the text. Additionally, it contains settings for text marking and help text on how to use the extension. Users can open the side panel from the popup interface and navigate through various sections to customize their experience and get assistance.
- **Custom Cursor**: When the marking process is active, the extension changes the cursor style to indicate that text marking is enabled. This visual cue helps users easily identify when they are in marking mode.
- **Opacity Control**: Users can adjust the opacity of the marked text to suit their preferences. This feature allows for better visibility and customization of the highlighted text on web pages.
- **Color Change**: The extension offers the ability to change the color of the marked text. Users can select from a range of colors to highlight text in a way that stands out and meets their needs.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/haro3535/Chrome-Extension.git
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

- **background.js**: This file is responsible for handling background tasks and message passing between different parts of the extension. It runs in the background and listens for events such as browser actions or messages from content scripts.
- **content.js**: This script is injected into web pages and interacts with the DOM of the page. It contains the logic for marking text and communicating with the background script.
- **popup/**: This directory contains the HTML files for the popup interface that appears when the extension icon is clicked. It includes files like `popup.html` and `popup_sign_in.html`.
- **sidepanel/**: This directory holds the HTML files for the side panel, which provides additional settings and help options. It includes files like `sidepanel.html`, `home.html`, `help.html`, and `settings.html`.
- **scripts/**: This directory contains additional JavaScript files that provide various functionalities required by the extension. Examples include `popup.js` and `load.js`.
- **styles/**: This directory contains CSS files used for styling the extension's popup and side panel interfaces.

### Scripts

- **popup.js**: This script handles events and actions within the popup interface. It manages user interactions such as signing in and starting the marking process. The file can be found at `scripts/popup.js`.
- **load.js**: This script is responsible for managing content loading and appending scripts in the side panel. It ensures that the necessary scripts are loaded when the side panel is opened. The file can be found at `scripts/load.js`.
- **sidepanel_help.js**: This script manages the help section within the side panel. It provides users with guidance and information on how to use the extension. The file can be found at `scripts/sidepanel_help.js`.
- **sidepanel_home.js**: This script handles the home section of the side panel. It manages the display and interaction of the main content within the side panel. The file can be found at `scripts/sidepanel_home.js`.
- **sidepanel_settings.js**: This script is responsible for managing the settings section within the side panel. It allows users to customize various aspects of the extension. The file can be found at `scripts/sidepanel_settings.js`.


### Configuration

- **manifest.json**: This file defines the extension's metadata, permissions, and other configurations. It specifies details such as the extension's name, version, icons, and the permissions it requires to function. The file can be found at `manifest.json`.
- **tailwind.config.js**: This file configures Tailwind CSS for styling the extension. It allows customization of the default Tailwind CSS settings to fit the design requirements of the extension. The file can be found at `tailwind.config.js`.

## License

This project is licensed under Harun Onur's No Usage License. For more details, see the [LICENSE](LICENSE) file.
