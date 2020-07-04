window.addEventListener("mouseup", function (event) {
    console.log(window.getSelection().toString());
    chrome.runtime.sendMessage({ selection: window.getSelection().toString() }, (response) => {
        //
    });
});