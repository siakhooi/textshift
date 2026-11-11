import { beforeEach, describe, expect, it, vi } from "vitest";

const vscodeMocks = vi.hoisted(() => {
  const showInformationMessage = vi.fn();
  const showInputBox = vi.fn();
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
    showInputBox,
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
    showInputBox: vscodeMocks.showInputBox,
  },
}));

import { prefixLines, suffixLines } from "../src/affix";

type ValidateInput = (value: string) => string | null;

function setEditor(text: string, selection: unknown = { start: {}, end: {} }) {
  vscodeMocks.getText.mockReturnValue(text);
  vscodeMocks.setActiveTextEditor({
    document: { getText: vscodeMocks.getText },
    selection,
    edit: vscodeMocks.edit,
  });
  return selection;
}

function getValidateInput(): ValidateInput {
  const options = vscodeMocks.showInputBox.mock.calls[0][0] as {
    validateInput: ValidateInput;
  };
  return options.validateInput;
}

describe("prefixLines", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vscodeMocks.setActiveTextEditor(null);
  });

  it("adds the prefix to each selected line and replaces the selection", async () => {
    const selection = setEditor("one\ntwo\nthree");
    vscodeMocks.showInputBox.mockResolvedValue("TODO: ");

    await prefixLines();

    expect(vscodeMocks.getText).toHaveBeenCalledWith(selection);
    expect(vscodeMocks.replace).toHaveBeenCalledWith(
      selection,
      "TODO: one\nTODO: two\nTODO: three",
    );
    expect(vscodeMocks.showInformationMessage).not.toHaveBeenCalled();
  });

  it.each([
    {
      case: "a single line",
      input: "only",
      affix: "> ",
      expected: "> only",
    },
    {
      case: "empty lines too",
      input: "a\n\nb",
      affix: "-",
      expected: "-a\n-\n-b",
    },
    {
      case: "empty prefix unchanged",
      input: "a\nb",
      affix: "",
      expected: "a\nb",
    },
  ])("prefixes $case", async ({ input, affix, expected }) => {
    const selection = setEditor(input);
    vscodeMocks.showInputBox.mockResolvedValue(affix);

    await prefixLines();

    expect(vscodeMocks.replace).toHaveBeenCalledWith(selection, expected);
  });

  it("does nothing when the input box is cancelled", async () => {
    setEditor("a\nb");
    vscodeMocks.showInputBox.mockResolvedValue(undefined);

    await prefixLines();

    expect(vscodeMocks.edit).not.toHaveBeenCalled();
    expect(vscodeMocks.replace).not.toHaveBeenCalled();
  });

  it("shows a message when there is no active editor", async () => {
    await prefixLines();

    expect(vscodeMocks.showInformationMessage).toHaveBeenCalledWith(
      "No active text editor found",
    );
    expect(vscodeMocks.showInputBox).not.toHaveBeenCalled();
    expect(vscodeMocks.edit).not.toHaveBeenCalled();
  });

  it("opens the input box with the prefix prompt options", async () => {
    setEditor("a");
    vscodeMocks.showInputBox.mockResolvedValue("x");

    await prefixLines();

    expect(vscodeMocks.showInputBox).toHaveBeenCalledWith(
      expect.objectContaining({
        prompt: "Enter the prefix to add to each line",
        placeHolder: "e.g. TODO: ",
        title: "Add Prefix",
      }),
    );
  });

  it("validates prefix length (max 20 characters)", async () => {
    setEditor("a");
    vscodeMocks.showInputBox.mockResolvedValue("x");

    await prefixLines();
    const validateInput = getValidateInput();

    expect(validateInput("")).toBeNull();
    expect(validateInput("a".repeat(20))).toBeNull();
    expect(validateInput("a".repeat(21))).toBe(
      "Prefix must not exceed 20 characters",
    );
  });
});

describe("suffixLines", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vscodeMocks.setActiveTextEditor(null);
  });

  it("adds the suffix to each selected line and replaces the selection", async () => {
    const selection = setEditor("one\ntwo\nthree");
    vscodeMocks.showInputBox.mockResolvedValue(";");

    await suffixLines();

    expect(vscodeMocks.getText).toHaveBeenCalledWith(selection);
    expect(vscodeMocks.replace).toHaveBeenCalledWith(
      selection,
      "one;\ntwo;\nthree;",
    );
    expect(vscodeMocks.showInformationMessage).not.toHaveBeenCalled();
  });

  it.each([
    {
      case: "a single line",
      input: "only",
      affix: " <END>",
      expected: "only <END>",
    },
    {
      case: "empty lines too",
      input: "a\n\nb",
      affix: ",",
      expected: "a,\n,\nb,",
    },
    {
      case: "empty suffix unchanged",
      input: "a\nb",
      affix: "",
      expected: "a\nb",
    },
  ])("suffixes $case", async ({ input, affix, expected }) => {
    const selection = setEditor(input);
    vscodeMocks.showInputBox.mockResolvedValue(affix);

    await suffixLines();

    expect(vscodeMocks.replace).toHaveBeenCalledWith(selection, expected);
  });

  it("does nothing when the input box is cancelled", async () => {
    setEditor("a\nb");
    vscodeMocks.showInputBox.mockResolvedValue(undefined);

    await suffixLines();

    expect(vscodeMocks.edit).not.toHaveBeenCalled();
    expect(vscodeMocks.replace).not.toHaveBeenCalled();
  });

  it("shows a message when there is no active editor", async () => {
    await suffixLines();

    expect(vscodeMocks.showInformationMessage).toHaveBeenCalledWith(
      "No active text editor found",
    );
    expect(vscodeMocks.showInputBox).not.toHaveBeenCalled();
    expect(vscodeMocks.edit).not.toHaveBeenCalled();
  });

  it("opens the input box with the suffix prompt options", async () => {
    setEditor("a");
    vscodeMocks.showInputBox.mockResolvedValue("x");

    await suffixLines();

    expect(vscodeMocks.showInputBox).toHaveBeenCalledWith(
      expect.objectContaining({
        prompt: "Enter the suffix to add to each line",
        placeHolder: "e.g. <END>",
        title: "Add Suffix",
      }),
    );
  });

  it("validates suffix length (max 20 characters)", async () => {
    setEditor("a");
    vscodeMocks.showInputBox.mockResolvedValue("x");

    await suffixLines();
    const validateInput = getValidateInput();

    expect(validateInput("")).toBeNull();
    expect(validateInput("a".repeat(20))).toBeNull();
    expect(validateInput("a".repeat(21))).toBe(
      "Suffix must not exceed 20 characters",
    );
  });
});
