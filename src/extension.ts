import * as vscode from "vscode";
import { sortLinesAscending, sortLinesDescending } from "./sorting";
import { prefixLines, suffixLines } from "./prefix";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "textshift" is now active!');

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "textshift.sortLinesAscending",
      sortLinesAscending,
    ),
    vscode.commands.registerCommand(
      "textshift.sortLinesDescending",
      sortLinesDescending,
    ),
    vscode.commands.registerCommand(
      "textshift.prefixLines",
      prefixLines,
    ),
    vscode.commands.registerCommand(
      "textshift.suffixLines",
      suffixLines,
    ),
  );
}
