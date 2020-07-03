chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    chrome.storage.sync.get("list", (result) => {        
        let clippings = result.list || [];
        if (request.clear) {
            clippings = [];
        }
        else if (request.selection) {
            clippings = [...clippings, request.selection];
        } 
        sendResponse({ clippings });
        chrome.storage.sync.set({
            list: clippings,
        });
    });
    return true
});