#!/bin/sh

CUR=$(pwd)

CURRENT=$(cd "$(dirname "$0")" || exit;pwd)
echo "${CURRENT}"

if ! (cd "${CURRENT}" || exit); then
  cd "${CUR}" || exit
  exit 1
fi

if ! (git pull --prune); then
  cd "${CUR}" || exit
  exit 1
fi
echo ""
pwd

if ! (rm -rf dist && npx -y pnpm@latest self-update latest-11 && pnpm install -r && pnpm up -r && pnpm lint-fix && pnpm audit --fix override && pnpm up -r && pnpm install -r --no-frozen-lockfile && pnpm clean && pnpm build && pnpm package && git add dist); then
# if ! (rm -rf dist && npx -y pnpm@latest self-update && pnpm install -r && pnpm up -r && pnpm lint-fix && pnpm up -r && pnpm install -r --no-frozen-lockfile && pnpm clean && pnpm build && pnpm package && git add dist); then
  cd "${CUR}" || exit
  exit 1
fi

if ! (cd "${CURRENT}" || exit); then
  cd "${CUR}" || exit
  exit 1
fi

pwd

if ! (cd "${CURRENT}/__tests__/cdk" || exit); then
  cd "${CUR}" || exit
  exit 1
fi

if ! (git pull --prune); then
  cd "${CUR}" || exit
  exit 1
fi
echo ""
pwd

if ! (pnpm install -r && pnpm up -r); then
  cd "${CUR}" || exit
  exit 1
fi

if ! (cd "${CURRENT}" || exit); then
  cd "${CUR}" || exit
  exit 1
fi

if ! (git commit -am "Bumps node modules" && git push); then
  cd "${CUR}" || exit
  exit 1
fi

cd "${CUR}" || exit
