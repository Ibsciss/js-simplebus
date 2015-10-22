jest.dontMock('../lib/dispatcher');
jest.dontMock('../lib/simple-bus');
jest.dontMock('../lib/simple-event');

var SimpleBus = require('../lib/simple-bus');
var SimpleEvent = require('../lib/simple-event');
var Dispatcher = require('../lib/dispatcher');

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
