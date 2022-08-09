#! /usr/bin/env bash

set -e
set -o pipefail
set -u

export SOURCE_DIR="${SOURCE_DIR:-$PWD}"

# shellcheck source=scripts/env.sh
source "$SOURCE_DIR/scripts/env.sh"

pushd "$BUILD_OUTPUT_DIR"

# display the 8 last characters of the npm access token
echo "${NODE_AUTH_TOKEN:-"Undefined"} | tail -c 8"
# npm publish --access public

popd
