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
    document.getElementById("btnStart").addEventListener("click", () => {
        let xpath = document.getElementById('idElement').value;
        let limitLoop = document.getElementById('limitLoop').value;
        let delayTime = document.getElementById('delayTime').value;
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
                type: "btnStart",
                DOM: document,
                // idElement: idElement,
                xpath: xpath,
                limitLoop: limitLoop,
                delayTime: delayTime,
            })
        })
    });

    document.getElementById("btnStop").addEventListener("click", () => {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
                type: "btnStop"
            })
        })
    });

    document.getElementById("btnStartInfinityLoop").addEventListener("click", () => {
        let xpath = document.getElementById('idElement').value;
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            let delayTime = document.getElementById('delayTime').value;
            chrome.tabs.sendMessage(tabs[0].id, {
                type: "startInfinityLoop",
                // idElement: idElement,
                xpath: xpath,
                delayTime: delayTime,
            })
        })
    });

    document.getElementById("btnStopInfinityLoop").addEventListener("click", () => {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
                type: "stopInfinityLoop"
            })
        })
    });
})

function login() {
    try {
    document.getElementById("usernm").value ='admin';
    document.getElementById("passwd").value = 'hsdadmin2022';
    document.getElementById("btn-login").click()
    } catch (e) {
        alert(e);
    }
}