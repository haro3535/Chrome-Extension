// This file is used for the sidepanel
// Basically, it contains main functions of the sidepanel like menu action, content loading, and script appending.



window.onload = loadContent("home");

async function loadContent(fileName) {
    try {
        // Fetch the content of home.html
        const response = await fetch(`/sidepanel/${fileName}.html`);
        if (!response.ok) throw new Error('Failed to load content');

        // Get the text content from the response
        const text = await response.text();

        // Create a temporary container to hold the elements
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = text;

        if(document.getElementById('content').childNodes != null)
            document.getElementById('content').childNodes.forEach(child => child.remove());
        // Append the content to the target element in main.html
        document.getElementById('content').append(...tempContainer.children);

        let script = document.createElement('script');
        script.src = `/scripts/sidepanel_${fileName}.js`;
        script.id = `sp_${fileName}`;
        document.getElementsByTagName('head')[0].appendChild(script);
    } catch (error) {
        console.error('Error loading content:', error);
    }
}
// 'home' is initial state
let currentPage = 'home';

// Removes all the elements inside the 'content' div which is used for present the components inside
function removeContent() {
    try{
        document.getElementById(`sp_${currentPage}`).remove();
        
        let element = document.getElementById('content');
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
    catch (error) {
        console.log(error);
    }
}


// Menu buttons listiners
document.getElementById('home').addEventListener('click', () => {
    removeContent();
    loadContent('home');
    currentPage = 'home';
})
document.getElementById('settings').addEventListener('click', () => {
    removeContent();
    loadContent('settings');
    currentPage = 'settings';
})

document.getElementById('help').addEventListener('click', () => {
    removeContent();
    loadContent('help');
    currentPage = 'help';
})
