function ChromiumBus() {}

ChromiumBus.prototype.subscribe = function subscribe(event, callback) {

    function chromeListener(callback) {
        return function chromeListenable(message, sender) {
            if (sender.id !== chrome.runtime.id) return; // Check if the message comes from our extension
            if (message.name && message.name === event.name) callback(message.payload); //send to message subscriber
        };
    }

    chrome.runtime.onMessage.addListener(chromeListener(callback));
};

ChromiumBus.prototype.publish = function publish(event) {

    function executeOnCurrentTab(executor) {
        chrome.tabs.query({ active: true, currentWindow: true, typeWindow: 'normal' }, function getCurrentTabId(currentTab) {
            executor(currentTab);
        });
    }

    chrome.runtime.sendMessage(event);

    executeOnCurrentTab(function sendToCurrentTab(currentTab) {
        chrome.runtime.sendMessage(currentTab.id, event);
    });
};

module.exports = ChromiumBus;
