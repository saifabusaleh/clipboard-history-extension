window.onload = function () {
    chrome.tabs.executeScript({
        code: "window.getSelection().toString();"
    }, function (selection) {
        chrome.runtime.sendMessage({ selection: selection[0] }, function (response) {
            const ul = document.getElementById("outputList");
            response.clips && response.clips.forEach((clip) => {
                addClip(clip,ul);
            });
        });
    });

    const clippings = document.getElementById("output")

    clippings.addEventListener("click", function (e) {        
        chrome.runtime.sendMessage({ clear: true}), function (response) {
            text.innerHTML = response.clips;
        };
    });
};

const addClip = (clip, ul) => {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(clip));
    ul.appendChild(li);
}