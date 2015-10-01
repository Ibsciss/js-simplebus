jest.dontMock('../lib/simple-bus');

function AddExclamationMarkTransformer(driver) {
    this.driver = driver;
}

AddExclamationMarkTransformer.prototype.subscribe = function(eventName, callback) {
    this.driver.subscribe(eventName, callback);
};

AddExclamationMarkTransformer.prototype.publish = function(eventName, message) {
    this.driver.publish(eventName, message + '!');
};

var SimpleBus = require('../lib/simple-bus');


describe('message-distribution-center', function () {

  describe('publish', function () {
    it('send events', function () {
        var data = [];
        eventDispatcher = new SimpleBus();
        eventDispatcher.subscribe('root.event', function (msg) {
            data.push(msg);
        });
        eventDispatcher.publish('root.event', 'a message');

        expect(data).toContain('a message');
    });

    it('send event to multiple recipients', function () {
        var data = [];
        eventDispatcher = new SimpleBus();
        eventDispatcher.subscribe('root.event', function (msg) {
            data.push(msg);
        });
        eventDispatcher.subscribe('root.event', function (msg) {
            data.push(msg + '!');
        });
        eventDispatcher.publish('root.event', 'a message');

        expect(data).toContain('a message', 'a message!');
    });

    it('send different events to recipient', function () {
        var dataA = [];
        var dataB = [];
        eventDispatcher = new SimpleBus();
        eventDispatcher.subscribe('root.eventA', function (msg) {
            dataA.push(msg);
        });
        eventDispatcher.subscribe('root.eventB', function (msg) {
            dataB.push(msg);
        });
        eventDispatcher.publish('root.eventA', 'a AAA message');
        eventDispatcher.publish('root.eventB', 'a BBB message');

        expect(dataA).toContain('a AAA message');
        expect(dataA).not.toContain('a BBB message');
        expect(dataB).toContain('a BBB message');
        expect(dataB).not.toContain('a AAA message');
    });
  });

    describe('drivers composition', function () {
        it('use the driver if specified', function () {
            var data = [];
            eventDispatcher = new SimpleBus( new AddExclamationMarkTransformer( new SimpleBus()) );

            eventDispatcher.subscribe('root.event', function (msg) {
                data.push(msg);
            });
            eventDispatcher.publish('root.event', 'a message');

            expect(data).toContain('a message!');
        });
    });

});