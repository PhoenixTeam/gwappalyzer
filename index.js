'use strict';

const
	path      = require('path'),
	spawn     = require('child_process').spawn,
	phantomjs = require('phantomjs-prebuilt');

exports.run = function(args, callback) {
	args.unshift(path.join(__dirname, 'driver.js'));

	var driver = spawn(phantomjs.path, args);
	var result = '';
	var error = null

	driver.stdout.on('data', (data) => result += data);
	driver.stderr.on('data', (data) => error += data);
	driver.stdout.on('end', () => callback((result.length <= 0) ? null : result), error);
}

if ( !module.parent ) {
	exports.run(process.argv.slice(2), function(stdout, stderr) {
		if ( stdout ) {
			process.stdout.write(stdout);
		}

		if ( stderr ) {
			process.stderr.write(stderr);
		}
	});
}
