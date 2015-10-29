function Dispatcher(drivers) {
    this.drivers = drivers;
}

Dispatcher.prototype.publish = function publish(event) {
    this.drivers.forEach(function (item) {
        item.publish(event);
    });
};

Dispatcher.prototype.subscribe = function subscribe(event, callback) {
    this.drivers.forEach(function (item) {
        item.subscribe(event, callback);
    });
};

module.exports = Dispatcher;