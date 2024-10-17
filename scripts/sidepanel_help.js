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
if (typeof colorcellhelps === 'undefined') {
    var colorcellhelps = document.getElementsByClassName("colorcellhelp");
}
colorcellhelps[0].style.borderColor = "rgb(96,165,250)";

for (let index = 0; index < colorcellhelps.length; index++) {
    colorcellhelps[index].addEventListener("click", (event) => {

        for (let j = 0; j < colorcellhelps.length; j++) { 
            if (colorcellhelps[j] !== event.target) 
                colorcellhelps[j].style.borderColor = "";
            else event.target.style.borderColor = "rgb(96,165,250)";
        }
    })
}