default:
  @just --list

install:
  npm install
test:
  just set-version
  npm run format
  npm run compile
  npm run test:coverage
build: test
  npm run vsix

clean:
  rm -rf dist/ out/ *.vsix
clean-all: clean
  rm -rf node_modules/

release:
    ./scripts/create-release.sh
set-version:
    ./scripts/set-version.sh
