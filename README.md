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
2. Add bootstrap css lib.
```
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
```

3. Add jquery CDN, framework.js and module file script tags to index.html before closing body tag
```
<script src="https://code.jquery.com/jquery-2.2.0.min.js" ></script>
<script src="lib/framework.js"></script>	
<script src="js/app.module1.js"></script>	
</body>
```

4. Add html markup for routing, for example:
```
	<div class="panel panel-default" framework-router>
		<div class="panel-heading" >
		 	<a href="#tag1" class="btn btn-primary">Tag1</a>
		 	<a href="#tag2" class="btn btn-primary">Tag2</a>
		 	<a href="#tag3" class="btn btn-primary">Tag3</a>
		 	<a href="javascript:void(0)" class="btn" undo>Undo</a>
		</div>
		<div class="panel-body"></div>
	</div>
```
framework-router - set parent block 
.panel-body - indicates where templates should be loaded to
#tag1, #tag2... - should correspond to respective tags in routes definition.

5. Open index.html through http server.

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