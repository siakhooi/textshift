# textshift
[![License](https://img.shields.io/github/license/siakhooi/textshift)](https://github.com/siakhooi/textshift/blob/main/LICENSE)
[![Release](https://img.shields.io/github/v/release/siakhooi/textshift)](https://github.com/siakhooi/textshift/releases/latest)
[![Build](https://img.shields.io/github/actions/workflow/status/siakhooi/textshift/ci.yaml?label=build)](https://github.com/siakhooi/textshift/actions/workflows/ci.yaml)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=siakhooi_textshift&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=siakhooi_textshift)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=siakhooi_textshift&metric=bugs)](https://sonarcloud.io/summary/new_code?id=siakhooi_textshift)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=siakhooi_textshift&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=siakhooi_textshift)
[![Wise](https://img.shields.io/badge/Funding-Wise-33cb56.svg?logo=wise)](https://wise.com/pay/me/siakn3)
![count](https://hit-tztugwlsja-uc.a.run.app/?outputtype=badge&counter=ghmd-textshift)

VS Code extension with editor commands for common text transformations. Run them from the Command Palette on the current selection.

TextShift is built with the VS Code extension API. Each GitHub Release builds a `.vsix` and publishes it to the Visual Studio Marketplace, [Open VSX](https://open-vsx.org/extension/siakhooi/textshift), and GitHub Release assets.

## Installation

Install from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=siakhooi.textshift) or [Open VSX](https://open-vsx.org/extension/siakhooi/textshift) (VSCodium and other Open VSX clients):

1. Open **Extensions** (`Ctrl+Shift+X` / `Cmd+Shift+X`).
2. Search for **TextShift** (publisher **siakhooi**).
3. Click **Install**.

Or install a release `.vsix` from [GitHub Releases](https://github.com/siakhooi/textshift/releases):

```bash
code --install-extension textshift-0.1.0.vsix
```

Use the version in the filename that matches the release you downloaded.

## Commands

Commands appear in the Command Palette under the **TextShift** group (prefix `textshift.`).

### Sort Lines Ascending

Sorts the lines in the current selection in ascending order (`textshift.sortLinesAscending`). If nothing is selected, the command does not change the document.

## Usage

1. Select the lines you want to sort.
2. Open the Command Palette (`F1` or `Ctrl+Shift+P` / `Cmd+Shift+P`).
3. Run **TextShift: Sort Lines Ascending**.

Assign a keybinding in **Keyboard Shortcuts** if you use a command often. Search for `textshift` to find its command IDs.

## Locations

### Source Code

- <https://github.com/siakhooi/textshift>

### Distributions

- <https://marketplace.visualstudio.com/items?itemName=siakhooi.textshift>
- <https://open-vsx.org/extension/siakhooi/textshift>
- <https://github.com/siakhooi/textshift/releases>

### Quality

- <https://sonarcloud.io/project/overview?id=siakhooi_textshift>
- <https://qlty.sh/gh/siakhooi/projects/textshift>

