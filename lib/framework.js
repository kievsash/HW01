var framework = (function(){
					
					
					var modules = {};
					var routes = {};
					var defaultRoute;

					function Observer(GlobalEvent) {
						var listeners = [];
				
						this.publish = function() {
							console.log('hash was changes to ' + location.hash);
							listeners.forEach(function(subscriber){
								subscriber(event);
							});
						}
						this.subscribe = function(listener) {
							listeners.push(listener);
						}
						window.addEventListener(GlobalEvent, this.publish, false);						
					}

					function RouteUpdater(coreElement) {
						var coreElement = coreElement;
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

						var observer = new Observer("hashchange");
						var routeUpdater = new RouteUpdater(coreElement);
						if (!location.hash && defaultRoute !== undefined) {
							location.hash = defaultRoute;
						} else {
							routeUpdater.update(location.hash);
						}
						observer.subscribe(routeUpdater.update);

						undoElement.on('click', routeUpdater.undo);

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