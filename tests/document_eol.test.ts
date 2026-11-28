import { describe, expect, it, vi } from "vitest";

vi.mock("vscode", () => ({
  EndOfLine: {
    LF: 1,
    CRLF: 2,
  },
}));

import * as vscode from "vscode";
import { getEol } from "../src/document_eol";

function documentWithEol(eol: vscode.EndOfLine): vscode.TextDocument {
  return { eol } as vscode.TextDocument;
}

describe("getEol", () => {
  it("returns CRLF when the document uses CRLF", () => {
    expect(getEol(documentWithEol(vscode.EndOfLine.CRLF))).toBe("\r\n");
  });

  it("returns LF when the document uses LF", () => {
    expect(getEol(documentWithEol(vscode.EndOfLine.LF))).toBe("\n");
  });
});
