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
    const ul = document.getElementById("clippings-list");
    ul.innerHTML = '';
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

const onSearchInputKeyup = (e) => {
    if (globalTimeout != null) {
        clearTimeout(globalTimeout);
    }
    globalTimeout = setTimeout(() => {
        globalTimeout = null;
        handleKeyup(e);
    }, 200);
}

const handleKeyup = (e) => {
    const searchText = e.target.value.toLowerCase();
    const filteredList = clippingsList.filter((item) => item.text.toLowerCase().includes(searchText));
    const ul = document.getElementById("clippings-list");
    const notFoundTextEle = document.getElementById("not-found-text");
    notFoundTextEle.innerHTML = '';
    if(filteredList.length > 0) {
        ul.classList.remove('hide');
        renderClippings(filteredList);
    } else {
        notFoundTextEle.innerHTML = `${searchText} not found`;
        ul.classList.add('hide');
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
        clippingsList = response.clippings;
        clippingsList = clippingsList.reverse();
        renderClippings(response.clippings);
    });
}