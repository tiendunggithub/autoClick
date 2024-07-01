chrome.action.disable();

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status == "complete" && tab.url != undefined) {
        console.log(tab.url);
        if (tab.url.indexOf('1900') != -1) {
            console.log('enable');
            chrome.action.enable(tabId);
            console.log("background:", chrome.cookies);
            
            // const domain = 'http://localhost:1900'
            // chrome.cookies.get({url: domain, name: "test"}, function (cookie) {
            //     alert(cookie.value)
            // })
        }
    } else {
        console.log('disable');
        chrome.action.disable(tabId);
    }
})