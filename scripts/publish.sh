#! /usr/bin/env bash

set -e
set -o pipefail
set -u

export SOURCE_DIR="${SOURCE_DIR:-$PWD}"

# shellcheck source=scripts/env.sh
source "$SOURCE_DIR/scripts/build.sh"

echo "->${NODE_AUTH_TOKEN}<-"

# if [ -d "$BUILD_OUTPUT_DIR" ];
# then
#     npm publish "$BUILD_OUTPUT_DIR" --access public
# fi
