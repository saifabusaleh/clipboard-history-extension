window.addEventListener("copy", function (event) {
    try {
        const text = window.getSelection().toString().trim();
        if (text && text.length > 0) {
            chrome.runtime.sendMessage({ selection: window.getSelection().toString() });
        }
    } catch (e) {
        console.error(e);
    }

});