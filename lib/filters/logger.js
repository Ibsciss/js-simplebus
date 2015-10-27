var SimpleEvent = require('../simple-event');

function Logger(driver, writer) {
    this.writer = writer;
    this.driver = driver;
}

Logger.prototype.publish = function publish(event) {
    this.driver.publish.call(this.driver, event);
    this.writer(
        publishable(
            timestampable(
                cloneSimpleEvent(event)
            )
        )
    );
};

Logger.prototype.subscribe = function subscribe(event, callback) {
    this.driver.subscribe.call(this.driver, event, callback);
    this.writer(
        subscribable(
            timestampable(
                cloneSimpleEvent(event)
            ),
            callback
        )
    );
};

function cloneSimpleEvent(event) {
    return new SimpleEvent(event.name, event.payload);
}

function timestampable(event) {
    event.timestamp = Date.now();
    return event;
}

function publishable(event) {
    event.publishing = true;
    event.subscribing = false;
    return event;
}

function subscribable(event, callback) {
    event.publishing = false;
    event.subscribing = true;
    event.subscriber = callback;
    return event;
}

module.exports = Logger;