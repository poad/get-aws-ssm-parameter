#!/bin/sh

CUR=$(pwd)

CURRENT=$(cd "$(dirname "$0")" || exit;pwd)
echo "${CURRENT}"

result=$(cd "${CURRENT}" || exit)
if [ "$result" -ne 0 ]; then
  cd "${CUR}" || exit
  exit "$result"
fi

result=$(git pull --prune)
if [ "$result" -ne 0 ]; then
  cd "${CUR}" || exit
  exit "$result"
fi
echo ""
pwd

# result=$(rm -rf dist && npx -y pnpm@latest self-update && pnpm install -r && pnpm up -r && pnpm lint-fix && pnpm audit --fix  && pnpm up -r && pnpm install -r --no-frozen-lockfile && pnpm clean && pnpm build && pnpm package && git add dist)
result=$(rm -rf dist && npx -y pnpm@latest self-update && pnpm install -r && pnpm up -r && pnpm lint-fix && pnpm up -r && pnpm install -r --no-frozen-lockfile && pnpm clean && pnpm build && pnpm package && git add dist)
if [ "$result" -ne 0 ]; then
  cd "${CUR}" || exit
  exit "$result"
fi

result=$(cd "${CURRENT}" || exit)
if [ "$result" -ne 0 ]; then
  cd "${CUR}" || exit
  exit "$result"
fi

pwd

result=$(cd "${CURRENT}/__tests__/cdk" || exit)
if [ "$result" -ne 0 ]; then
  cd "${CUR}" || exit
  exit "$result"
fi

result=$(git pull --prune)
if [ "$result" -ne 0 ]; then
  cd "${CUR}" || exit
  exit "$result"
fi
echo ""
pwd

result=$(pnpm install -r && pnpm up -r)
if [ "$result" -ne 0 ]; then
  cd "${CUR}" || exit
  exit "$result"
fi

result=$(cd "${CURRENT}" || exit)
if [ "$result" -ne 0 ]; then
  cd "${CUR}" || exit
  exit "$result"
fi

result=$(git commit -am "Bumps node modules" && git push)
if [ "$result" -ne 0 ]; then
  cd "${CUR}" || exit
  exit "$result"
fi

cd "${CUR}" || exit
