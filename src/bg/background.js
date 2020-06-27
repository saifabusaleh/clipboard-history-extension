chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    let clippings = [];
    chrome.storage.sync.get("list", (result) => {
        if (request.clear) {
            clippings = [];
        }
        else if (request.selection && result.list) {
            clippings = [...result.list, request.selection];
        } else if (result.list) {
            clippings = [...result.list];
        } else {
            clippings = [request.selection];
        }
        sendResponse({ clips: clippings });
        chrome.storage.sync.set({
            list: clippings,
        });
    });
    return true
});