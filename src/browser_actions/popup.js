window.onload = function () {
    chrome.tabs.executeScript({
        code: "window.getSelection().toString();"
    }, function (selection) {
        chrome.runtime.sendMessage({ selection: selection[0] }, function (response) {
            document.getElementById("output").innerHTML = response.clips;
        });
    });

    const clippings = document.getElementById("output")

    clippings.addEventListener("click", function (e) {        
        chrome.runtime.sendMessage({ clear: true}), function (response) {
            text.innerHTML = response.clips;
        };
    });
};