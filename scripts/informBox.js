function showMessage(message) {
    const messageBox = document.getElementById('messageBox');
    document.getElementById('messageText').textContent = message;
    messageBox.classList.remove('hidden');

    setTimeout(() => {
        messageBox.classList.add('hidden');
    }, 2000);
}