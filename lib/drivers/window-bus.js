function WindowBus(interlocutor, origin) {
    this.interlocutor = interlocutor;
    this.interlocutorOrigin = origin;
}

WindowBus.prototype.subscribe = function subscribe(event, callback) {

    function windowListener(callback, interlocutorOrigin) {
        return function windowListenable(message) {
            if (message.origin === interlocutorOrigin && message.data) {
                if (message.data.name === event.name) callback(message.data);
            }
        }
    }

    window.addEventListener('message', windowListener(callback, this.interlocutorOrigin), false);
};

WindowBus.prototype.publish = function publish(event) {
    this.interlocutor.postMessage(event, this.interlocutorOrigin);
};

module.exports = WindowBus;
