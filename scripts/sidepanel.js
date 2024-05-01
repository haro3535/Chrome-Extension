

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

const colorCells = document.getElementsByClassName("colorcell");

for (let index = 0; index < colorCells.length; index++) {
    colorCells[index].addEventListener("click", (event) => {
        //console.log("Clicked! " + getComputedStyle(colorCells[index]).backgroundColor);
        chrome.runtime.sendMessage({
            action: 'changeColor',
            color: `${getComputedStyle(colorCells[index]).backgroundColor}`
        });
        for (let j = 0; j < colorCells.length; j++) {
            //TODO Make Selection Effect
            
        }
    })
}

