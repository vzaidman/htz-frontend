#!/bin/bash



function npmSettings(){
  echo "Configure .npmrc"
  echo 'registry=https://nexus-ng.themarker.com/repository/npm-group/
email=devops@themarker.com
' >.npmrc
  echo 'registry "https://nexus-ng.themarker.com/repository/npm-group/"
' >.yarnrc
}


npmSettings || echo "fail"
