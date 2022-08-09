#! /usr/bin/env bash

set -e
set -o pipefail
set -u

export SOURCE_DIR="${SOURCE_DIR:-$PWD}"

# shellcheck source=scripts/env.sh
source "$SOURCE_DIR/scripts/env.sh"

pushd "$BUILD_OUTPUT_DIR"


# display the 8 last characters from the standard input stream

echo "---"
grep _authToken .npmrc | tail -c8
echo "---"

# npm publish --access public

popd
