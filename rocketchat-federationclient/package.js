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
	api.addFiles('client/federation.html', 'client');
	api.addFiles('server/client.js','server');
	api.addFiles('client/fedmsgserver.js','server');
	api.addFiles('client/fedmsgclient.js','client');
	api.addFiles('client/style.css','client');
	
	
});

Npm.depends({
	
	net: '1.0.2'
});
