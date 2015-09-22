#!/bin/bash
git checkout source
npm install

cd src/examples
for D in *; do
   cd $D
   npm install && npm run build
   cd ..
done
