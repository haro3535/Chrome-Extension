// sidepanel_help.js

// Function to send a message to background.js to open a link in a new tab
function openLinkInNewTab(url) {
    chrome.runtime.sendMessage({ action: 'openLink', url: url });
}

document.getElementById('myLink').addEventListener('click', () => {
    // Example usage
    openLinkInNewTab('https://www.linkedin.com/in/harunonur');
})


// For visualizing the color selection
if (typeof colorCells === 'undefined') {
    var colorCells = document.getElementsByClassName("colorcell");
}
colorCells[0].style.borderColor = "rgb(96,165,250)";

for (let index = 0; index < colorCells.length; index++) {
    colorCells[index].addEventListener("click", (event) => {

        for (let j = 0; j < colorCells.length; j++) { 
            if (colorCells[j] !== event.target) 
                colorCells[j].style.borderColor = "";
            else event.target.style.borderColor = "rgb(96,165,250)";
        }
    })
}