jest.dontMock('../lib/drivers/chromium-bus');

var ChromiumBus = require('../lib/drivers/chromium-bus')

var chrome = {
  runtime: {
    sendMessage: null,
  },
  tabs: {
    query: null,
  },
  id: 'chromiumbusid',
};

describe('ChromiumBus', function () {

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
    });

    describe('subscribe', function () {
        
    });

});