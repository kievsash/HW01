var framework = (function(){
					
					
					var modules = {};
					var routes = {};

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
						this.update = function(event) {
							console.log('Updating body element')
							bodyElement.load(routes[location.hash]);
						}
					}


					function run() {
						var coreElement  = $("[framework-router]");
						var observer = new Observer("hashchange");
						var routeUpdater = new RouteUpdater(coreElement);
						observer.subscribe(routeUpdater.update);
						// console.log('Modules:', modules);
						// console.log('Routes:', routes);
					}

					function loadModule(filename){
						console.log('Connecting '+'js/' + filename)
        				$.getScript('js/' + filename);
					}

					function addRoute(routeObj) {
						console.log('Adding route', routeObj)
						if (routeObj.tag && routeObj.template) {
							routes[routeObj.tag] = routeObj.template;
						}
						return this;
					}
					function module(name, deps) {
						if (name) {
							if (modules[name] === undefined) {
								console.log('module ' +name+' does not exists');
								modules[name]={
									addRoute: addRoute
								}
							};
							if (deps.length > 0 ) {
								console.log('Conecting modules')
								deps.forEach(function(mod) {
									setTimeout(loadModule(mod+'.js'), 1);
								});
							}
							console.log('Created module object:', modules[name]);
							return modules[name];
						}
					}
				return {
					module: module,
					run: run
				}
				})()