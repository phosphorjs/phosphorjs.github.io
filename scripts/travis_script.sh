#!/bin/bash
node index.js
cd todomvc-demo
npm install
npm run build
cp -r example ../build/todo-example
