

let opacitySpan = document.getElementById('opacityValueSpan');

document.getElementById('opacityRange').addEventListener('input', (event) => {
    opacitySpan.innerHTML = event.target.value / 100;
})

document.getElementById('opacityRange').addEventListener('change', (event) => {
    chrome.runtime.sendMessage({ 
        action: 'changeOpacity',
        opacityValue: (event.target.value / 100)
    })
})

document.getElementById('normalMod').addEventListener('click', () => {
    chrome.runtime.sendMessage({
        action: 'changeCursor',
        cursorMod: 'normal'
    });
});

document.getElementById('markingMod').addEventListener('click', () => {
    chrome.runtime.sendMessage({
        action: 'changeCursor',
        cursorMod: 'marker'
    });
});

document.getElementById("saveButton").addEventListener('click', () => {
    
})