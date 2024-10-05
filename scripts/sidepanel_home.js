
// Set the year
document.getElementById("year").textContent = new Date().getFullYear();

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

document.getElementById('cursorMod').addEventListener('click', () => {
    chrome.runtime.sendMessage({
        action: 'changeCursor',
        cursorMod: 'cursor'
    });
    clickedItem(document.getElementById('cursorMod'));
});

document.getElementById('markingMod').addEventListener('click', () => {
    chrome.runtime.sendMessage({
        action: 'changeCursor',
        cursorMod: 'marker'
    });
    clickedItem(document.getElementById('markingMod'));
});

document.getElementById('eraserMod').addEventListener('click', () => {
    chrome.runtime.sendMessage({
        action: 'changeCursor',
        cursorMod: 'eraser'
    })
    clickedItem(document.getElementById('eraserMod'));
})


const colorCells = document.getElementsByClassName("colorcell");
colorCells[0].style.borderColor = "rgb(96,165,250)";

for (let index = 0; index < colorCells.length; index++) {
    colorCells[index].addEventListener("click", (event) => {
        //console.log("Clicked! " + getComputedStyle(colorCells[index]).backgroundColor);
        chrome.runtime.sendMessage({
            action: 'changeColor',
            color: `${getComputedStyle(colorCells[index]).backgroundColor}`
        });

        for (let j = 0; j < colorCells.length; j++) { 
            if (colorCells[j] !== event.target) 
                colorCells[j].style.borderColor = "";
            else event.target.style.borderColor = "rgb(96,165,250)";
        }
    })
}

/**
 * 
 * @param {HTMLElement} element 
 */
function clickedItem(element){
    document.getElementById("selectionPanel").querySelectorAll('div').forEach(item => {
        if(item.id == element.id){
            item.style.backgroundColor = "#cbd5e1";
        }
        else{
            item.style.backgroundColor = "#94a3b8";
        }
    })
}




chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    if(message.action === "addTextCard"){
        // Buraya sidepanelde gösterilecek mesajların okunmasını ekle
    }
})






