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

# test if a variable is set to a non-empty value
if [ -n "${NODE_AUTH_TOKEN:-}" ];
then
    cat > ".npmrc" <<EOF
//registry.npmjs.org/:_authToken=$NODE_AUTH_TOKEN
EOF
fi
