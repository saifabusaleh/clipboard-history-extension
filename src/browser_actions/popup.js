let clippingsList;
window.onload = () => {
    chrome.runtime.sendMessage({}, (response) => {
        clippingsList = response.clippings;
        renderClippings(response.clippings);
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

    const searchInput = document.getElementById("search-input");
    searchInput.addEventListener("keyup", (e) => {
        onSearchKeyup(e);
    });
};

const renderClippings = (clippings) => {
    const ul = document.getElementById("clippings-list");
    ul.innerHTML = '';
    clippings = clippings.reverse();
    clippings && clippings.forEach((clip) => {
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

const onSearchKeyup = (e) => {
    console.log(e.target.value);
    const searchText = e.target.value.toLowerCase();
    let filteredList;
    if(searchText) {
        filteredList = clippingsList.filter((item) => item.text.includes(searchText));
    }
    console.log(filteredList);
    renderClippings(filteredList);
}