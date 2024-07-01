// chrome.action.disable();

// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // chrome.action.enable(tabId);
    // if (changeInfo.status == "complete" && tab.url != undefined) {
        // console.log(tab.url);
        // if (tab.url.indexOf('1800') != -1) {
        //     console.log('enable');
        //     chrome.action.enable(tabId);
        //     console.log(tab)
        // }
        // chrome.tabs.sendMessage(tabId, {
        //     type: "TEST"
        // })
    // } else {
    //     console.log('disable');
    //     chrome.action.disable(tabId);
    // }
// }) 