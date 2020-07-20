chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request)
    
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

    chrome.storage.sync.get("darkTheme", (result) => {
        let darkTheme = result.darkTheme;
        if (request.toggleTheme) {
            darkTheme = !darkTheme;
        }
        sendResponse({ darkTheme: darkTheme });
        chrome.storage.sync.set({
            darkTheme: darkTheme,
        });
    });

    return true;
});