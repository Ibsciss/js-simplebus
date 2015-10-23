var SimpleEvent = require('../simple-event');

function Logger(driver, writer) {
    this.writer = writer;
    this.driver = driver;
}

Logger.prototype.publish = function publish(event) {
    this.driver.publish.call(this.driver, event);
    this.writer(
        addPublishingMarkerTo(
            addTimestampTo(
                cloneSimpleEvent(event)
            )
        )
    );
};

Logger.prototype.subscribe = function subscribe(event, callback) {
    this.driver.subscribe.call(this.driver, event, callback);
    this.writer(
        addSubscribingMarkerTo(
            addTimestampTo(
                cloneSimpleEvent(event)
            )
        )
    );
};

function cloneSimpleEvent(event) {
    return new SimpleEvent(event.name, event.payload);
}

function addTimestampTo(event) {
    event.timestamp = Date.now();
    return event;
}

function addPublishingMarkerTo(event) {
    event.publishing = true;
    event.subscribing = false;
    return event;
}

function addSubscribingMarkerTo(event) {
    event.publishing = false;
    event.subscribing = true;
    return event;
}

module.exports = Logger;
