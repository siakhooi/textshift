import * as vscode from "vscode";

async function sortLinesAscending() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showInformationMessage("No active text editor found");
    return;
  }

  const document = editor.document;
  const selection = editor.selection;
  const text = document.getText(selection);
  const lines = text.split("\n");
  const sortedLines = lines.sort();
  const sortedText = sortedLines.join("\n");
  await editor.edit((editBuilder) => {
    editBuilder.replace(selection, sortedText);
  });
}

export { sortLinesAscending };
