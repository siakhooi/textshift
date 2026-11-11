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

  test("sort lines descending command sorts the current selection", async () => {
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

    await vscode.commands.executeCommand("textshift.sortLinesDescending");

    assert.strictEqual(document.getText(), "zebra\nmango\napple");
  });

  test("sort lines ascending command sorts only the selected lines", async () => {
    const extension = vscode.extensions.getExtension(EXTENSION_ID);
    assert.ok(extension);
    await extension.activate();

    const document = await vscode.workspace.openTextDocument({
      content: "keep-top\nzebra\napple\nmango\nkeep-bottom",
      language: "plaintext",
    });
    const editor = await vscode.window.showTextDocument(document);
    const start = document.lineAt(1).range.start;
    const end = document.lineAt(3).range.end;
    editor.selection = new vscode.Selection(start, end);

    await vscode.commands.executeCommand("textshift.sortLinesAscending");

    assert.strictEqual(
      document.getText(),
      "keep-top\napple\nmango\nzebra\nkeep-bottom",
    );
  });

  test("sort lines descending command sorts only the selected lines", async () => {
    const extension = vscode.extensions.getExtension(EXTENSION_ID);
    assert.ok(extension);
    await extension.activate();

    const document = await vscode.workspace.openTextDocument({
      content: "keep-top\nzebra\napple\nmango\nkeep-bottom",
      language: "plaintext",
    });
    const editor = await vscode.window.showTextDocument(document);
    const start = document.lineAt(1).range.start;
    const end = document.lineAt(3).range.end;
    editor.selection = new vscode.Selection(start, end);

    await vscode.commands.executeCommand("textshift.sortLinesDescending");

    assert.strictEqual(
      document.getText(),
      "keep-top\nzebra\nmango\napple\nkeep-bottom",
    );
  });

  suite("affix commands", () => {
    const windowApi = vscode.window as unknown as {
      showInputBox: typeof vscode.window.showInputBox;
    };
    const originalShowInputBox = windowApi.showInputBox;
    let lastInputBoxOptions: vscode.InputBoxOptions | undefined;

    function stubInputBox(value: string | undefined) {
      lastInputBoxOptions = undefined;
      windowApi.showInputBox = (async (options?: vscode.InputBoxOptions) => {
        lastInputBoxOptions = options;
        return value;
      }) as typeof vscode.window.showInputBox;
    }

    async function openWithSelection(
      content: string,
      startLine?: number,
      endLine?: number,
    ) {
      const document = await vscode.workspace.openTextDocument({
        content,
        language: "plaintext",
      });
      const editor = await vscode.window.showTextDocument(document);
      const first = document.lineAt(startLine ?? 0).range.start;
      const last = document.lineAt(endLine ?? document.lineCount - 1).range.end;
      editor.selection = new vscode.Selection(first, last);
      return document;
    }

    suiteSetup(async () => {
      const extension = vscode.extensions.getExtension(EXTENSION_ID);
      assert.ok(extension);
      await extension.activate();
    });

    teardown(() => {
      windowApi.showInputBox = originalShowInputBox;
    });

    test("commands are registered", async () => {
      const commands = await vscode.commands.getCommands(true);
      assert.ok(commands.includes("textshift.prefixLines"));
      assert.ok(commands.includes("textshift.suffixLines"));
    });

    test("prefix lines command prefixes every selected line", async () => {
      stubInputBox("TODO: ");
      const document = await openWithSelection("one\ntwo\nthree");

      await vscode.commands.executeCommand("textshift.prefixLines");

      assert.strictEqual(
        document.getText(),
        "TODO: one\nTODO: two\nTODO: three",
      );
      assert.strictEqual(lastInputBoxOptions?.title, "Add Prefix");
    });

    test("prefix lines command prefixes only the selected lines", async () => {
      stubInputBox("> ");
      const document = await openWithSelection(
        "keep-top\na\nb\nkeep-bottom",
        1,
        2,
      );

      await vscode.commands.executeCommand("textshift.prefixLines");

      assert.strictEqual(document.getText(), "keep-top\n> a\n> b\nkeep-bottom");
    });

    test("prefix lines command does nothing when input is cancelled", async () => {
      stubInputBox(undefined);
      const document = await openWithSelection("one\ntwo");

      await vscode.commands.executeCommand("textshift.prefixLines");

      assert.strictEqual(document.getText(), "one\ntwo");
    });

    test("prefix lines input validation limits length to 20 characters", async () => {
      stubInputBox("x");
      await openWithSelection("one");

      await vscode.commands.executeCommand("textshift.prefixLines");

      const validate = lastInputBoxOptions?.validateInput;
      assert.ok(validate);
      assert.strictEqual(validate("a".repeat(20)), null);
      assert.strictEqual(
        validate("a".repeat(21)),
        "Prefix must not exceed 20 characters",
      );
    });

    test("suffix lines command suffixes every selected line", async () => {
      stubInputBox(";");
      const document = await openWithSelection("one\ntwo\nthree");

      await vscode.commands.executeCommand("textshift.suffixLines");

      assert.strictEqual(document.getText(), "one;\ntwo;\nthree;");
      assert.strictEqual(lastInputBoxOptions?.title, "Add Suffix");
    });

    test("suffix lines command suffixes only the selected lines", async () => {
      stubInputBox(" <END>");
      const document = await openWithSelection(
        "keep-top\na\nb\nkeep-bottom",
        1,
        2,
      );

      await vscode.commands.executeCommand("textshift.suffixLines");

      assert.strictEqual(
        document.getText(),
        "keep-top\na <END>\nb <END>\nkeep-bottom",
      );
    });

    test("suffix lines command does nothing when input is cancelled", async () => {
      stubInputBox(undefined);
      const document = await openWithSelection("one\ntwo");

      await vscode.commands.executeCommand("textshift.suffixLines");

      assert.strictEqual(document.getText(), "one\ntwo");
    });

    test("suffix lines input validation limits length to 20 characters", async () => {
      stubInputBox("x");
      await openWithSelection("one");

      await vscode.commands.executeCommand("textshift.suffixLines");

      const validate = lastInputBoxOptions?.validateInput;
      assert.ok(validate);
      assert.strictEqual(validate("a".repeat(20)), null);
      assert.strictEqual(
        validate("a".repeat(21)),
        "Suffix must not exceed 20 characters",
      );
    });
  });
});
