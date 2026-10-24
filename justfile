default:
  @just --list

install:
  npm install
test:
  npm run format
  npm run compile
build: test
  npm run vsix

