# PhosphorJS docs webside

https://phosphorjs.github.io

(wip: http://carreau.github.io/phosphor-website/about/) 

# Install / Publish

typically lcally `$PREFIX='/build/'`

```
$ npm install
$ git clone https://github.com/Carreau/phosphor-website.git build
$ cd build 
$ git checkout -b gh-pages origin/gh-pages
$ cd .. 
$ node index.js $PREFIX
$ cd build
$ git add *
$ git commit -am'build docs'
$ git push origin gh-pages:gh-pages
```

