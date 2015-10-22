jest.dontMock('../../lib/simple-bus');
jest.dontMock('../../lib/filters/logger');

var log = require('loglevel');
var SimpleBus = require('../../lib/simple-bus');
var Logger = require('../../lib/filters/logger');

describe('Logger', function () {
    it('passes messages on', function () {
        var data = [];
        var eventDispatcher = new Logger(new SimpleBus(), log.info);
        eventDispatcher.subscribe('root.event', data.push.bind(data));
        eventDispatcher.publish('root.event', 'a super message');
        expect(data).toContain('a super message');
    });

    it('logs plublished messages', function () {
        var eventDispatcher = new SimpleBus(new Logger(new SimpleBus(), log.info));
        eventDispatcher.subscribe('root.event', function () {});
        eventDispatcher.publish('root.event', 'a super message to log');
        expect(log.info).toBeCalled();
    });
});
