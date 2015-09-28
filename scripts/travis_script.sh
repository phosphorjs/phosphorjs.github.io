#!/bin/bash
set -e

mkdir build
cp -r index-redux/* build/.

cd examples
for D in *; do
   cd $D
   npm install && npm run build
   cd ..
done
cd ..
cp -r examples build
