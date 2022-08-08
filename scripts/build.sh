#! /usr/bin/env bash

set -e
set -o pipefail
set -u

export SOURCE_DIR="${SOURCE_DIR:-$PWD}"

# shellcheck source=scripts/env.sh
source "$SOURCE_DIR/scripts/env.sh"

rm -rf "$BUILD_OUTPUT_DIR"

tsc \
    --outDir "$BUILD_OUTPUT_DIR" \
    --project "$SOURCE_DIR/src/lib/react-clock"

pushd "$BUILD_OUTPUT_DIR"

cp "$SOURCE_DIR/LICENSE" .
cp "$SOURCE_DIR/README.md" .

cat > .npmrc <<EOF
@nealrame:registry: https://registry.npmjs.org
//registry.npmjs.org/:_authToken=$NODE_AUTH_TOKEN
EOF

node <<EOF
const fs = require("fs")

const package_json = JSON.parse(fs.readFileSync("$SOURCE_DIR/package.json"))

delete package_json.scripts
delete package_json.devDependencies

package_json.main = "./index.js"

fs.writeFileSync("package.json", JSON.stringify(package_json, null, 2))
EOF

popd
