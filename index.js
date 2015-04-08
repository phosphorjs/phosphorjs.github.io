var Metalsmith  = require('metalsmith'),
    markdown    = require('metalsmith-markdown'),
    templates   = require('metalsmith-templates'),
    collections = require('metalsmith-collections'),
    permalinks  = require('metalsmith-permalinks'),
    Handlebars  = require('handlebars'),
    fs          = require('fs');

var ext = require('path').extname


Handlebars.registerHelper('ifCond', function(v1, v2, options) {
  if(v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});


default_log = function(files,x, done){
    for(var file in files){
        if(!files[file].title){
            files[file]._title = file;
        }
    }
    done()
}
default_title = function(files, metalsmith, done){
    for(var file in files){
        if(ext(file)=='.md'){
            files[file].ext = ext(file)
            files[file].title = file.split('/').slice(-1)[0].split('.')[0].replace('-',' ');
        }
    }
    done()
}

default_template = function(files, metalsmith, done){
    for(var file in files){
        if((files[file]||{}).ext=='.md'){
            files[file].template = 'page.hbt';
        }
    }
    done()
}

Metalsmith(__dirname)
    .clean(false)
    .use(collections({
        pages: {
            pattern: '*.md',
            sortBy: 'title',
            //reverse: true
        }
    }))
    //.use(default_log)
    .use(default_title)
    .use(markdown())
    .use(default_template)
    .use(permalinks({
        //pattern: ':collection/:title'
        pattern: '/:title'
    }))
    .use(templates('handlebars'))
    .destination('./build')
    .build()
