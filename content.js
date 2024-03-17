
// Cursor Mods: normal, marker
let cursorMod = 'normal';

let opacity = 0.5;
let color = `rgba(255,212,101,${opacity})`;


chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    console.log('merhaba')
    if (message.action === 'changeCursor'){
        cursorMod = message.cursorMod.toString();
        if (cursorMod == "marker") {
            // Burasi calismiyor 
            //  let styleSheet = document.styleSheets[0]
            //  let cssRule = `::selection { backgroun-color: yellow; color: inherit }`

            // styleSheet.insertRule(cssRule, 0); // Insert at index 0, you can choose another index or use -1 to append at the end
              
            // console.log(styleSheet)
            // let cssRules = styleSheet.cssRules

            // for (var i = 0; i < cssRules.length; i++) {
            //     var rule = cssRules[i];
            //     if (rule.selectorText === '::selection') {
            //         // Modify the CSS rule
            //         rule.style.backgroundColor = color; // Change background color to red
            //         rule.style.color = 'inherit'
            //         break; // Exit loop since we found the rule
            //     }
            // }
        }
        else document.styleSheets[0].deleteRule()
    }
    if (message.action === 'changeOpacity'){
        opacity = message.opacityValue;
        color = `rgba(255,212,101,${opacity})`
    }
  });

