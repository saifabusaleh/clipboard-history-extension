window.onload = () => {
    chrome.runtime.sendMessage({}, (response) => {
        handleUpdateClippings(response);
    });

    const resetButton = document.getElementById("reset-button");
    resetButton.addEventListener("click", (e) => {
        chrome.runtime.sendMessage({ clear: true }), (response) => {
            text.innerHTML = response.clippings;
        };
    });

};

const handleUpdateClippings = (response) => {
    const ul = document.getElementById("outputList");
    response.clippings && response.clippings.forEach((clip) => {
        addClip(clip, ul);
    });
}
const addClip = (clip, ul) => {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(clip));
    ul.appendChild(li);
}