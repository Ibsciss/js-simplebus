jest.dontMock('../simple-bus');
jest.dontMock('../simple-event');

var SimpleEvent = require('../simple-event');

function AddExclamationMarkTransformer(driver) {
    this.driver = driver;
}

AddExclamationMarkTransformer.prototype.subscribe = function(event, callback) {
    this.driver.subscribe(event, callback);
};

AddExclamationMarkTransformer.prototype.publish = function(event) {
    this.driver.publish(new SimpleEvent(event.name, event.payload + '!'));
};

var SimpleBus = require('../simple-bus');


describe('message-distribution-center', function () {

  describe('publish', function () {
    it('send events', function () {
        var data = [];
        eventDispatcher = new SimpleBus();
        eventDispatcher.subscribe(new SimpleEvent('root.event'), function (event) {
            data.push(event.payload);
        });
        eventDispatcher.publish(new SimpleEvent('root.event', 'a message'));

        expect(data).toContain('a message');
    });

    it('send event to multiple recipients', function () {
        var data = [];
        eventDispatcher = new SimpleBus();

        eventDispatcher.subscribe(new SimpleEvent('root.event'), function (event) {
            data.push(event.payload);
        });
        eventDispatcher.subscribe(new SimpleEvent('root.event'), function (event) {
            data.push(event.payload + '!');
        });
        eventDispatcher.publish(new SimpleEvent('root.event', 'a message'));

        expect(data).toContain('a message', 'a message!');
    });

    it('send different events to recipient', function () {
        var dataA = [];
        var dataB = [];
        eventDispatcher = new SimpleBus();
        eventDispatcher.subscribe(new SimpleEvent('root.eventA'), function (event) {
            dataA.push(event.payload);
       });
        eventDispatcher.subscribe(new SimpleEvent('root.eventB'), function (event) {
            dataB.push(event.payload);
        });
        eventDispatcher.publish(new SimpleEvent('root.eventA', 'a AAA message'));
        eventDispatcher.publish(new SimpleEvent('root.eventB', 'a BBB message'));

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

            eventDispatcher.subscribe(new SimpleEvent('root.event'), function (event) {
                data.push(event.payload);
            });
            eventDispatcher.publish(new SimpleEvent('root.event', 'a message'));

            expect(data).toContain('a message!');
        });
    });

});
