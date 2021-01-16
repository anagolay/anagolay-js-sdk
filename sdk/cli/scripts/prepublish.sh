#!/usr/bin/env bash
root=$(dirname $(dirname $(realpath $0)))
libDir="$root/lib"

packageJson="$root/package.json"
license="$root/LICENSE"
readme="$root/README.md"

echo "copying the $packageJson"
cp $packageJson $libDir

echo "copying the $readme"
cp $readme $libDir

echo "copying the $license"
cp $license $libDir
