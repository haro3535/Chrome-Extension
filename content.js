// Cursor Mods: normal, marker, eraser?
let cursorMod = 'normal';

let alpha = 0.8
let color = `rgba(255,212,101,${alpha})`;

let style = null;
let newContentFlag = false;

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'changeCursor'){
        cursorMod = message.cursorMod.toString();
        if (cursorMod == "marker") {
            // Burasi calismiyor 
            console.log("marker");
            appendStyle();
            
        }
        else if (cursorMod == "cursor"){
            console.log("cursor");
            if(style != null)
            {
                document.head.removeChild(style);
                style = null;
            }
        }
        else {
            console.log("eraser");
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
            body {
                cursor: url(${chrome.runtime.getURL("images/mycursor16x16.png")}), auto;
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
            let selection = window.getSelection();
            myHighlightFunction()

            selection.removeAllRanges();
        }

        if (cursorMod == 'eraser') {
            let selection = window.getSelection();
            console.log(selection.anchorNode);
            deleteHighlite(selection.anchorNode);
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


    // Main function 

    function myHighlightFunction() {

        let selection = window.getSelection();
        let anchorNode = selection.anchorNode;
        let anchorOffset = selection.anchorOffset;
        let focusNode = selection.focusNode;
        let focusOffset = selection.focusOffset;
        debugger;

        if (anchorNode === focusNode){
            highlight(anchorNode,anchorOffset,focusOffset);
        }
        else {
            let commonAncestorContainer = selection.getRangeAt(0).commonAncestorContainer;
            console.log(commonAncestorContainer);
            

            if(checkDependencyOfNodes(anchorNode,focusNode)){
                // Check if anchor and focus nodes are siblings
                let starterNodeIndex = findSelectedChildofRootElement(commonAncestorContainer, anchorNode);
                let endNodeIndex = findSelectedChildofRootElement(commonAncestorContainer, focusNode);

                if (starterNodeIndex < endNodeIndex){
                    highlight(anchorNode,anchorOffset,anchorNode.length);

                    let tIndex = starterNodeIndex + 1;
                    while (tIndex != endNodeIndex){
                        let copyChildNodes = commonAncestorContainer.childNodes;
                        traversRootFromTopToBottom(copyChildNodes[tIndex]);
                        starterNodeIndex = findSelectedChildofRootElement(commonAncestorContainer, anchorNode);
                        endNodeIndex = findSelectedChildofRootElement(commonAncestorContainer, focusNode);
                        tIndex++;
                    }

                    highlight(focusNode,0,focusOffset);
                }
                else{
                    highlight(anchorNode,0,anchorOffset);

                    let tIndex = endNodeIndex + 1;
                    while (tIndex != starterNodeIndex){
                        traversRootFromTopToBottom(commonAncestorContainer.childNodes[tIndex]);
                        starterNodeIndex = findSelectedChildofRootElement(commonAncestorContainer, anchorNode);
                        endNodeIndex = findSelectedChildofRootElement(commonAncestorContainer, focusNode);
                        tIndex++;
                    }

                    highlight(focusNode,focusOffset,focusNode.length);
                }
            }
            else {
                // They are not siblings
                let starterNodeIndex = findSelectedChildofRootElement(commonAncestorContainer, anchorNode);
                let endNodeIndex = findSelectedChildofRootElement(commonAncestorContainer, focusNode);

                if (starterNodeIndex < endNodeIndex){

                    highlight(anchorNode,anchorOffset,anchorNode.length);

                    horizontalStepFunction(anchorNode, commonAncestorContainer.childNodes[starterNodeIndex], 'n', anchorNode);

                    let tIndex = starterNodeIndex + 1; // 2 comes from to call next node after the start node
                    while (tIndex != endNodeIndex){
                        let copyChildNodes = commonAncestorContainer.childNodes;
                        traversRootFromTopToBottom(copyChildNodes[tIndex]);
                        starterNodeIndex = findSelectedChildofRootElement(commonAncestorContainer, anchorNode);
                        endNodeIndex = findSelectedChildofRootElement(commonAncestorContainer, focusNode);
                        tIndex++;
                    }
                    
                    horizontalStepFunction(focusNode, commonAncestorContainer.childNodes[endNodeIndex], 'p', focusNode);
                    
                    highlight(focusNode,0,focusOffset);
                    
                    
                }
                else if (starterNodeIndex > endNodeIndex){

                    highlight(anchorNode,0,anchorOffset);

                    horizontalStepFunction(anchorNode, commonAncestorContainer.childNodes[starterNodeIndex], 'p', anchorNode);

                    let tIndex = endNodeIndex + 1;
                    while (tIndex != starterNodeIndex){
                        traversRootFromTopToBottom(commonAncestorContainer.childNodes[tIndex]);
                        starterNodeIndex = findSelectedChildofRootElement(commonAncestorContainer, anchorNode);
                        endNodeIndex = findSelectedChildofRootElement(commonAncestorContainer, focusNode);
                        tIndex++;
                    }
    
                    
                    highlight(focusNode,focusOffset,focusNode.length);
    
                    // TODO: Sıkıntı var
                    
                    horizontalStepFunction(focusNode, commonAncestorContainer.childNodes[endNodeIndex], 'n', focusNode);
                    
                    
                }
            }
        }
    }


    


    // Travers through top to bottom (for the sibling parrent nodes that are between start parent node and end parent node)
    /**
     * @param {Node} node
     */
    function traversRootFromTopToBottom(node){
        
        if (node == null)
            return;

        // Check if the current node is a text node
        if (node.nodeType === Node.TEXT_NODE) {
            if (node.textContent.trim().length == 0){
                node.parentElement.removeChild(node);
                return;
            }
                 
            console.log("Text node found:", node.nodeValue);      
            highlight(node, 0, node.length);
            return; // Stop further traversal
        }

        // Ensure the node has child nodes before trying to traverse them
        if (node.hasChildNodes()) {
            node.childNodes.forEach(child => traversRootFromTopToBottom(child));
        }
        else return;
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

        if (direction == 'n'){
            
            // Burada next sibling null ise sıkıntı çıkmasın diye yapıyorum
            if (node.nextSibling != null && node.nextSibling != undefined){
                let nextSibling = node.nextSibling;
                if(node != startEnd)
                    traversRootFromTopToBottom(nextSibling);
                horizontalStepFunction(nextSibling, targetNode, direction, null);
            }
            else 
                horizontalStepFunction(findUpperParentWhichIsHaveNotNullSibling(node.parentElement, targetNode, direction), targetNode, direction, startEnd);
        }
        else if (direction == 'p'){
            // Burada previous sibling null ise sıkıntı çıkmasın diye yapıyorum
            if (node.previousSibling != null && node.previousSibling != undefined){
                let prevSibling = node.previousSibling;
                if(node != startEnd)
                    traversRootFromTopToBottom(prevSibling);
                horizontalStepFunction(prevSibling, targetNode, direction, null);
            }
            else 
                horizontalStepFunction(findUpperParentWhichIsHaveNotNullSibling(node.parentElement, targetNode, direction), targetNode, direction, startEnd);
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
        // FIXME: Bu fonksiyonda hata var
        
        if (node === targetNode)
            return targetNode;
        
        if(direction == 'n')
            if (node.nextSibling != null)
                return node.nextSibling;
        else if (direction == 'p')
            if (node.previousSibling != null) // FIXME: Check here later. There is a problem occured.
                return node.previousSibling;
        
        if(node.parentElement != null)
           return findUpperParentWhichIsHaveNotNullSibling(node.parentElement, targetNode, direction);
        else return; 
    }

    // Highlites current node
    /**
     * @param {Node} node
     * @param {number} startOffset 
     * @param {number} endOffset
     */
    function highlight(node, startOffset, endOffset){

        // console.log(startOffset, endOffset);

        if (startOffset > endOffset) {
            // Swap the values if they are in reverse order
            [startOffset, endOffset] = [endOffset, startOffset];
        }
    
        const range = document.createRange();
        range.setStart(node, startOffset);
        range.setEnd(node, endOffset);
        

        console.log(color);

        var span = document.createElement('span');
            span.className = 'highlight';
            span.style.backgroundColor = `${color}`;
        range.surroundContents(span);

        window.getSelection().removeAllRanges();

        deleteUnwantedTextElements(span);

    }


    function checkNewContentFlagIsRised(){
        if(newContentFlag){
            newContentFlag = false;
            return true;
        }else return false;
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








 

/**
     * @param {Node} anchorNode
     * @param {Node} focusNode 
     */
function checkDependencyOfNodes(anchorNode, focusNode) {
    // There are two situation:
    //  1) Ancor node and focus node are not siblings.
    //  2) They are siblings.
    //
    // These situations causes futer problem while computing.
    // This function finds that given nodes (anchor and focus) are siblings (dependent) or not.
    
    if(anchorNode != null || anchorNode !== undefined){
        let parent = anchorNode.parentNode;
        if(parent != null || parent != undefined){
            for (let child of parent.childNodes) {
                console.log("object");
                if (child === focusNode) {
                    return true; // They are dependent
                }
            }
            return false; // They are independent
        }
        throw new Error("Parent element is null or undefined!"); 
    }
    else throw new Error("Anchor element is null or undefined!"); 
}

/**
 * 
 * @param {Node} spanNode 
 */
function deleteUnwantedTextElements(spanNode){
    debugger;
    try {
        if(spanNode.previousSibling != null && spanNode.previousSibling.nodeType == Node.TEXT_NODE && spanNode.previousSibling.textContent == ""){
            if (spanNode.parentElement != null)
                spanNode.parentElement.removeChild(spanNode.previousSibling);
        }

        if(spanNode.nextSibling != null && spanNode.nextSibling.nodeType == Node.TEXT_NODE && spanNode.nextSibling.textContent == ""){
            if (spanNode.parentElement != null)
                spanNode.parentElement.removeChild(spanNode.nextSibling);
        }
    } catch (error) {
        console.error(error);
    }
}

/**
 * 
 * @param {Node} node 
 */
function findTheIndexOfCurrentNode(node){
    debugger;
    if (node.parentElement != null){
        let parent = node.parentElement;
        for (let index = 0; index < parent.childNodes.length; index++) {
            if(parent.childNodes.item(index) === node)
                return index;
        }
        return -1;
    }
    else return 0;
}

/**
     * @param {Node} commonAncestorContainer
     * @param {Node} node
     */
function findSelectedChildofRootElement(commonAncestorContainer, node){
    // This function finds sibling nodes that are contains selected TEXT nodes
    // that are under the commonAncestorContainer node.
    
    let currentElement = node;
    while (currentElement.parentElement !== commonAncestorContainer){
        currentElement = currentElement.parentElement;
    }
    console.log(currentElement);

    return Array.prototype.indexOf.call(commonAncestorContainer.childNodes, currentElement);
}


/**
 * 
 * @param {HTMLElement} node 
 */
function deleteHighlite(node){

    if(node.parentElement.classList.contains("highlight")){
        // TODO: Direk böyle olmuyor yazıyıda kaldırıyor
        node.parentElement.remove();
    }
}