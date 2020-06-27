window.onload = () => {
    chrome.tabs.executeScript({
        code: "window.getSelection().toString();"
    }, (selection) =>  {
        if(selection && selection.length > 0) {
            chrome.runtime.sendMessage({ selection: selection[0] }, (response) =>  {
                handleUpdateClips(response);
            });
        }
    });

    const clippings = document.getElementById("output")

    clippings.addEventListener("click", (e) =>  {        
        chrome.runtime.sendMessage({ clear: true}), (response) => {
            text.innerHTML = response.clips;
        };
    });
};

const handleUpdateClips = (response) => {
    const ul = document.getElementById("outputList");
    response.clips && response.clips.forEach((clip) => {
        addClip(clip,ul);
    });
}
const addClip = (clip, ul) => {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(clip));
    ul.appendChild(li);
}