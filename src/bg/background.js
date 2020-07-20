chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.hasOwnProperty("toggleTheme")) {
        chrome.storage.sync.get("isDarkTheme", (result) => {
            const darkThemeToggeled = !result.isDarkTheme;

            sendResponse({ isDarkTheme: darkThemeToggeled });
            chrome.storage.sync.set({
                isDarkTheme: darkThemeToggeled,
            });
        });
    }
    else {
        chrome.storage.sync.get("list", (result) => {
            let clippings = result.list || [];
            if (request.clear) {
                clippings = [];
            }
            else if (request.selection) {
                clippings = [...clippings, { text: request.selection, creationDate: new Date().toLocaleString() }];
            }
            sendResponse({ clippings });
            chrome.storage.sync.set({
                list: clippings,
            });
        });
    }

    return true;
});