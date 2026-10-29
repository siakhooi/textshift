import * as assert from "assert";
import * as vscode from "vscode";

const EXTENSION_ID = "siakhooi.textshift";

suite("Extension Test Suite", () => {
  test("extension is installed", () => {
    const extension = vscode.extensions.getExtension(EXTENSION_ID);
    assert.ok(extension);
  });

  test("sort lines ascending command sorts the current selection", async () => {
    const extension = vscode.extensions.getExtension(EXTENSION_ID);
    assert.ok(extension);
    await extension.activate();

    const document = await vscode.workspace.openTextDocument({
      content: "zebra\napple\nmango",
      language: "plaintext",
    });
    const editor = await vscode.window.showTextDocument(document);
    const lastLine = document.lineAt(document.lineCount - 1);
    const range = new vscode.Range(document.positionAt(0), lastLine.range.end);
    editor.selection = new vscode.Selection(range.start, range.end);

    await vscode.commands.executeCommand("textshift.sortLinesAscending");

    assert.strictEqual(document.getText(), "apple\nmango\nzebra");
  });

  test("sort lines ascending command sorts only the selected lines", async () => {
    const extension = vscode.extensions.getExtension(EXTENSION_ID);
    assert.ok(extension);
    await extension.activate();

    const document = await vscode.workspace.openTextDocument({
      content: "keep-top\nzebra\napple\nkeep-bottom",
      language: "plaintext",
    });
    const editor = await vscode.window.showTextDocument(document);
    const start = document.lineAt(1).range.start;
    const end = document.lineAt(2).range.end;
    editor.selection = new vscode.Selection(start, end);

    await vscode.commands.executeCommand("textshift.sortLinesAscending");

    assert.strictEqual(
      document.getText(),
      "keep-top\napple\nzebra\nkeep-bottom",
    );
  });
});
