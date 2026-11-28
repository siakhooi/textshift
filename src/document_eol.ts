import * as vscode from "vscode";

export function getEol(document: vscode.TextDocument): string {
  return document.eol === vscode.EndOfLine.CRLF ? "\r\n" : "\n";
}
