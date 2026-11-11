default:
  @just --list

install:
  npm install
install-no-scripts:
  npm install --ignore-scripts

test:
  just set-version
  npm run format
  npm run lint
  npm run compile
  npm run test:coverage

test-ext:
  npm run test:extension
build: test test-ext
  npm run vsix

clean:
  rm -rf dist/ out/ *.vsix
clean-all: clean
  rm -rf node_modules/

release:
    ./scripts/create-release.sh
set-version:
    ./scripts/set-version.sh
