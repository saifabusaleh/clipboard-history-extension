window.onload = () => {
    chrome.runtime.sendMessage({}, (response) => {
        preformUpdateClippings(response);
    });

    const resetButton = document.getElementById("reset-button");
    resetButton.addEventListener("click", (e) => {
        chrome.runtime.sendMessage({ clear: true }), (response) => {
            text.innerHTML = response.clippings;
        };
    });

    const clippings = document.getElementById("clippings-list");
    clippings.addEventListener("click", (e) => {
        if (e.target.parentElement && e.target.parentElement.querySelector('.text')) {
            const textToCopy = e.target.parentElement.querySelector('.text').innerText;
            console.log(textToCopy);
            navigator.clipboard.writeText(textToCopy).then(() => {
                /* clipboard successfully set */
            }, (e) => {
                console.error('error copying text to clipboard, error: ', e);
            });
        }
    });
};

const preformUpdateClippings = (response) => {
    const ul = document.getElementById("clippings-list");
    response.clippings = response.clippings.reverse();
    response.clippings && response.clippings.forEach((clip) => {
        addClip(clip, ul);
    });
}
const addClip = (clip, ul) => {
    const li = document.createElement("li");
    const textDiv = document.createElement('div');
    textDiv.textContent = clip.text;
    textDiv.className = 'text';
    textDiv.title = clip.text;
    const dateDiv = document.createElement('div');
    dateDiv.textContent = clip.date;
    dateDiv.className = 'date';
    li.appendChild(textDiv);
    li.appendChild(dateDiv);
    ul.appendChild(li);
}