var Metalsmith  = require('metalsmith'),
    markdown    = require('metalsmith-markdown'),
    templates   = require('metalsmith-templates'),
    collections = require('metalsmith-collections'),
    permalinks  = require('metalsmith-permalinks'),
    Handlebars  = require('handlebars'),
    fs          = require('fs');

var root = process.argv[2]||'/'

console.log('will use root', root)

var ext = require('path').extname


Handlebars.registerHelper('ifCond', function(v1, v2, options) {
  if(v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

var default_drop_index_from_collections = function(files, metalsmith, done){
    mdtp = metalsmith.metadata()['collections']['pages'];
    for(var i in mdtp){
        if(mdtp[i].path == 'index'){
            mdtp[i].list_index = false
        } else {
            mdtp[i].list_index = true
        }
    }

    done();
}

default_log = function(files, metalsmith, done){
    mdtp = metalsmith.metadata()['collections']['pages'];
    //console.log(mdtp.map(function(x,i){return x}))
    done()
}

default_index = function(files,x, done){
    files['index.html'] = files['index/index.html'];
    delete files['index/index.html']
    done();
}

default_title = function(files, metalsmith, done){
    for(var file in files){
        if(ext(file)=='.md'){
            files[file].ext = ext(file)
            files[file].title = capitalizeFirstLetter(file.split('/').slice(-1)[0].split('.')[0].replace('-',' '));
            files[file].root = root;
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
    .use(default_title)
    .use(markdown())
    .use(default_template)
    .use(permalinks({
        //pattern: ':collection/:title'
        pattern: ':title'
    }))
    .use(default_log)
    .use(default_drop_index_from_collections)
    .use(templates('handlebars'))
    .destination('./build')
    .use(default_index)
    .build(function(err) {
      if (err) throw err;
    })
