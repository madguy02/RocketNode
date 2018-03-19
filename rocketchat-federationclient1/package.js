Package.describe({
	name: 'rocketchat:federationclient',
	version: '0.0.1',
	summary: 'Federation Client',
	git: ''
});

Package.onUse(function(api) {
	api.use([
		'ecmascript',
		'rocketchat:lib'
		 
	]);


	//Register v1 helpers
	api.addFiles('client.js');
	
	
});

Npm.depends({
	
	net: '1.0.2'
});
