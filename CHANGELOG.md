# Changelog

All notable changes to TextShift are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.1] - 2026-10-30

Marketplace listing polish and a release-pipeline fix so GitHub Releases include the `.vsix`.

### Added

- Extension icon (`images/icon.png`) for Visual Studio Marketplace and Open VSX.
- Marketplace keywords: text processing, text transformation, and sort lines.

### Fixed

- GitHub Release no longer skipped the `.vsix` asset. `actions/download-artifact` was given `path: ./*.vsix`, which created a directory named `*.vsix` instead of placing the file in the workspace.
- README build badge pointed at the wrong workflow name and used a `.yaml` filename; it now targets `workflow-on-pull-request.yml`.

## [0.1.0] - 2026-10-29

First public release of TextShift, a VS Code extension with editor commands for common text transformations. Commands run from the Command Palette on the current selection.

### Added

- **TextShift: Sort Lines Ascending** (`textshift.sortLinesAscending`) — sorts the lines in the current selection in ascending order. If nothing is selected, the document is left unchanged.

[Unreleased]: https://github.com/siakhooi/textshift/compare/v0.1.1...HEAD
[0.1.1]: https://github.com/siakhooi/textshift/releases/tag/v0.1.1
[0.1.0]: https://github.com/siakhooi/textshift/releases/tag/v0.1.0
