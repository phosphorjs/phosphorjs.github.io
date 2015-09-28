#!/bin/bash
set -e

mkdir -p build

cp -r index-redux/* build/.

cd examples
npm run build
cd ..

mkdir -p build/examples
for D in $( ls -d examples/*/ | grep -v node_modules ); do
	cp -r $D ./build/$D
done
