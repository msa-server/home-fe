"use client";

import { useState, useMemo } from "react";
import ViewPost from "@/component/ViewPost";
import { blockParser } from "@/utils/blockParser";

export default function PostEditor() {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");

  const result = useMemo(() => blockParser(content), [content]);

  return (
    <main className="grid grid-cols-2 h-screen">
      {/* 입력 영역 */}
      <section className="p-6 border-r overflow-y-auto">
        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-3xl font-bold outline-none mb-4"
        />

        <input
          type="text"
          placeholder="태그를 입력하세요"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full text-sm text-gray-500 mb-6 outline-none"
        />

        <textarea
          placeholder="내용을 입력하세요 (마크다운 지원)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-[70vh] border rounded-lg p-3 font-mono resize-none outline-none"
        />

        <div className="flex justify-end mt-4 space-x-2">
          <button className="px-4 py-2 rounded bg-gray-200">임시저장</button>
          <button className="px-4 py-2 rounded bg-green-500 text-white">출간하기</button>
        </div>
      </section>

      {/* 미리보기 영역 */}
      <section className="p-6 overflow-y-auto bg-gray-50">
        <h1 className="text-3xl font-bold mb-2">{title || "제목 미리보기"}</h1>
        <p className="text-sm text-gray-500 mb-4">{tags}</p>
        <article className="prose max-w-none">
          <ViewPost nodes={result} />
        </article>
      </section>
    </main>
  );
}
