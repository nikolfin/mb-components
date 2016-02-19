(function() {

    var openCount = 0;

    chrome.extension.onConnect.addListener(function (port) {

        // обращение к контенту
        port.onMessage.addListener(function (message) {
            sendDataToContent(message);
        });

        // обращение к devtools
        chrome.runtime.onMessage.addListener(function (message) {
            port.postMessage(message);
        });


        // проверка на открытие / закрытие devtools
        if (port.name === 'fromDevtools') {
            if (openCount == 0) {
                sendDataToContent('activate');
            }
            openCount++;

            port.onDisconnect.addListener(function(port) {
                openCount--;
                if (openCount === 0) {
                    sendDataToContent('deactivate');
                }
            });
        }
    });


    function sendDataToContent(data) {
        chrome.tabs.query({}, function (tabs) {
            for (tab in tabs) {
                chrome.tabs.sendMessage(tabs[tab].id, data);
            }
        });
    }
    

    // chrome.runtime.onConnect.addListener(function (port) {
    //     if (port.name === "devtools-page") {
    //         alert("DevTools window opening.");
    //     }
    //     chrome.extension.onMessage.addListener(function (message) {
    //         port.postMessage(message);
    //     });
    // });


}());