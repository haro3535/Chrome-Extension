
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

function removeContent(srciptID) {
    try{
        document.getElementById(`sp_${srciptID}`).remove();
        let numOfChild = document.getElementById('content').childElementCount;
        for (let index = 0; index < numOfChild; index++) {
            // Burada contentin içideki çocukları kaldırman lazım ya da html elemetnlerıne düzenleme getir tek çocuk olsun
            
        }
    }
    catch (error) {
        console.log(error);
    }
}

document.getElementById('home').addEventListener('click', () => {
    removeContent('home');
    loadContent('home');
})
document.getElementById('settings').addEventListener('click', () => {
    removeContent('settings').then(() => loadContent('settings'));
})

document.getElementById('help').addEventListener('click', () => {
    removeContent('help');
    loadContent('help');
})
