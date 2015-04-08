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
$ mv build/.git ./.foo
$ node index.js
$ mv ./.foo build/.git
$ cd build
$ git add *
$ # place .gitignore bqck
$ git commit -am'build docs'
$ git push origin gh-pages:gh-pages
```

