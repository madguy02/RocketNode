Package.describe({
	name: 'rocketchat:federationclient',
	version: '0.0.1',
	summary: 'Federation Client',
	git: ''
});

Package.onUse(function(api) {
	api.use([
		'ecmascript',
		'rocketchat:lib',
		'mongo'
		 
	]);


	//Register v1 helpers
	api.use('templating', 'client');
	api.addFiles('federation.html', 'client');
	api.addFiles('client.js','server');
	api.addFiles('fedmsgserver.js','server');
	api.addFiles('fedmsgclient.js','client');
	api.addFiles('style.css','client');
	
	
});

Npm.depends({
	
	net: '1.0.2'
});
