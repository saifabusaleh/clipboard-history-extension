window.onload = function () {
    chrome.tabs.executeScript({
        code: "window.getSelection().toString();"
    }, function (selection) {
        chrome.runtime.sendMessage({ selection: selection[0] }, function (response) {
            // document.getElementById("output").innerHTML = response.clips;
            const ul = document.getElementById("outputList");
            response.clips && response.clips.forEach((clip) => {
                const li = document.createElement("li");
                li.appendChild(document.createTextNode(clip));
                ul.appendChild(li);
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