# textshift
[![License](https://img.shields.io/github/license/siakhooi/textshift)](https://github.com/siakhooi/textshift/blob/main/LICENSE)
[![Release](https://img.shields.io/github/v/release/siakhooi/textshift)](https://github.com/siakhooi/textshift/releases/latest)
[![Build](https://img.shields.io/github/actions/workflow/status/siakhooi/textshift/ci.yaml?label=build)](https://github.com/siakhooi/textshift/actions/workflows/ci.yaml)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=siakhooi_textshift&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=siakhooi_textshift)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=siakhooi_textshift&metric=bugs)](https://sonarcloud.io/summary/new_code?id=siakhooi_textshift)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=siakhooi_textshift&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=siakhooi_textshift)
[![Wise](https://img.shields.io/badge/Funding-Wise-33cb56.svg?logo=wise)](https://wise.com/pay/me/siakn3)
![count](https://hit-tztugwlsja-uc.a.run.app/?outputtype=badge&counter=ghmd-textshift)

VS Code extension with editor commands for common text transformations. Run them from the Command Palette on the current selection or document.

TextShift is built with the VS Code extension API and ships as a `.vsix` through CI on each release.

## Installation

Install from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=siakhooi.textshift):

1. Open **Extensions** in VS Code (`Ctrl+Shift+X` / `Cmd+Shift+X`).
2. Search for **TextShift** (publisher **siakhooi**).
3. Click **Install**.

Or install a release `.vsix` from [GitHub Releases](https://github.com/siakhooi/textshift/releases):

```bash
code --install-extension textshift-0.0.1.vsix
```

Use the version in the filename that matches the release you downloaded.

## Commands

Commands appear in the Command Palette under the **TextShift** group (prefix `textshift.`).

### Hello World

Shows a confirmation message. Useful to verify the extension is loaded after install or while developing locally.

## Usage

```bash
# Command Palette (F1): "TextShift: Hello World"
```

Assign a keybinding in **Keyboard Shortcuts** if you use a command often. Search for `textshift` to find its command IDs.

### Development

Clone the repo, install dependencies, and press **F5** to launch an Extension Development Host:

```bash
git clone https://github.com/siakhooi/textshift.git
cd textshift
npm install
```

```bash
npm run compile   # typecheck, lint, bundle
npm test          # extension + unit tests
npm run vsix      # package a .vsix locally
```

With [just](https://github.com/casey/just) installed, `just build` runs tests and produces a `.vsix`.

## Locations

### Source Code

- <https://github.com/siakhooi/textshift>

### Distributions

- <https://marketplace.visualstudio.com/items?itemName=siakhooi.textshift>
- <https://github.com/siakhooi/textshift/releases>

### Quality

- <https://sonarcloud.io/project/overview?id=siakhooi_textshift>
- <https://qlty.sh/gh/siakhooi/projects/textshift>

