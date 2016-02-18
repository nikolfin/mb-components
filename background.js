(function() {
    chrome.extension.onConnect.addListener(function (port) {

        // обращение к контенту
        port.onMessage.addListener(function (message) {
            chrome.tabs.query({}, function (tabs) {
                for (tab in tabs) {
                    chrome.tabs.sendMessage(tabs[tab].id, message);
                }
            });
        });

        // обращение к devtools
        chrome.extension.onMessage.addListener(function (message) {
            port.postMessage(message);
        });
    });
}());