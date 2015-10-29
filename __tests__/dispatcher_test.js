jest.dontMock('../dispatcher');
jest.dontMock('../simple-bus');
jest.dontMock('../simple-event');

var SimpleBus = require('../simple-bus');
var SimpleEvent = require('../simple-event');
var Dispatcher = require('../dispatcher');

describe('dispatcher', function() {
    var Driver = function(){};

    it('receives an array of drivers', function() {
        expect(new Dispatcher([Driver]).drivers).toContain(Driver)
    });

    it('publishes to all drivers', function() {

        var data = [];
        driverA = new SimpleBus();
        driverB = new SimpleBus();

        var dispatcher = new Dispatcher([
            driverA,
            driverB,
        ]);

        dispatcher.subscribe(new SimpleEvent('root.eventBB'), function (event) {
            data.push(event.payload);
        });

        dispatcher.publish(new SimpleEvent('root.eventBB', 'a message'));

        expect(data).toEqual([
            'a message',
            'a message',
        ]);
    });

});
