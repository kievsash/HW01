# HW01 - Framework

## What is it for?
This is handy framework for creating routed element (very similar to ng-router).

## What patterns are user here?
1. Observer (Observer constructor)
2. Pub-Sub (EventBux constructor)
3. Partially command pattern (Undo functionality) (RouteUpdater constructor).

## How to use framework?
1. Create module and add routes there. You can include other modules as well
```
framework.module('module1', ['app.module2'])
.addRoute({
	tag: "#tag1",
	template: '../templates/template1.html',
	default: 1
})
.addRoute({
	tag: "#tag2",
	template: '../templates/template2.html'
});

framework.run(); // to start it working - in main module

```
2. Add jquery CDN, framework.js and module file script tags to index.html before closing body tag
```
<script src="https://code.jquery.com/jquery-2.2.0.min.js" ></script>
<script src="lib/framework.js"></script>	
<script src="js/app.module1.js"></script>	
</body>
```

3. Open index.html through http server.

## Demo Installation
> git clone ...
> npm i 
Actualy you just need to install 'static-server' package to run simple http server.

> cd HW01

Then start http-server:
>$ static-server
>* Static server successfully started.
>* Serving files at: http://localhost:9080
>* Press Ctrl+C to shutdown.

Then just open http://localhost:9080 in browser to see index.html.