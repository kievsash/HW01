framework.module('module1')
.addRoute({
	tag: "#tag1",
	template: '../templates/template1.html'
})
.addRoute({
	tag: "#tag2",
	template: '../templates/template2.html'
});

framework.run();
