#!/bin/bash
node index.js
git clone https://github.com/blink1073/todomvc-demo
cd todomvc-demo
npm install
npm run build
cp LICENSE example
mkdir ../build/todo-example
cp -r example ../build/todo-example
