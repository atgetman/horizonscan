import React from "react";
import { DocBlock } from "../data/aiGovernanceDocs";

interface GovernanceDocumentProps {
  blocks: DocBlock[];
}

// Detects the metadata line (e.g. "Document ID: ... | Version: ... | Status: ...")
function isMetaLine(text: string): boolean {
  return /Document ID:|Version:|Status:|Owner:|Effective:/.test(text) && text.includes("|");
}

function renderTable(rows: string[][], key: React.Key) {
  if (rows.length === 0) return null;
  const [header, ...body] = rows;
  return (
    <div key={key} className="my-5 overflow-x-auto">
      <table className="w-full border-collapse text-[13px] text-left">
        <thead>
          <tr className="bg-[#f5f5f5]">
            {header.map((cell, i) => (
              <th
                key={i}
                className="border border-[#e0e0e0] px-3 py-2 font-semibold text-[#1d4b34] align-top"
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, r) => (
            <tr key={r} className={r % 2 === 1 ? "bg-[#fafafa]" : "bg-white"}>
              {row.map((cell, c) => (
                <td
                  key={c}
                  className="border border-[#e0e0e0] px-3 py-2 align-top text-[#333] leading-relaxed"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function GovernanceDocument({ blocks }: GovernanceDocumentProps) {
  if (!blocks || blocks.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        <p>Document is empty.</p>
      </div>
    );
  }

  // The first paragraph block is treated as the document title.
  const [first, ...rest] = blocks;

  // Group leading list items so consecutive <li> render inside a single <ul>.
  const elements: React.ReactNode[] = [];
  let listBuffer: string[] = [];

  const flushList = (key: string) => {
    if (listBuffer.length === 0) return;
    elements.push(
      <ul key={key} className="list-disc pl-6 mb-4 space-y-1.5">
        {listBuffer.map((t, i) => (
          <li key={i} className="text-[15px] leading-relaxed text-[#333]">
            {t}
          </li>
        ))}
      </ul>
    );
    listBuffer = [];
  };

  rest.forEach((block, idx) => {
    if (block.type !== "li") {
      flushList(`list-${idx}`);
    }
    switch (block.type) {
      case "h1":
        elements.push(
          <h2
            key={idx}
            className="font-bold mt-8 mb-3 text-lg text-[#1d4b34] border-b border-gray-300 pb-1"
          >
            {block.text}
          </h2>
        );
        break;
      case "h2":
        elements.push(
          <h3 key={idx} className="font-semibold mt-5 mb-2 text-[15px] text-[#212223]">
            {block.text}
          </h3>
        );
        break;
      case "h3":
        elements.push(
          <h4 key={idx} className="font-semibold mt-4 mb-2 text-[14px] uppercase tracking-wide text-[#444]">
            {block.text}
          </h4>
        );
        break;
      case "li":
        listBuffer.push(block.text);
        break;
      case "table":
        elements.push(renderTable(block.rows, `table-${idx}`));
        break;
      case "p":
      default:
        if (isMetaLine(block.text)) {
          elements.push(
            <p
              key={idx}
              className="mb-6 text-[12px] text-[#666] bg-[#f5f5f5] border border-[#e5e5e5] rounded px-3 py-2 leading-relaxed"
            >
              {block.text}
            </p>
          );
        } else {
          elements.push(
            <p key={idx} className="mb-4 text-[15px] leading-relaxed text-[#333]">
              {block.text}
            </p>
          );
        }
        break;
    }
  });
  flushList("list-final");

  return (
    <div className="p-12 max-w-4xl mx-auto bg-white shadow-sm min-h-full border border-gray-200 text-[#212223]">
      <h1 className="text-2xl font-bold mb-2 text-center text-balance">{first.type === "table" ? "Document" : first.text}</h1>
      <div className="border-b-2 border-[#1d4b34] mb-8" />
      {elements}
    </div>
  );
}
