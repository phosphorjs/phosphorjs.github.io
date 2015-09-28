#!/bin/bash
set -e

for D in $( ls -d */ | grep -v node_modules ); do
	tsc --project $D && browserify -t browserify-css $D/index.js -o $D/bundle.js
done
