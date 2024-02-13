

let opacitySpan = document.getElementById('opacityValueSpan');

document.getElementById('opacityRange').addEventListener('input', (event) => {
    console.log(event.target.value)
    opacitySpan.innerHTML = event.target.value / 100;
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