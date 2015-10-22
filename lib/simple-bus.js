function SimpleBus(driver) {
    this.subscribers = {};

    if (driver) {
      if (driver.publish && typeof driver.publish === 'function') this.publish = driver.publish.bind(driver);
      if (driver.subscribe && typeof driver.subscribe === 'function') this.subscribe = driver.subscribe.bind(driver);
    }
}

SimpleBus.prototype.subscribe = function subscribe(event, callback) {
    this.subscribers[event.name] = this.subscribers[event.name] || [];
    this.subscribers[event.name].push(callback);
};

SimpleBus.prototype.publish = function publish(event) {
    this.subscribers[event.name].forEach(function (subscriber) {
        subscriber(event);
    });
};

module.exports = SimpleBus;