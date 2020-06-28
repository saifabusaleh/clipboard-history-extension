window.onload = () => {
    chrome.tabs.executeScript({
        code: "window.getSelection().toString();"
    }, (selection) =>  {
        if(selection && selection.length > 0) {
            chrome.runtime.sendMessage({ selection: selection[0] }, (response) =>  {
                handleUpdateClippings(response);
            });
        }
    });

    const clippings = document.getElementById("output")

    clippings.addEventListener("click", (e) =>  {        
        chrome.runtime.sendMessage({ clear: true}), (response) => {
            text.innerHTML = response.clippings;
        };
    });
};

const handleUpdateClippings = (response) => {
    const ul = document.getElementById("outputList");
    response.clippings && response.clippings.forEach((clip) => {
        addClip(clip,ul);
    });
}
const addClip = (clip, ul) => {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(clip));
    ul.appendChild(li);
}