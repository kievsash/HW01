console.log('Started module');
console.log(framework);
framework.module('module2', [])
.addRoute({
	tag: "#tag3",
	template: '../templates/template3.html'
});
