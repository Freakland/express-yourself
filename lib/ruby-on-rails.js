var filesystem = require('file-system'),
	mkdir = filesystem.mkdirSync,
	rmdir = filesystem.rmdirSync,
	writeFile = filesystem.writeFileSync,
	fs = require('fs'),
	_ = require('underscore');

var create_app_folder = function(opts) {
	mkdir('app');

	// Assets
	mkdir('app/assets');
	mkdir('app/assets/stylesheets');
	mkdir('app/assets/javascripts');
	mkdir('app/assets/images');
	mkdir('app/assets/fonts');

	// Utils
	mkdir('app/helpers');
	mkdir('app/workers');

	// MOVE
	mkdir('app/models');
	mkdir('app/operations');
	mkdir('app/views');
	mkdir('app/events');
}

var remove_default = function(opts) {
	rmdir('views');
	rmdir('routes');
	rmdir('public/images');
	rmdir('public/javascripts');
	rmdir('public/stylesheets');
}

var create_config = function(opts) {
	mkdir('config');

	var files = [
		'config/default.json',
		'config/development.json',
		'config/testing.json',
		'config/production.json'
	];

	_.each(files, function(file) {
		writeFile(file, JSON.stringify({}, null, 2));
	});
}

var writeGruntfile = function(opts) {
	writeFile('Gruntfile.js', fs.readFileSync(__dirname + '/../snippets/Gruntfile.js'));
}

var writeSnippets = function(opts) {
	fs.unlinkSync('app.js');
	writeFile('app.js', fs.readFileSync(__dirname + '/../snippets/app.js'));
	writeFile('app/events/default.js', fs.readFileSync(__dirname + '/../snippets/ruby-on-rails/events/default.js'));
	writeFile('app/operations/index.js', fs.readFileSync(__dirname + '/../snippets/ruby-on-rails/operations/index.js'));
	writeFile('app/views/index.jade', fs.readFileSync(__dirname + '/../snippets/ruby-on-rails/views/index.jade'));
	writeFile('app/views/error.jade', fs.readFileSync(__dirname + '/../snippets/ruby-on-rails/views/error.jade'));
	writeFile('app/views/layout.jade', fs.readFileSync(__dirname + '/../snippets/ruby-on-rails/views/layout.jade'));
}

var addDependencies = function(opts) {
	var pkg = JSON.parse(fs.readFileSync('package.json'));

	delete pkg.dependencies['serve-favicon'];
	pkg.dependencies['expressify'] = 'https://github.com/lastroom/expressify/archive/master.tar.gz';
	pkg['devDependencies'] = {
		nib: '1.1.0'
	};

	writeFile('package.json', JSON.stringify(pkg, null, 2));
}

module.exports.initialize = function(opts) {
	create_app_folder(opts);
	create_config(opts);
	try {
		remove_default(opts);
	} catch(e) {
	}
	writeGruntfile(opts);
	writeSnippets(opts);
	addDependencies(opts);
}
