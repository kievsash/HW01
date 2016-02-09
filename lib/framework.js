var framework = (function(){
					
					
					var modules = {};
					var routes = {};
					var defaultRoute;

					function Observer(GlobalEvent, context, EventBus) {
						var observers = [];
				
						this.notify = function() {
							console.log('hash was changes to ' + location.hash);
							observers.forEach(function(subscriber){
								subscriber(GlobalEvent);
							});
						}
						this.addObserver = function(observ) {
							observers.push(observ);
						}
						context.addEventListener(GlobalEvent, this.notify, false);						
						this.addObserver(EventBus.publish);
					}

					function EventBus() {
						var listeners = {};
				
						this.publish = function(channel, message) {
							if (listeners[channel]) {
								listeners[channel].forEach(function(subscriber){
									subscriber(message);
								});
							} else {
								console.log('Trying to publish to unexisting channel ' + channel);
							}	
						}
						this.subscribe = function(channel, listener) {
							if (!listeners[channel]) { 
								listeners[channel] = [];
								console.log('Created channel ' + channel);
							}
							listeners[channel].push(listener);
						}
					}



					function RouteUpdater(coreElement) {
						var bodyElement = coreElement.children(".panel-body");
						var commands = [];
						this.undo = function(){
							console.log('undoing');
							commands.pop();
							if (commands.length > 0) {
								location.hash = commands[commands.length-1];
								commands.pop();
							} else {
								alert('Undo is empty');
							}
						}
						this.update = function(event) {
							commands.push(location.hash);
							bodyElement.load(routes[location.hash]);
						}
					}


					function run() {
						var coreElement  = $("[framework-router]");
						var undoElement = coreElement.find("[undo]");
						var eventBus = new EventBus();
						var observeHashTagChange = new Observer("hashchange", window, eventBus);
						var observeUndoClick = new Observer("click", undoElement[0], eventBus);

						var routeUpdater = new RouteUpdater(coreElement);
						if (!location.hash && defaultRoute !== undefined) {
							location.hash = defaultRoute;
						} else {
							routeUpdater.update(location.hash);
						}
						eventBus.subscribe("hashchange", routeUpdater.update);
						eventBus.subscribe("click", routeUpdater.undo);
					}

					function loadModule(filename){
        				$.getScript('js/' + filename);
					}

					function addRoute(routeObj) {
						console.log('Adding route', routeObj)
						if (routeObj.tag && routeObj.template) {
							routes[routeObj.tag] = routeObj.template;
						}
						if (routeObj.default) { defaultRoute = routeObj.tag;}
						return this;
					}
					function module(name, deps) {
						if (name) {
							if (modules[name] === undefined) {
								modules[name]={
									addRoute: addRoute
								}
							};
							if (deps.length > 0 ) {
								deps.forEach(function(mod) {
									loadModule(mod+'.js');
								});
							}
							return modules[name];
						}
					}
				return {
					module: module,
					run: run,
				}
				})()