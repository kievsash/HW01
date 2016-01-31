
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

framework.run();
