"use client";

import { useState, useMemo, useRef } from "react";
import ViewPost from "@/component/ViewPost";
import { blockParser } from "@/utils/blockParser";


type TempImage = { id: string; file: File;};

export default function PostEditor() {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [tempImages, setTempImages] = useState<Record<string, TempImage>>({});
  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const result = useMemo(() => blockParser(content), [content]);

  const insertAtCursor = (text: string) => {

    const ta = textareaRef.current;

    if (!ta) {
      return;
    }

    // 마지막 커서 부분에 글자 추가.
    const start = ta.selectionStart ?? content.length;
    const end = ta.selectionEnd ?? content.length;
    const next = content.slice(0, start) + text + content.slice(end);
    setContent(next);

    // 커서를 입력한 글자만큼 뒤로 이동.
    requestAnimationFrame(() => {
      ta.focus();
      const caret = start + text.length;
      ta.setSelectionRange(caret, caret);
    });
  }

  const onTabKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      insertAtCursor("\t");
    }
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];

    if (f) {
      addImage(f);
    } 

    e.target.value = "";
  }

  const addImage = (file: File) => {

    if (file.size > 15 * 1024 * 1024) {
      alert('이미지 파일이 너무 큼. (max: 15MB)')
      return;
    }

    const id = crypto.randomUUID();
    const objectUrl = URL.createObjectURL(file);

    console.log("here1");

    setTempImages((p) => ({...p, [id]: {id, file}}));

    console.log("here2");

    insertAtCursor(`\n![description](${objectUrl})(set your size [1 ~ 100])\n`);

    console.log("here3");
  }

  return (
    <main className="grid grid-cols-2 h-screen">
      {/* 입력 영역 */}
      <section className="p-6 border-r overflow-y-auto">

        {/* 제목 입력 */}
        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-3xl font-bold outline-none mb-4"
        />

        {/* 게시글 태그 입력 */}
        <input
          type="text"
          placeholder="태그를 입력하세요"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full text-sm text-gray-500 mb-6 outline-none"
        />

        {/* 상단 툴 모음 집. */}
        <div className="flex items-center gap-2 mb-2">

          {/* 이미지 삽입 */}
          <label className="px-3 py-1.5 rounded-md border cursor-pointer bg-gray-50 hover:bg-gray-100 text-sm dark:text-black">
            <input
              type="file"
              accept="image/*"
              onChange={onFileChange}
              // disabled={isUploading}
              className="hidden"
            />
            Image
          </label>

          <button
            type="button"
            onClick={() => insertAtCursor("test")}
            className="px-3 py-1.5 rounded-md border bg-gray-50 hover:bg-gray-100 text-sm dark:text-black">
            test
          </button>

          {/* 예: 향후 링크, 볼드 등 확장 */}
          {/* <button
            type="button"
            onClick={() => insertAtCursor("**굵은 글씨**")}
            className="px-3 py-1.5 rounded-md border bg-gray-50 hover:bg-gray-100 text-sm"
          >
            B
          </button> */}
        </div>
          
        
        {/* 입력 부분 */}
        <textarea
          ref={textareaRef}
          placeholder="내용을 입력하세요 (마크다운 지원)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={onTabKeyDown}
          className="w-full h-[70vh] border rounded-lg p-3 font-mono resize-none outline-none"
        />

        <div className="flex justify-end mt-4 space-x-2">
          <button className="px-4 py-2 rounded bg-gray-200">임시저장</button>
          <button className="px-4 py-2 rounded bg-green-500 text-white">출간하기</button>
        </div>
      </section>

      {/* 미리보기 영역 */}
      <section className="p-6 overflow-y-auto">
        <ViewPost title={title || "제목 미리보기"} tags={tags} nodes={result} />
      </section>
    </main>
  );
}
