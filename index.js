/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS contributors.
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
var path = require('path');

var Handlebars = require('handlebars');
var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var templates = require('metalsmith-templates');
var collections = require('metalsmith-collections');


Handlebars.registerHelper('ifeq', function (v1, v2, options) {
  return v1 === v2 ? options.fn(this) : options.inverse(this);
});


function makePath(fname, ext) {
  var base = path.basename(fname, ext);
  return base + '.html';
}


function makeTitle(fname, ext) {
  var base = path.basename(fname, ext);
  var parts = base.split('-').map(function (part) {
    return part.charAt(0).toUpperCase() + part.slice(1);
  });
  return parts.join(' ');
}


function configureFiles(files, metalsmith, done) {
  for (var fname in files) {
    var ext = path.extname(fname);
    if (ext == '.md') {
      var file = files[fname];
      file.ext = ext;
      file.root = '/';
      file.template = 'page.hbt';
      file.path = makePath(fname, ext);
      file.title = makeTitle(fname, ext);
      file.nav_list = file.path !== 'index.html';
    }
  }
  done();
}


Metalsmith(__dirname)
  .use(collections({ pages: { pattern: '*.md', sortBy: 'title' } }))
  .use(configureFiles)
  .use(markdown())
  .use(templates('handlebars'))
  .build(function (err) {
    if (err) throw err;
  });
