import * as vscode from "vscode";
import { sortLinesAscending } from "./sorting";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "textshift" is now active!');

  const disposable = vscode.commands.registerCommand(
    "textshift.sortLinesAscending",
    sortLinesAscending,
  );

  context.subscriptions.push(disposable);
}
