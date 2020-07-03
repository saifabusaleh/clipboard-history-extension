document.addEventListener('selectionchange', () => {
    console.log(window.getSelection().toString());
    chrome.runtime.sendMessage({ selection: window.getSelection().toString() }, (response) =>  {
        //
    });
});