function FirefoxBus() {
    this.workers = [];
    this.busIdentifier = 'simplebus_messaging';
}

FirefoxBus.prototype.subscribe = function subscribe(event, callback) {

    function FirefoxListener(callback) {
        return function firefoxListenable(message) {
            if (message.name && message.name === event.name) callback(message.payload); //send to message subscriber
        };
    }

    if (self && self.port) self.port.on(this.busIdentifier, FirefoxListener(callback));
    this.forEachWorker(function onPortMessage(worker) {
        worker.port.on(this.busIdentifier, FirefoxListener(callback));
    });
};

FirefoxBus.prototype.publish = function publish(event) {
    if (self && self.port) self.port.emit(this.busIdentifier, event);
    this.forEachWorker(function emit(worker) {
        worker.emit(this.busIdentifier, event);
    });
};

FirefoxBus.prototype.forEachWorker = function forEachWorker(callback) {
    this.workers.forEach(callback.bind(this));
};

FirefoxBus.prototype.addWorker = function addWorker(worker) {
    function removeWorker(worker) {
        var index = this.workers.indexOf(worker);
        if (index !== -1) this.workers.splice(index, 1);
    }

    this.workers.push(worker);
    worker.on('detach', removeWorker.bind(this, worker));
};


module.exports = FirefoxBus;
