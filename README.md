# Usage

Compatible with ES5 / ES3

## Basic use 

```js
dispatcher = new SimpleBus();

dispatcher.subscribe('event_name', (event) => {
    console.log(event);
});

dispatcher.publish('event_name', 'an event'); //will output "an event" in the console
```

## Driver

```js
dispatcher = new Dispatcher([new ChromiumDriver, new WindowDriver]);

dispatcher.subscribe('event_name', (event) => {
    console.log(event);
});

dispatcher.publish('event_name', 'an event'); //will output "and event" in the console
```

## Logger

```js 
dispatcher = new Logger( new SimpleBus(), console.log);

dispatcher.subscribe('event_name', (event) => {
    alert(event);
});

dispatcher.publish('event_name', 'an event'); //will output 
```