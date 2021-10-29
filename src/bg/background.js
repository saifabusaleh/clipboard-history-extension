chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if ("toggleTheme" in request) {
        toggleTheme(sendResponse);
    }
    else if ("getTheme" in request) {
        getTheme(sendResponse);
    }
    else if ("clear" in request) {
        clearHandler(request, sendResponse);
    }
    else {
        getClippings(request, sendResponse);
    }

    return true;
});


const toggleTheme = (sendResponse) => {
    chrome.storage.sync.get("isDarkTheme", (result) => {
        const darkThemeToggeled = !result.isDarkTheme;

        chrome.storage.sync.set({ isDarkTheme: darkThemeToggeled }, () => {
            sendResponse({ isDarkTheme: darkThemeToggeled });
        });
    });
}

const getTheme = (sendResponse) => {
    chrome.storage.sync.get("isDarkTheme", (result) => {
        sendResponse({ isDarkTheme: result.isDarkTheme });
    });
}

const clearHandler = (request, sendResponse) => {
    chrome.storage.sync.get("clippings", (result) => {
        let clippings;
        if (request.timestamp) {
            clippings = result.clippings || [];
            clippings = clippings.filter((clip) => clip.creationDate !== request.timestamp);
        } else clippings = [];
        chrome.storage.sync.set({ clippings }, () => {
            sendResponse({ clippings });
        });
    });
}


const getClippings = (request, sendResponse) => {
    chrome.storage.sync.get("clippings", (result) => {
        let clippings = result.clippings || [];
        if (request.selection) {
            clippings = [{ text: request.selection, creationDate: new Date().getTime() }, ...clippings];
        }
        chrome.storage.sync.set({ clippings }, () => {
            sendResponse({ clippings });
        });
    });
}