function Logger(driver, writer) {
    this.writer = writer;
    this.driver = driver;
}

Logger.prototype.publish = function publish(event) {
    this.writer(event);
    this.driver.publish.call(this.driver, event);
};

Logger.prototype.subscribe = function subscribe(event, callback) {
    this.writer(event);
    this.driver.subscribe.call(this.driver, event);
};

module.exports = Logger;
