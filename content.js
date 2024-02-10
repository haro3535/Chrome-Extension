
// Cursor Mods: normal, marker
let cursorMod = 'normal';

// TODO cant get messages
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'changeCursor')
        cursorMod = message.cursorMod.toString();
  });

var selectedText = ""; // Variable to store selected text

    // Event listener for mouse down
    document.addEventListener('mousedown', function(event) {
        // Get selected text on mouse down
        if (cursorMod == 'normal')
            return;

        if (cursorMod == 'marker')
            selectedText = getSelectedText();
        // clearHighlights();
    });

    // Event listener for mouse up
    document.addEventListener('mouseup', function(event) {
        // Get selected text on mouse up
        if (cursorMod == 'normal')
            return;

        if (cursorMod == 'marker') {
            selectedText = getSelectedText();
            if (selectedText.trim() !== "" && selectedText != '') {
                console.log("Selected text:", selectedText);
            }
            selectedText = '';
            highlightSelectedText();
        }
    });

    // Function to get selected text
    function getSelectedText() {
        var text = "";
        var selection = window.getSelection();
        if (selection.anchorNode === selection.focusNode) {
            text = selection.toString();
        }
        return text;
    }

    // Function to highlight selected text
    function highlightSelectedText() {
        var selection = window.getSelection();
        if (selection.anchorNode === selection.focusNode) {
            var range = selection.getRangeAt(0);
            var span = document.createElement('span');
            span.className = 'bg-yellow-200';
            span.style.backgroundColor = 'yellow';
            range.surroundContents(span);
        }
    }

    // Function to clear highlights
    // function clearHighlights() {
    //     var highlights = document.querySelectorAll('.highlight');
    //     highlights.forEach(function(highlight) {
    //         var parent = highlight.parentNode;
    //         parent.replaceChild(highlight.firstChild, highlight);
    //         parent.normalize();
    //     });
    // }



  

