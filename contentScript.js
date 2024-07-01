(() => {
    var limitLoopVG = 100;
    var delayTimeVG = 300; //Milliseconds - 1000 = 1 second
    var timeoutLst = [];
    var timeout;
    var counter = 0;
    var xPathRes;

    var getXPathFlg = false;

    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        try {
            delayTimeVG = obj.delayTime
            if(obj.limitLoop) limitLoopVG = obj.limitLoop
            // xPathRes = document.evaluate(obj.xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            if (obj.type == 'btnStart') {
                console.clear();
                console.log('btnStart click')
                stopLoop();
                startLimitLoop();
            }
            if (obj.type == 'btnStop' || obj.type == 'stopInfinityLoop') {
                console.log('Stop Loop')
                stopLoop();
            }
            if (obj.type == 'startInfinityLoop') {
                console.clear();
                console.log('startInfinityLoop click')
                counter = 0;
                stopLoop();
                startInfinityLoop();
            }
            if (obj.type == 'getXPath') {
                getXPathFlg = true;
                document.body.style.cursor = 'pointer';
            }
        } catch (e) {
            console.error(e)
        }
    })

    function startLimitLoop() {
        try {
            if(!checkXPath(xPathRes)) {
                console.log('singleNodeValue is null');
                return;
            }
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
            console.error(e);
        }
    }

    function stopLoop() {
        clearTimeout(timeout);
        timeoutLst.forEach(function(timer) {
            clearTimeout(timer);
        });
    }

    function startInfinityLoop() {
        if(!checkXPath(xPathRes)) {
            console.log('singleNodeValue is null');
            return;
        }
        xPathRes.singleNodeValue.click();
        counter++;
        console.log(counter);
        timeout = setTimeout(startInfinityLoop, delayTimeVG);
    }

    function checkXPath(xpath) {
        return xpath.singleNodeValue ? true : false
    }

    document.body.addEventListener('click', (e) => {
        if(!getXPathFlg) return;
        document.body.style.cursor = 'default';
        let xpath = getXPath(e.target)
        xPathRes = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        getXPathFlg = false;

        let html = `<span>Get XPath Success</span>`
        var div = document.createElement("div");
        div.setAttribute("id", "toastGetXPath");
        div.setAttribute("class", "toastGetXPath");
        document.body.appendChild(div);
        div.innerHTML = html;

        setTimeout(() => {
            document.getElementById('toastGetXPath').style.display = 'none';
        }, 2000)
    })

    function getXPath( element ) {
        var xpath = '';
        for ( ; element && element.nodeType == 1; element = element.parentNode ) {
            var id = $(element.parentNode).children(element.tagName).index(element) + 1;
            id > 1 ? (id = '[' + id + ']') : (id = '');
            xpath = '/' + element.tagName.toLowerCase() + id + xpath;
        }
        return xpath;
    }

})();