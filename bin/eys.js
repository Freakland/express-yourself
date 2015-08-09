#!/usr/bin/env node

var args = require('minimist')(process.argv.slice(2));

if (args.h) {
  var usage = '\nWonkajs - Write javascript webapps right, easy and fast.\n\n'
    + '{usage} wonkajs subcommand [options]\n\n'
    + 'Options:\n'
    + '   -v,   --version   Outputs the version of wonka js that you have installed\n'
    + '   -h,   --help      Outputs help information\n\n'
    + 'Available subcommands:\n'
    + '   p,    project [options]   Create new project\n'
    + '\n'
    + 'Project command options:\n'
    + '   description     <string>\n';

  console.info(usage);
  process.exit(0);
}

var styleguides = {
  'rails': require('../lib/ruby-on-rails.js'),
  'rb': require('../lib/ruby-on-rails.js'),
  'ruby-on-rails': require('../lib/ruby-on-rails.js')
};

styleguides[args.styleguide].initialize(args);