let selectedText = ""; // Variable to store selected text

    // Event listener for mouse down
    document.addEventListener('mousedown', function(event) {
        // Get selected text on mouse down
        if (cursorMod == 'normal')
            return;

        if (cursorMod == 'marker')
            selectedText = getSelectedText(window.getSelection());
        //  clearHighlights();
    });

    // Event listener for mouse up
    document.addEventListener('mouseup', function(event) {
        // Get selected text on mouse up
        if (cursorMod == 'normal')
            return;

        if (cursorMod == 'marker') {
            
            // It returns if ancor and focus is same
            let selection = window.getSelection();
            //console.log(selection.getRangeAt(0))

            // if (selection.isCollapsed)
            //     return

            myHighlightFunction()

            selection.removeAllRanges();

            // selectedText = getSelectedText(selection);
            // if (selectedText.trim() !== "" && selectedText != '') {
            //     console.log("Selected text:", selectedText);
            // }
            // selectedText = '';
            // highlightSelectedText();
        }
    });

    // Function to get selected text
    function getSelectedText(selection) {
        var text = "";

        if (selection.anchorNode === selection.focusNode) {
            text = selection.toString();
        }
        return text;
    }

    // Function to highlight selected text
    // TODO: It's working but not 100%
    function highlightSelectedText() {
        let selection = window.getSelection();
        // checkForOverlap(selection)
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
        //window.getSelection().removeAllRanges()
    }

    // Checks for overlap of <span class="highlight">
    function checkForOverlap(slc) {

        //console.log(slc)

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
    function appendSpanElements(spanElement , currentElement, anchorOffset, focusOffset){

        let range = document.createRange();
        range.setStart(currentElement, anchorOffset)
        range.setEnd(currentElement, focusOffset)

        range.surroundContents(spanElement)
    }




    function myHighlightFunction() {

        let selection = window.getSelection();

        let ancorNode = selection.anchorNode;
        let anchorOffset = selection.anchorOffset;
        let focusNode = selection.focusNode;
        let focusOffset = selection.focusOffset;


        if (ancorNode === focusNode){
            highlightSelectedText();
        }
        else {
            let commonAncestorContainer = selection.getRangeAt(0).commonAncestorContainer;
            // TODO: Buradana devam tüm çocuk elementlere kadar ulaşıcan taki focuse nodu bulana kadar
            let anchorParentNode = ancorNode.parentNode;
            let focusParentNode = focusNode.parentNode;

            let starterNodeIndex = findSelectedChildofRootElement(commonAncestorContainer, anchorParentNode);
            let endNodeIndex = findSelectedChildofRootElement(commonAncestorContainer, focusParentNode);
            console.log("Starter Node: " + starterNodeIndex);
            console.log("End Node: " + endNodeIndex);

            if (starterNodeIndex < endNodeIndex){
                highlight(anchorParentNode,anchorOffset,anchorParentNode.firstChild.length);

                let tIndex = starterNodeIndex + 1;
                while (tIndex != endNodeIndex){
                    traversRootFromTopToBottom(commonAncestorContainer.childNodes[tIndex]);
                    console.log("Buraya geldimmm");
                    tIndex++;
                }
                
                elevateBottomtoTop(anchorParentNode, commonAncestorContainer.childNodes[starterNodeIndex], 'l');
                elevateBottomtoTop(focusParentNode, commonAncestorContainer.childNodes[endNodeIndex], 'r');

                highlight(focusParentNode,0,focusOffset);
            }
            else if (starterNodeIndex > endNodeIndex){
                let tIndex = endNodeIndex + 1;
                while (tIndex != starterNodeIndex){
                    traversRootFromTopToBottom(commonAncestorContainer.childNodes[tIndex]);
                    tIndex++;
                }
                
                elevateBottomtoTop(anchorParentNode, commonAncestorContainer.childNodes[starterNodeIndex], 'r');
                elevateBottomtoTop(focusParentNode, commonAncestorContainer.childNodes[endNodeIndex], 'l');
            }
        }
    }


    function findSelectedChildofRootElement(commonAncestorContainer, node){

        let currentElement = node;
        while (currentElement.parentElement !== commonAncestorContainer){
            currentElement = currentElement.parentElement;
        }

        return Array.prototype.indexOf.call(commonAncestorContainer.childNodes, currentElement);
    }


    // Travers through top to bottom (for the sibling parrent nodes that are between start parent node and end parent node)
    /**
     * @param {Node} node
     */
    function traversRootFromTopToBottom(node){

        if (node == null)
            return;

        //console.log("Node Type: " + node);

        if (node.tagName == "P"){
            console.log(node.childNodes[0]);
            highlight(node, 0, node.childNodes[0].length);
            return;
        }
        
        if (node.hasChildNodes() && node.nodeType !== Node.TEXT_NODE)
        {
            console.log("Node Type: " + node);
            console.log("Has Child: " + node.hasChildNodes());
            console.log("Childs" + node.childNodes.length);
            node.forEach(child => {
                traversRootFromTopToBottom(child);
            })
        }
    }

    /**
     * @param {Node} node
     * @param {Node} targetNode 
     * @param {*} direction
     */
    function elevateBottomtoTop(node, targetNode, direction){

        if (node === targetNode || node === null)
            return null;


        // Yukari dogru gitmeden once verilen dogrultuda kardeslerini tariyor
        let currentSibling = node;
        while(currentSibling != null){
            if(direction == 'l')
                currentSibling = currentSibling.nextSibling;
            else if (direction == 'r')
                currentSibling = currentSibling.previousSibling;
            traversRootFromTopToBottom(currentSibling);
        }

        elevateBottomtoTop(findUpperParentWhichIsHaveNotNullSibling(node.parentElement, targetNode, direction), targetNode, direction);
             
    }

    /**
     * @param {Node} node
     * @param {Node} targetNode 
     * @param {*} direction
     */
    function findUpperParentWhichIsHaveNotNullSibling(node, targetNode, direction){


        if (node === targetNode)
            return targetNode;
        
        if(direction == 'l')
            if (node.nextSibling != null)
                return node.nextSibling;
        else if (direction == 'r')
            if (node.previousSibling != null)
                return node.previousSibling;

        return findUpperParentWhichIsHaveNotNullSibling(node.parentElement, targetNode, direction);
    }

    // Highlites current node
    /**
     * @param {Node} node
     * @param {number} startOffset 
     * @param {number} endOffset
     */
    function highlight(node, startOffset, endOffset){

        console.log(startOffset, endOffset);

        const range = document.createRange();
        range.setStart(node.firstChild, startOffset);
        range.setEnd(node.firstChild, endOffset);

        console.log(range);

        var span = document.createElement('span');
            span.className = 'highlight';
            span.style.backgroundColor = `${color}`;
        range.surroundContents(span);
    }

