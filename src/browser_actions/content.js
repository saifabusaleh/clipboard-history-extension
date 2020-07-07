window.addEventListener("copy", function (event) {
    const text = window.getSelection().toString();
    if(text && text.length > 0) {
        // console.log(window.getSelection().toString());
        chrome.runtime.sendMessage({ selection: window.getSelection().toString() });
    }
});