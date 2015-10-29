jest.dontMock('../../simple-bus');
jest.dontMock('../../simple-event');
jest.dontMock('../../filters/logger');

var log = require('loglevel');
var SimpleBus = require('../../simple-bus');
var SimpleEvent = require('../../simple-event');
var Logger = require('../../filters/logger');

describe('Logger', function () {

    beforeEach(function () {
        log.info.mockClear();
    });

    it('passes messages on', function () {
        var data = [];
        var eventDispatcher = new Logger(new SimpleBus(), log.info);
        eventDispatcher.subscribe(new SimpleEvent('root.event'), function (event) {
            data.push(event.payload);
        });
        eventDispatcher.publish(new SimpleEvent('root.event', 'a super message'));
        expect(data).toContain('a super message');
    });

    it('logs messages published and received', function () {
        var eventDispatcher = new SimpleBus(new Logger(new SimpleBus(), log.info));
        eventDispatcher.subscribe(new SimpleEvent('root.event'), function () {});
        eventDispatcher.publish(new SimpleEvent('root.event', 'a first message to log'));
        eventDispatcher.publish(new SimpleEvent('root.event', 'a second message to log'));
        expect(log.info).toBeCalled();
        expect(log.info.mock.calls.length).toBe(3);
    });

    it('logs events with timestamps', function () {
        var eventDispatcher = new SimpleBus(new Logger(new SimpleBus(), log.info));
        eventDispatcher.subscribe(new SimpleEvent('root.event'), function () {});
        eventDispatcher.publish(new SimpleEvent('root.event', 'a first message to log'));

        expect(typeof log.info.mock.calls[0][0].timestamp).toBe('number');
    });

    it('logs events with its way', function () {
        var eventDispatcher = new SimpleBus(new Logger(new SimpleBus(), log.info));
        eventDispatcher.subscribe(new SimpleEvent('root.event'), function () {});
        eventDispatcher.publish(new SimpleEvent('root.event', 'a first message to log'));

        // Subscribing first
        expect(log.info.mock.calls[1][0].publishing).toBeTruthy();
        expect(log.info.mock.calls[1][0].subscribing).toBeFalsy();
        // Publishing second
        expect(log.info.mock.calls[0][0].publishing).toBeFalsy();
        expect(log.info.mock.calls[0][0].subscribing).toBeTruthy();
    });

});
