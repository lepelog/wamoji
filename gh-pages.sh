#!/bin/bash

cd build

git init
git add -A
git commit -m 'pages'

git push -f git@github.com:lepelog/wamoji.git master:pages
