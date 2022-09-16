#!/usr/bin/env bash
set -x

project_dir=$PWD
project_name=$(cat "$PWD"/package.json | json name)
project_version=$(cat "$PWD"/package.json | json version)
temp_dir=/tmp/$project_name

current_git_rev=$(git rev-parse --short HEAD)

project_replaced_name_1=${project_name/\//-}        # this replaces the / with -
project_replaced_name=${project_replaced_name_1/@/} # this replaces the @ with nothing

# cleanup
rm -rf "$temp_dir"

mkdir -p "$temp_dir"

cp -R "$PWD"/* "$temp_dir"/

cd "$temp_dir" || exit

rm -rf .heft .rush node_modules temp *.log tsconfig.json *.tgz *.tar.gz

ls -la "$temp_dir"

tar czf "$project_dir/$project_replaced_name-$current_git_rev-$project_version.tgz" .
