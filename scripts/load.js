// This file is used for the sidepanel
// Basically, it contains main functions of the sidepanel like menu action, content loading, and script appending.



// window.onload = loadContent("home");

// async function loadContent(fileName) {
//     try {
//         // Fetch the content of home.html
//         const response = await fetch(`/sidepanel/${fileName}.html`);
//         if (!response.ok) throw new Error('Failed to load content');

//         // Get the text content from the response
//         const text = await response.text();

//         // Create a temporary container to hold the elements
//         const tempContainer = document.createElement('div');
//         tempContainer.innerHTML = text;

//         if(document.getElementById('content').childNodes != null)
//             document.getElementById('content').childNodes.forEach(child => child.remove());
//         // Append the content to the target element in main.html
//         document.getElementById('content').append(...tempContainer.children);

//         let script = document.createElement('script');
//         script.src = `/scripts/sidepanel_${fileName}.js`;
//         script.id = `sp_${fileName}`;
//         document.getElementsByTagName('head')[0].appendChild(script);
//     } catch (error) {
//         console.error('Error loading content:', error);
//     }
// }
// 'home' is initial state
let currentPage = 'home';

// Removes all the elements inside the 'content' div which is used for present the components inside
function switchContent(fileName) {
    try{
        // Disable the current script
        const currentScript = document.getElementById(`sp_${currentPage}`);
        if (currentScript) {
            currentScript.type = 'text/plain';
        }

        // Enable the new script
        const newScript = document.getElementById(`sp_${fileName}`);
        if (newScript) {
            newScript.type = 'text/javascript';
        } else {
            createScript(fileName);
        }

        document.getElementById(`/sidepanel/${currentPage}.html`).style.display = 'none';
        document.getElementById(`/sidepanel/${fileName}.html`).style.display = 'block';
        
    }
    catch (error) {
        console.log(error);
    }
}

function createScript(fileName) {
    let script = document.createElement('script');
    script.src = `/scripts/sidepanel_${fileName}.js`;
    script.id = `sp_${fileName}`;
    document.getElementsByTagName('head')[0].appendChild(script);
}

// Menu buttons listiners
document.getElementById('home').addEventListener('click', () => {
    switchContent('home');
    currentPage = 'home';
})
document.getElementById('settings').addEventListener('click', () => {
    switchContent('settings');
    currentPage = 'settings';
})

document.getElementById('help').addEventListener('click', () => {
    switchContent('help');
    currentPage = 'help';
})


document.addEventListener('DOMContentLoaded', () => {
    const contentElement = document.getElementById('content');
    debugger;
    function loadHTML(file) {
        return fetch(file)
            .then(response => response.text())
            .then(html => {
                const div = document.createElement('div');
                div.id = file;
                div.classList.add('w-full');
                div.classList.add('h-full');
                div.classList.add('space-y-6');
                div.classList.add('px-3');
                div.classList.add('mt-6');
                div.innerHTML = html;
                return div;
            });
    }

    function loadContent() {
        Promise.all([
            loadHTML('/sidepanel/home.html'),
            loadHTML('/sidepanel/settings.html'),
            loadHTML('/sidepanel/help.html')
        ]).then(elements => {
            elements.forEach(element => {
                if (element.id === '/sidepanel/home.html') {
                    element.style.display = 'block';
                    createScript('home');
                } else {
                    element.style.display = 'none';
                }
                contentElement.appendChild(element);
            });
        }).catch(error => {
            console.error('Error loading HTML content:', error);
        });
    }

    loadContent();
});