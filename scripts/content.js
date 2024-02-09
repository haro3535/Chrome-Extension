
let text = '';
document.addEventListener('selectionchange', () => {
    if (window.getSelection().toString().length != 0)
        text = window.getSelection().toString();
    else{
        if(text.length != 0)
            console.log(text);
        text = '';
    }
        
})


