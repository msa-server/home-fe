import { BlockNode, BlockNodeType } from "@/types/markdown";
import { inlineParser } from "./inlineParser";

// 줄 단위 파싱을 진행 함.
export function blockParser(input: string): BlockNode[] {
  const lines = input.replace(/\r\n?/g, "\n").split("\n");
  const result: BlockNode[] = [];

  let nowLine = 0;
  const peekLine = () => lines[nowLine] ?? null;
  const nextLine = () => lines[nowLine++] ?? null;

  while (nowLine < lines.length) {
    const line = peekLine();

    // !을 통하여 빈문자열과 NUL을 잡아 줌.
    if (!line) {
      nextLine(); // 다음 줄로 이동.
    }

    // 1) 제목 블럭 파싱 : [ ## title ] 형식의 문장을 획득.
    // 여러줄의 제목은 없음.

    const h = line.match(/^(#{2,7})\s+(.*)$/);

    if (h) {
      nextLine();

      result.push({
        type: BlockNodeType.HEADING,
        depth: (h[1].length - 2) as 0 | 1 | 2 | 3 | 4 | 5,
        children: inlineParser(h[2]),
      });

      continue;
    }
    nextLine();
  }

  return result;
}
