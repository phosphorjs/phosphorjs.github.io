# PhosphorJS docs webside

https://phosphorjs.github.io

(wip: http://carreau.github.io/phosphor-website/about/) 

# Install / Publish

```
$ npm install
$ git clone https://github.com/Carreau/phosphor-website.git build
$ cd build 
$ git checkout -b gh-pages origin/gh-pages
$ cd .. 
$ # node index will destroy .git, save it
$ #same for gitignore
$ node index.js
$ cd build
$ git add *
$ git commit -am'build docs'
$ git push origin gh-pages:gh-pages
```

