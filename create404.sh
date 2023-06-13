#!/bin/bash

if [ -e ./docs/index.html ];
then 
 cp ./docs/index.html ./docs/404.html
fi