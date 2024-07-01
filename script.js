// async function fetchData() {
//     var today = new Date();
//     var dd = String(today.getDate()).padStart(2, '0');
//     var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
//     var yyyy = today.getFullYear();

//     today = mm + '/' + dd + '/' + yyyy;
//     const data = [
//         {
//             "date": today,
//             "areaName":"areaName",
//             "latestBy":"latestBy",
//             "deathNew":"deathNew",
//         }
//     ]
//     // const res=await fetch ("https://api.coronavirus.data.gov.uk/v1/data");
//     // const record=await res.json();
//     document.getElementById("date").innerHTML=data[0].date;
//     document.getElementById("areaName").innerHTML=data[0].areaName;
//     document.getElementById("latestBy").innerHTML=data[0].latestBy;
//     document.getElementById("deathNew").innerHTML=data[0].deathNew;
// }
// fetchData();

// -------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    //Click Button Start Limit Loop
    document.getElementById("btnStart").addEventListener("click", () => {
        let xpath = document.getElementById('xpath').value;
        let limitLoop = document.getElementById('limitLoop').value;
        let delayTime = document.getElementById('delayTime').value;
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
                type: "btnStart",
                DOM: document,
                xpath: xpath,
                limitLoop: limitLoop,
                delayTime: delayTime,
            })
        })
    });

    //Click Button Stop Limit Loop
    document.getElementById("btnStop").addEventListener("click", () => {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
                type: "btnStop"
            })
        })
    });

    //Click Button Start Infinity Loop
    document.getElementById("btnStartInfinityLoop").addEventListener("click", () => {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            let xpath = document.getElementById('xpath').value;
            let delayTime = document.getElementById('delayTime').value;
            chrome.tabs.sendMessage(tabs[0].id, {
                type: "startInfinityLoop",
                xpath: xpath,
                delayTime: delayTime,
            })
        })
    });

    //Click Button Stop Infinity Loop
    document.getElementById("btnStopInfinityLoop").addEventListener("click", () => {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
                type: "stopInfinityLoop"
            })
        })
    });

    document.getElementById("getXPath").addEventListener("click", () => {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
                type: "getXPath"
            })
        })
    })
})