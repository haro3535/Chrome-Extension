
// Cursor Mods: normal, marker
let cursorMod = 'normal';

let alpha = 0.8
let color = `rgba(255,212,101,${alpha})`;

let style = null;


chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'changeCursor'){
        cursorMod = message.cursorMod.toString();
        if (cursorMod == "marker") {
            // Burasi calismiyor 
            console.log("marker");
            appendStyle();
            
        }
        else {
            console.log("cursor");
            if(style != null)
            {
                
                document.head.removeChild(style);
                style = null;
            }
        }      
    }
    else if (message.action === 'changeOpacity'){
        alpha = message.opacityValue;
        let rgbComponents = color.match(/\d+/g);
        color = 'rgba(' + rgbComponents[0] + ', ' + rgbComponents[1] + ', ' + rgbComponents[2] + ', ' + alpha + ')';
        appendStyle();
    }
    else if (message.action === 'changeColor'){
        console.log(message.color);
        let rgbComponents = message.color.match(/\d+/g);
        color = 'rgba(' + rgbComponents[0] + ', ' + rgbComponents[1] + ', ' + rgbComponents[2] + ', ' + alpha + ')';
        appendStyle();
    }
  });


function appendStyle(){
    if (style == null){
        style = document.createElement('style');
        style.innerHTML = `
            ::selection {
                background-color: ${color};
            }
            ::-moz-selection {
                background-color: ${color};
            }
        `;
        document.head.appendChild(style);
    }
    else{
        document.head.removeChild(style);
        style = null;
        appendStyle();
    }
}

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
            console.log(commonAncestorContainer);
            // TODO: Buradana devam tüm çocuk elementlere kadar ulaşıcan taki focuse nodu bulana kadar
            let anchorParentNode = ancorNode.parentNode;
            let focusParentNode = focusNode.parentNode;

            let starterNodeIndex = findSelectedChildofRootElement(commonAncestorContainer, ancorNode);
            let endNodeIndex = findSelectedChildofRootElement(commonAncestorContainer, focusNode);
            console.log("Starter Node: " + starterNodeIndex);
            console.log("End Node: " + endNodeIndex);

            if (starterNodeIndex < endNodeIndex){

                let tIndex = starterNodeIndex + 1;
                while (tIndex != endNodeIndex){
                    traversRootFromTopToBottom(commonAncestorContainer.childNodes[tIndex]);
                    console.log("Buraya geldimmm");
                    tIndex++;
                }
                
                highlight(ancorNode,anchorOffset,ancorNode.length);
        
                horizontalStepFunction(ancorNode, commonAncestorContainer.childNodes[starterNodeIndex], 'l', ancorNode);
                horizontalStepFunction(focusNode, commonAncestorContainer.childNodes[endNodeIndex], 'r', focusNode);
                
                highlight(focusNode,0,focusOffset);
            }
            else if (starterNodeIndex > endNodeIndex){
                let tIndex = endNodeIndex + 1;
                while (tIndex != starterNodeIndex){
                    traversRootFromTopToBottom(commonAncestorContainer.childNodes[tIndex]);
                    tIndex++;
                }

                //highlight(ancorNode,anchorOffset,ancorNode.length);

                horizontalStepFunction(ancorNode, commonAncestorContainer.childNodes[starterNodeIndex], 'r', ancorNode);
                horizontalStepFunction(focusNode, commonAncestorContainer.childNodes[endNodeIndex], 'l', focusNode);
                
                //highlight(focusNode,0,focusOffset);
            }
        }
    }

    /**
     * @param {Node} commonAncestorContainer
     * @param {Node} node
     */
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

        if (node.nodeType === Node.TEXT_NODE && node.nodeValue != ""){
            console.log(node);
            highlight(node, 0, node.length);
            return;
        }
        
        if (node.hasChildNodes() && node.nodeType !== Node.TEXT_NODE)
        {
            console.log("Node Type: " + node);
            console.log("Has Child: " + node.hasChildNodes());
            console.log("Childs" + node.childNodes.length);

            let childNumber = node.childNodes.length;

            if (childNumber == 1)
                traversRootFromTopToBottom(node.childNodes[0]);
            else if (childNumber > 1)
            node.childNodes.forEach(child => {
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
     * @param {Node} startEnd
     */
    function horizontalStepFunction(node, targetNode, direction, startEnd){

        if (node === targetNode)
            return;

        if (direction == 'l'){
            
            // Burada next sibling null ise sıkıntı çıkmasın diye yapıyorum
            let nextSibling = node.nextSibling;
            if (nextSibling != null){
                if(node != startEnd)
                    traversRootFromTopToBottom(nextSibling);
                horizontalStepFunction(nextSibling, targetNode, direction, null);
            }
            else 
                horizontalStepFunction(findUpperParentWhichIsHaveNotNullSibling(node.parentElement, targetNode, direction), targetNode, direction, null);
        }
        else if (direction == 'r'){
            // Burada previous sibling null ise sıkıntı çıkmasın diye yapıyorum
            let prevSibling = node.previousSibling;
            if (prevSibling != null){
                if(node != startEnd)
                    traversRootFromTopToBottom(prevSibling);
                horizontalStepFunction(prevSibling, targetNode, direction, null);
            }
            else 
                horizontalStepFunction(findUpperParentWhichIsHaveNotNullSibling(node.parentElement, targetNode, direction), targetNode, direction, null);
        }
        else 
        {
            console.error("Incorrect directon value: " + direction);
            return;
        }
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
            if (node.previousSibling != null) // FIXME: Check here later. There is a problem occured.
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
        range.setStart(node, startOffset);
        range.setEnd(node, endOffset);

        console.log(color);

        var span = document.createElement('span');
            span.className = 'highlight';
            span.style.backgroundColor = `${color}`;
        range.surroundContents(span);

        window.getSelection().removeAllRanges();
    }








/**
     * @param {Node} element
     * @param {number} startOffset 
     * @param {number} endOffset
     */
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

