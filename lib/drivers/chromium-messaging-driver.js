function ChromiumMessagingDriver(driver) {
    if (driver) {
      if (driver.publish && typeof driver.publish === 'function') this.publish = driver.publish.bind(driver);
      if (driver.subscribe && typeof driver.subscribe === 'function') this.subscribe = driver.subscribe.bind(driver);
    }
}

ChromiumMessagingDriver.prototype.setContentScriptTabId = function setContentScriptTabId(tabId) {
    this._sendToTabId = tabId;
};

ChromiumMessagingDriver.prototype.subscribe = function subscribe(eventName, callback) {
    chrome.runtime.onMessage.addListener(function subscribeHandler(message, sender) {
        if (sender.id !== chrome.runtime.id) return;
        if (message.eventName && message.eventName === eventName) callback(message.data);
    });
};

ChromiumMessagingDriver.prototype.publish = function publish(eventName, message) {
    var message = {
        eventName: eventName,
        data: message,
    };
    if (this._sendToTabId) chrome.tabs.sendMessage(this._sendToTabId, message);
    else chrome.runtime.sendMessage(message);
};

module.exports = ChromiumMessagingDriver;
