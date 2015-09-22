#!/bin/bash
set -e

node index.js

cd examples
for D in *; do
   cd $D
   npm install && npm run build
   cd ..
done
cd ..
cp -r examples build
