#! /usr/bin/env bash

set -e
set -o pipefail
set -u

export SOURCE_DIR="${SOURCE_DIR:-$PWD}"

# shellcheck source=scripts/env.sh
source "$SOURCE_DIR/scripts/env.sh"

if [ -d "$BUILD_OUTPUT_DIR" ];
then
    # npm publish "$BUILD_OUTPUT_DIR" --access public
    find / -name ".npmrc" | while read -r NPMRC;
    do
        echo "+---------+"
        cat "$NPMRC"
    done
fi
