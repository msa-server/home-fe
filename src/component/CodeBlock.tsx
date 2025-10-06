"use client";

import { useMemo, useState, useEffect } from "react";
import { Clipboard, ClipboardCheck } from "lucide-react";


const Prism = require("prismjs");
require("prismjs/components/prism-java");
require("prismjs/components/prism-python");
require("prismjs/components/prism-javascript");

type Props = {
  code: string;
  lang?: string;
  title?: string;
};

export default function CodeBlock({ code, lang = "text" }: Props) {
  const [copied, setCopied] = useState(false);

  // 코드 하이라이트된 HTML 생성
  const highlighted = useMemo(() => {
    const grammar = Prism.languages[lang] || Prism.languages.java;
    return Prism.highlight(code, grammar, lang);
  }, [code, lang]);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  // 줄 번호 계산
  const lines = code.trimEnd().split("\n");

  return (
    <figure className="rounded-xl overflow-hidden bg-[#2b2d31] text-[#e6e6e6] shadow-lg">
      {/* 상단 바 */}
      <div className="relative flex items-center justify-between px-4 py-2 bg-[#34363b] border-b border-black/20">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <figcaption className="absolute left-1/2 -translate-x-1/2 text-xs tracking-widest text-[#e1c16e]/90">
          {lang.toUpperCase()}
        </figcaption>
        <button
          onClick={copy}
          className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md hover:bg-white/5 transition"
        >
          {copied ? <ClipboardCheck size={16} /> : <Clipboard size={16} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      {/* 코드 영역 */}
      <pre className="relative overflow-x-auto px-4 py-3 text-sm font-mono leading-6">
        {lines.map((line, i) => (
          <div key={i} className="flex">
            <span className="select-none w-10 text-right pr-3 opacity-40">
              {i + 1}
            </span>
            <code
              className="flex-1 whitespace-pre-wrap"
              dangerouslySetInnerHTML={{
                __html:
                  Prism.highlight(line, Prism.languages[lang] || Prism.languages.javascript, lang),
              }}
            />
          </div>
        ))}
      </pre>
    </figure>
  );
}
