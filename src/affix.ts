import * as vscode from "vscode";

const MAX_PREFIX_LENGTH = 20;
const MAX_SUFFIX_LENGTH = 20;

async function prefixLines() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showInformationMessage("No active text editor found");
    return;
  }

  const prefix = await vscode.window.showInputBox({
    prompt: "Enter the prefix to add to each line",
    placeHolder: "e.g. TODO: ",
    title: "Add Prefix",
    validateInput: (value) => {
      if (value.length > MAX_PREFIX_LENGTH) {
        return `Prefix must not exceed ${MAX_PREFIX_LENGTH} characters`;
      }
      return null;
    },
  });
  if (prefix === undefined) {
    return;
  }

  const document = editor.document;
  const selection = editor.selection;
  const text = document.getText(selection);
  const lines = text.split("\n");
  const affixedLines = lines.map((line) => `${prefix}${line}`);
  const affixedText = affixedLines.join("\n");
  await editor.edit((editBuilder) => {
    editBuilder.replace(selection, affixedText);
  });
}

async function suffixLines() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showInformationMessage("No active text editor found");
    return;
  }

  const suffix = await vscode.window.showInputBox({
    prompt: "Enter the suffix to add to each line",
    placeHolder: "e.g. <END>",
    title: "Add Suffix",
    validateInput: (value) => {
      if (value.length > MAX_SUFFIX_LENGTH) {
        return `Suffix must not exceed ${MAX_SUFFIX_LENGTH} characters`;
      }
      return null;
    },
  });
  if (suffix === undefined) {
    return;
  }
  const document = editor.document;
  const selection = editor.selection;
  const text = document.getText(selection);
  const lines = text.split("\n");
  const affixedLines = lines.map((line) => `${line}${suffix}`);
  const affixedText = affixedLines.join("\n");
  await editor.edit((editBuilder) => {
    editBuilder.replace(selection, affixedText);
  });
}

export { prefixLines, suffixLines };
