# Usage

Compatible with ES5 / ES3 and CommonJS.

## Basic use 

```js
var dispatcher = new SimpleBus();

dispatcher.subscribe(new SimpleEvent('event_name', function subscriber(event) {
    console.log(event);
});

dispatcher.publish(new SimpleEvent('event_name', 'an event')); // will output "an event" in the console
```

## Driver

```js
dispatcher = new Dispatcher([new ChromiumDriver, new WindowDriver]);

dispatcher.subscribe(new SimpleEvent('event_name'), function subscriber(event) {
    console.log(event);
});

dispatcher.publish(new SimpleEvent('event_name', 'an event'));
```

## Logger

```js 
dispatcher = new Logger(new SimpleBus(), console.log.bind(console));

dispatcher.subscribe(new SimpleEvent('event_name'), function subscriber(event) {
    alert(event);
});

dispatcher.publish(new SimpleEvent('event_name', 'an event'));
```
