default:
  @just --list

install:
  npm install
install-termux:
  npm install --ignore-scripts
test-termux:
  just set-version
  npm run format
  npm run lint
  npm run compile
  npm run test:coverage

test:
  just set-version
  npm run format
  npm run compile
  npm run test:coverage
test-ext:
  npm run test:extension
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
