window.addEventListener("copy", function (event) {
    try {
        const text = getSelectionText();
        if (text && text.length > 0) {
            chrome.runtime.sendMessage({ selection: window.getSelection().toString() });
        }
    } catch (e) {
        console.error(e);
    }
});

function getSelectionText() {
    let text = "";
    let activeEl = document.activeElement;
    let activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
    if (
        (activeElTagName == "textarea") || (activeElTagName == "input" &&
            /^(?:text|search|password|tel|url)$/i.test(activeEl.type)) &&
        (typeof activeEl.selectionStart == "number")
    ) {
        text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
    } else if (window.getSelection) {
        text = window.getSelection().toString();
    }
    return text;
}