(() => {
    var limitLoopVG = 100;
    var delayTimeVG = 300; //Milliseconds - 1000 = 1 second
    var timeoutLst = [];
    // var idElementVG = '';
    var timeout;
    var counter = 0;
    var xPathRes;

    chrome.runtime.onMessage.addListener((obj, sender, response) => {
            // idElementVG = obj.idElement
            delayTimeVG = obj.delayTime
            if(obj.limitLoop) limitLoopVG = obj.limitLoop
            
            xPathRes = document.evaluate (obj.xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            // xPathRes = document.evaluate ('//*[@id="content"]/div[2]/div[1]/div[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        if (obj.type == 'btnStart') {
            console.clear();
            console.log('btnStart click')
            stopLoop();
            autoClick();
        }
        if (obj.type == 'btnStop') {
            console.log('btnStop click')
            stopLoop();
        }
        if (obj.type == 'startInfinityLoop') {
            console.log('startInfinityLoop click')
            startInfinityLoop();
        }
        if (obj.type == 'stopInfinityLoop') {
            console.log('stopInfinityLoop click')
            stopInfinityLoop();
        }
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

    function autoClick() {
        try {
            console.log('start loop')
            for(let i = 0; i < limitLoopVG; i++) {
                timeoutLst.push(setTimeout(function() {
                    // document.getElementById(idElementVG).click();
                    xPathRes.singleNodeValue.click();
                    let clickCount = i + 1;
                    console.log('click'+clickCount)
                    if(i == limitLoopVG - 1) {
                        console.log('end loop')
                    }
                }, delayTimeVG * i))
            };
        } catch (e) {
            alert(e);
        }
    }

    function stopLoop() {
        timeoutLst.forEach(function(timer) {
            clearTimeout(timer);
        });
    }

    function startInfinityLoop() {
        // document.getElementById(idElementVG).click();
        xPathRes.singleNodeValue.click();
        counter++;
        console.log(counter);
        timeout = setTimeout(startInfinityLoop, delayTimeVG);
    }

    function stopInfinityLoop() {
        clearTimeout(timeout);
    }
})();