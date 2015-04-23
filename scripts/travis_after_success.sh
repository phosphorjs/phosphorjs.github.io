#!/bin/bash
if [[ $TRAVIS_PULL_REQUEST == false && $TRAVIS_BRANCH == "source" ]]
then
    git config --global user.email "travis@travis-ci.com"
    git config --global user.name "Travis Bot"

    git clone https://github.com/phosphorjs/phosphorjs.github.io.git travis_docs_build
    cd travis_docs_build

    echo "https://${GHTOKEN}:@github.com" > .git/credentials
    git config credential.helper "store --file=.git/credentials"

    rm -rf ./*
    cp -r ../build/* ./.
    cp ../README_MASTER.md ./README.md
    git add -A
    git commit -m "autocommit docs"
    git push origin master
fi
