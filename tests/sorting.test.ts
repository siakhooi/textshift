import { beforeEach, describe, expect, it, vi } from "vitest";

const vscodeMocks = vi.hoisted(() => {
  const showInformationMessage = vi.fn();
  const replace = vi.fn();
  const getText = vi.fn();
  const edit = vi.fn(
    (callback: (editBuilder: { replace: typeof replace }) => void) => {
      callback({ replace });
      return Promise.resolve(true);
    },
  );

  let activeTextEditor: {
    document: { getText: typeof getText };
    selection: unknown;
    edit: typeof edit;
  } | null = null;

  return {
    showInformationMessage,
    replace,
    getText,
    edit,
    setActiveTextEditor(editor: typeof activeTextEditor) {
      activeTextEditor = editor;
    },
    getActiveTextEditor() {
      return activeTextEditor;
    },
  };
});

vi.mock("vscode", () => ({
  window: {
    get activeTextEditor() {
      return vscodeMocks.getActiveTextEditor();
    },
    showInformationMessage: vscodeMocks.showInformationMessage,
  },
}));

import { sortLinesAscending } from "../src/sorting";

describe("sortLinesAscending", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vscodeMocks.setActiveTextEditor(null);
  });

  it("sorts selected lines ascending and replaces the selection", async () => {
    const selection = { start: {}, end: {} };
    vscodeMocks.getText.mockReturnValue("zebra\napple\nmango");
    vscodeMocks.setActiveTextEditor({
      document: { getText: vscodeMocks.getText },
      selection,
      edit: vscodeMocks.edit,
    });

    await sortLinesAscending();

    expect(vscodeMocks.getText).toHaveBeenCalledWith(selection);
    expect(vscodeMocks.replace).toHaveBeenCalledWith(
      selection,
      "apple\nmango\nzebra",
    );
    expect(vscodeMocks.showInformationMessage).not.toHaveBeenCalled();
  });

  it("sorts a single line without changing content", async () => {
    const selection = { start: {}, end: {} };
    vscodeMocks.getText.mockReturnValue("only");
    vscodeMocks.setActiveTextEditor({
      document: { getText: vscodeMocks.getText },
      selection,
      edit: vscodeMocks.edit,
    });

    await sortLinesAscending();

    expect(vscodeMocks.replace).toHaveBeenCalledWith(selection, "only");
  });

  it("shows a message when there is no active editor", async () => {
    await sortLinesAscending();

    expect(vscodeMocks.showInformationMessage).toHaveBeenCalledWith(
      "No active text editor found",
    );
    expect(vscodeMocks.edit).not.toHaveBeenCalled();
  });
});
