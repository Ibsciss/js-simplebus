function chromeListener(callback) {
    return function chromeListenable(message, sender) {
        if (sender.id !== chrome.runtime.id) return; // Check if the message comes from our extension
        if (message.eventName && message.eventName === eventName) callback(message.data); //send to message subscriber
    };
}

function executeOnCurrentTab(executor) {
    chrome.tabs.query({ active: true, currentWindow: true, typeWindow: 'normal' }, function getCurrentTabId(currentTab) {
        executor(currentTab);
    });
}

function ChromiumBus() {}

ChromiumBus.prototype.subscribe = function subscribe(eventName, callback) {
    chrome.runtime.onMessage.addListener(chromeListener(callback));
};

ChromiumBus.prototype.publish = function publish(eventName, message) {

    var packetMessage = {
        eventName: eventName,
        data: message,
    };

    chrome.runtime.sendMessage(packetMessage);

    executeOnCurrentTab(function sendToCurrentTab(currentTab) {
        chrome.runtime.sendMessage(currentTab.id, packetMessage);
    });
};

module.exports = ChromiumBus;