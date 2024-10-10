# Harun's Extension

## Description

Harun's Extension is a Chrome extension designed to provide a text marker functionality. It includes a popup interface for signing in and starting the marking process, as well as a side panel for additional settings and help.

## Features

- **Popup Interface**: Provides a simple interface to sign in and start marking text.
- **Side Panel**: Offers settings and help options.
- **Custom Cursor**: Changes the cursor style when marking text.
- **Opacity Control**: Adjusts the opacity of the marked text.
- **Color Change**: Allows changing the color of the marked text.

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
- **styles/**: Contains CSS files for styling the extension.

### Scripts

- **popup.js**: Handles events and actions in the popup interface ([popup.js](scripts/popup.js)).
- **load.js**: Manages content loading and script appending in the side panel ([load.js](scripts/load.js)).

### Configuration

- **manifest.json**: Defines the extension's metadata and permissions ([manifest.json](manifest.json)).
- **tailwind.config.js**: Configures Tailwind CSS for styling ([tailwind.config.js](tailwind.config.js)).

## License

This project is licensed under Harun Onur's No Usage License. For more details, see the [LICENSE](LICENSE) file.
