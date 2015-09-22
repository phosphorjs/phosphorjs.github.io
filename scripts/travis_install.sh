#!/bin/bash
git checkout source
npm install

cd examples
for D in *; do
   cd $D
   npm install && npm run build
   cd ..
done
