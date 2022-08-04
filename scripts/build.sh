#! /usr/bin/env bash

set -e
set -o pipefail
set -u

export SOURCE_DIR="${SOURCE_DIR:-$PWD}"

# shellcheck source=scripts/env.sh
source "$SOURCE_DIR/scripts/env.sh"

rm -rf "$BUILD_OUTPUT_DIR"

npm install

tsc \
    --outDir "$BUILD_OUTPUT_DIR" \
    --project "$SOURCE_DIR/src/lib/react-clock"

node <<EOF
const fs = require("fs")

const package_json = JSON.parse(fs.readFileSync("$SOURCE_DIR/package.json", "utf8"))

delete package_json.devDependencies
delete package_json.private
delete package_json.scripts

fs.writeFileSync("$BUILD_OUTPUT_DIR/package.json", JSON.stringify(package_json, null, 2))
EOF

cp "$SOURCE_DIR/README.md" "$BUILD_OUTPUT_DIR"
cp "$SOURCE_DIR/LICENSE" "$BUILD_OUTPUT_DIR"
