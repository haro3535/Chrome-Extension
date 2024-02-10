

let opacitySpan = document.getElementById('opacityValueSpan');

document.getElementById('opacityRange').addEventListener('change', (value) => {
    console.log(value)
    console.log('merhaba')
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