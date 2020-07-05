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
    const textDiv = document.createElement('div');
    textDiv.textContent = clip.text;
    textDiv.className = 'text';
    const dateDiv = document.createElement('div');
    dateDiv.textContent = clip.date;
    dateDiv.className = 'date';
    li.appendChild(textDiv);
    li.appendChild(dateDiv);
    ul.appendChild(li);
}