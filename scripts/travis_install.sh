#!/bin/bash
git checkout source
npm install
git clone https://github.com/blink1073/todomvc-demo
cd todomvc-demo
npm install
npm run build
cp LICENSE example
cp -r example ../build/todo-example
