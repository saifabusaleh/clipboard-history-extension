let clippingsList;
let clippingListElement;
let notFoundTextElement;

window.onload = () => {
    renderClippingOnLoad();

    const resetButton = document.getElementById("reset-button");
    resetButton.addEventListener("click", (e) => {
        onResetClick();
    });

    clippingListElement = document.getElementById("clippings-list");
    clippingListElement.addEventListener("click", (e) => {
        onClipClick(e);
    });

    const searchInput = document.getElementById("search-input");
    searchInput.addEventListener("keyup", debounce((e) => {
        onSearchInputKeyup(e);
    }, 300));
    notFoundTextElement = document.getElementById("not-found-text");

    const themeChangers = document.querySelectorAll(".theme-changer");
    themeChangers.forEach((changer) => {
        changer.addEventListener("click", (e) => {
            changeTheme(changer);
        });
    });
    
    const darkTheme = localStorage.getItem("darkTheme");
    if (darkTheme === "true") {
        changer = document.querySelector(".visible-changer");
        localStorage.setItem("darkTheme", false);
        changer.click();
    }
};

const renderClippings = (clippings) => {
    clippingListElement.innerHTML = "";
    clippings && clippings.forEach((clip) => {
        addClip(clip);
    });
}

const addClip = (clip) => {
    const clippingListItem = document.createElement("li");
    const textDiv = document.createElement("div");
    textDiv.textContent = clip.text;
    textDiv.className = "text";
    textDiv.title = clip.text.trim();
    const dateDiv = document.createElement("div");
    dateDiv.textContent = clip.creationDate;
    dateDiv.className = "creation-date";
    clippingListItem.appendChild(textDiv);
    clippingListItem.appendChild(dateDiv);
    clippingListElement.appendChild(clippingListItem);
}

const onSearchInputKeyup = (e) => {
    const searchText = e.target.value.toLowerCase();
    performSearch(searchText);
}

const performSearch = (searchText) => {
    const filteredList = clippingsList.filter((item) => item.text.toLowerCase().includes(searchText));
    notFoundTextElement.innerHTML = "";
    if (filteredList.length > 0) {
        clippingListElement.classList.remove("hide");
        renderClippings(filteredList);
    } else {
        notFoundTextElement.innerHTML = `There are no results for "${searchText}"`;
        clippingListElement.classList.add("hide");
    }
}

const onResetClick = () => {
    chrome.runtime.sendMessage({ clear: true }), (response) => {
        text.innerHTML = response.clippings;
    };
}

const onClipClick = (e) => {
    if (e.target.parentElement && e.target.parentElement.querySelector(".text")) {
        const textToCopy = e.target.parentElement.querySelector(".text").innerText;
        navigator.clipboard.writeText(textToCopy).then(() => {
            /* clipboard successfully set */
        }, (e) => {
            console.error("error copying text to clipboard, error: ", e);
        });
    }
}

const renderClippingOnLoad = () => {
    chrome.runtime.sendMessage({}, (response) => {
        clippingsList = response.clippings.reverse();
        renderClippings(response.clippings);
    });
}

const debounce = (fn, timeoutInterval) => {
    let timer;

    return (...args) => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(fn, timeoutInterval, ...args)
    };
}

const changeTheme = (changer) => {
    const hiddenChanger = document.querySelector(".theme-changer:not(.visible-changer)");
    const darkTheme = localStorage.getItem("darkTheme");
    const bg = document.querySelector("html");
    hiddenChanger.classList.add("visible-changer");
    changer.classList.remove("visible-changer");

    if (darkTheme === "true") {
        localStorage.setItem("darkTheme", false)
        bg.classList.remove("dark-theme");
    } else {
        localStorage.setItem("darkTheme", true)
        bg.classList.add("dark-theme");
    }
}