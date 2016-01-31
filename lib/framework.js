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
						console.log('coreElement', coreElement);
						var bodyElement = coreElement.children(".panel-body");
						console.log('bodyElement:', bodyElement);
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
						console.log('Modules:', modules);
						console.log('Routes:', routes);
					}

					function loadModule(filename){
						var fileref=document.createElement('script');
				        fileref.setAttribute("type","text/javascript");
        				fileref.setAttribute("src", filename);
					}

					function addRoute(routeObj) {
						if (routeObj.tag && routeObj.template) {
							routes[routeObj.tag] = routeObj.template;
						}
						return this;
					}
					function module(name, deps) {
						if (name) {
							if (modules[name] === undefined) {
								modules[name]={
									addRoute: addRoute
								}	
							}
							if (deps) {
								deps.forEach(function(mod) {
									console.log('Loading module '+mod+'.js');
									setTimeout(loadModule(mod+'.js'), 1);
								});
							}
							console.log('Created module object:', modules[name]);
							return modules[name];
						}
					}
				console.log('modules', modules)
				console.log('routes', routes)
				return {
					module: module,
					run: run
				}
				})()