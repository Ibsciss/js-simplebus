function SimpleBus(driver) {
    this.subscribers = {};

    if (driver) {
      if (driver.publish && typeof driver.publish === 'function') this.publish = driver.publish.bind(driver);
      if (driver.subscribe && typeof driver.subscribe === 'function') this.subscribe = driver.subscribe.bind(driver);
    }
}

SimpleBus.prototype.subscribe = function subscribe(eventName, callback) {
    this.subscribers[eventName] = this.subscribers[eventName] || [];
    this.subscribers[eventName].push(callback);
};

SimpleBus.prototype.publish = function publish(eventName, message) {
    this.subscribers[eventName].forEach(function (subscriber) {
        subscriber(message);
    });
};

module.exports = SimpleBus;