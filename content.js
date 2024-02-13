
// Cursor Mods: normal, marker
let cursorMod = 'normal';

let opacity = 0.5;
let color = `rgba(255,212,101,${opacity})`;


chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    console.log('merhaba')
    if (message.action === 'changeCursor')
        cursorMod = message.cursorMod.toString();
  });

let selectedText = ""; // Variable to store selected text

    // Event listener for mouse down
    document.addEventListener('mousedown', function(event) {
        // Get selected text on mouse down
        if (cursorMod == 'normal')
            return;

        if (cursorMod == 'marker')
            selectedText = getSelectedText();
        //  clearHighlights();
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
    // TODO: It's working but not 100%
    function highlightSelectedText() {
        let selection = window.getSelection();
        checkForOverlap(selection)
        if (selection.anchorNode === selection.focusNode) {
            var range = selection.getRangeAt(0);
            let anchorOffset = selection.anchorOffset
            let focusOffset = selection.focusOffset

            var span = document.createElement('span');
            span.className = 'highlight';
            span.style.backgroundColor = `${color}`;
            range.surroundContents(span);

            // Place the saving here!
            saveHiglighting(span.parentElement, anchorOffset, focusOffset)
        }
    }

    // Checks for overlap of <span class="highlight">
    function checkForOverlap(slc) {

        console.log(slc)

        return false;
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





    // TODO: Store for each element's sibling number. (Which sibling it is)
    function saveHiglighting(element, startOffset, endOffset) {

        let spanObject = {
            "startOffset": startOffset,
            "endOffset": endOffset,
            "style": {
                "color": "yellow", // Default yellow
                "opacity": 0.5, // Default 0.5
            },
            "elementPath": []
        }

        console.log(element.tagName)
        let elementArray = []

        while (element.tagName !== "BODY") {

            let parent = element.parentElement;
            let elementIndex = 0;

            for (let index = 0; index < parent.childElementCount; index++) 
                if (element === parent.childNodes.item(index)){
                    elementIndex = index;
                    break;
                }

            let parentObject = {
                "tName": element.tagName,
                "siblingNo": elementIndex
            }

            elementArray.push(parentObject)
            element = element.parentElement
        }

        spanObject.elementPath.push(elementArray)
        
        console.log(spanObject)
        
        
    }  



    // This function will be used for append spans to html from db
    function appendSpanElements(spanElement ,currentElement, anchorOffset, focusOffset){

        let range = document.createRange();
        range.setStart(currentElement, anchorOffset)
        range.setEnd(currentElement, focusOffset)

        range.surroundContents(spanElement)
    }

