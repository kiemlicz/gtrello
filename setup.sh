#!/usr/bin/env bash

set -e

if [ -z "$1" ]; then
    echo "Usage: $0 Europe/Warsaw"
    exit 4
fi

user_tz="$1"
script_dir=$(dirname "$0")
pushd $script_dir

clasp login

echo "Creating AppScript project"
clasp create --title GTrello --type standalone --rootDir src
mv src/.clasp.json ./

echo "Setting user timezone"
jq --arg user_tz "$user_tz" '.timeZone = $user_tz' "src/appsscript.json" > src/appsscript.json.new
mv src/appsscript.json.new src/appsscript.json
rm -f src/appsscript.json.new

popd
echo "Setup completed"
