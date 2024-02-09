
let text = '';
document.addEventListener('selectionchange', () => {
    if (window.getSelection().toString().length != 0)
        text = window.getSelection().toString();
    else{
        if(text.length != 0)
            console.log(text);
        text = '';
    }
        
})

// Right now it is not functional
// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//     if (message.action === 'openSidePanel') {
//       // Perform action to open the side panel in the webpage context
//       // For example:
      
//     }
//   });
  

