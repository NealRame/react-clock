#! /usr/bin/env bash

set -e
set -o pipefail
set -u

export SOURCE_DIR="${SOURCE_DIR:-$PWD}"

# shellcheck source=scripts/env.sh
source "$SOURCE_DIR/scripts/env.sh"

pushd "$BUILD_OUTPUT_DIR"

echo "$PWD"

echo "---"
grep "XXXXX-XXXXX-XXXXX-XXXXX" .npmrc
echo "---"

npm publish --access public

popd
