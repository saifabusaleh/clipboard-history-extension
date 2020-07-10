let clippingsList;
let globalTimeout = null;

window.onload = () => {
    renderClippingOnLoad();

    const resetButton = document.getElementById("reset-button");
    resetButton.addEventListener("click", (e) => {
        onResetClick();
    });

    const clippings = document.getElementById("clippings-list");
    clippings.addEventListener("click", (e) => {
        onClipClick(e);
    });

    const searchInput = document.getElementById("search-input");
    searchInput.addEventListener("keyup", (e) => {
        onSearchInputKeyup(e);
    });
};

const renderClippings = (clippings) => {
    const clippingListEle = document.getElementById("clippings-list");
    clippingListEle.innerHTML = '';
    clippings && clippings.forEach((clip) => {
        addClip(clip, clippingListEle);
    });
}
const addClip = (clip, clippingListEle) => {
    const clippingListItem = document.createElement("li");
    const textDiv = document.createElement('div');
    textDiv.textContent = clip.text;
    textDiv.className = 'text';
    textDiv.title = clip.text.trim();
    const dateDiv = document.createElement('div');
    dateDiv.textContent = clip.creationDate;
    dateDiv.className = 'creation-date';
    clippingListItem.appendChild(textDiv);
    clippingListItem.appendChild(dateDiv);
    clippingListEle.appendChild(clippingListItem);
}

const onSearchInputKeyup = (e) => {
    if (globalTimeout != null) {
        clearTimeout(globalTimeout);
    }
    globalTimeout = setTimeout(() => {
        globalTimeout = null;
        const searchText = e.target.value.toLowerCase();
        performSearch(searchText);
    }, 300);
}

const performSearch = (searchText) => {
    const filteredList = clippingsList.filter((item) => item.text.toLowerCase().includes(searchText));
    const clippingListEle = document.getElementById("clippings-list");
    const notFoundTextEle = document.getElementById("not-found-text");
    notFoundTextEle.innerHTML = '';
    if (filteredList.length > 0) {
        clippingListEle.classList.remove('hide');
        renderClippings(filteredList);
    } else {
        notFoundTextEle.innerHTML = `There are no results for '${searchText}'`;
        clippingListEle.classList.add('hide');
    }
}

const onResetClick = () => {
    chrome.runtime.sendMessage({ clear: true }), (response) => {
        text.innerHTML = response.clippings;
    };
}

const onClipClick = (e) => {
    if (e.target.parentElement && e.target.parentElement.querySelector('.text')) {
        const textToCopy = e.target.parentElement.querySelector('.text').innerText;
        navigator.clipboard.writeText(textToCopy).then(() => {
            /* clipboard successfully set */
        }, (e) => {
            console.error('error copying text to clipboard, error: ', e);
        });
    }
}

const renderClippingOnLoad = () => {
    chrome.runtime.sendMessage({}, (response) => {
        clippingsList = response.clippings.reverse();
        renderClippings(response.clippings);
    });
}