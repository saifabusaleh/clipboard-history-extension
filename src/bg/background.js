chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if ("toggleTheme" in request) {
        toggleTheme(sendResponse);
    }
    else if ("getTheme" in request) {
        getTheme(sendResponse);
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


const getClippings = (request, sendResponse) => {
    chrome.storage.sync.get("list", (result) => {
        let clippings = result.list || [];
        if (request.clear) {
            clippings = [];
        }
        else if (request.selection) {
            clippings = [...clippings, { text: request.selection, creationDate: new Date().toLocaleString() }];
        }
        chrome.storage.sync.set({ list: clippings }, () => {
            sendResponse({ clippings });
        });
    });
}