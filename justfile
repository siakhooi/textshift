default:
  @just --list

install:
  npm install
test:
  npm run format
  npm run compile
build: test
  npm run vsix

clean:
  rm -rf dist/ out/ *.vsix
clean-all: clean
  rm -rf node_modules/

