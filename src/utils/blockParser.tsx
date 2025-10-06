import { BlockNode, BlockNodeType } from "@/types/markdown";
import { inlineParser } from "./inlineParser";

// 줄 단위 파싱을 진행 함.
export function blockParser(input: string): BlockNode[] {
    const lines = input.replace(/\r\n?/g, "\n").split("\n");
    const result: BlockNode[] = [];

    let nowlineIdx = 0;
    const peekLine = () => lines[nowlineIdx] ?? null;
    const nextLine = () => lines[nowlineIdx++] ?? null;

    while (nowlineIdx < lines.length) {
        const nowLine = peekLine();

        // !을 통하여 빈문자열과 NUL을 잡아 줌.
        if (!nowLine) {
            nextLine(); // 다음 줄로 이동.
            continue;
        }

        // 1) 제목 블럭 파싱 : [ ## title ] 형식의 문장을 획득.
        // 여러줄의 제목은 없음.
        const h = nowLine.match(/^(#{2,7})\s+(.*)$/);
        if (h) {
            nextLine();

            result.push({
                type: BlockNodeType.HEADING,
                depth: (h[1].length - 2) as 0 | 1 | 2 | 3 | 4 | 5,
                children: inlineParser(h[2]),
            });

            continue;
        }
        
        // 2) 코드 블럭 파싱 : [ ```lang ... ``` ] 형식의 문장.
        const code = nowLine.match(/^```(\w+)?\s*$/);
        if (code) {
            nextLine();
            const lang = code[1] ?? "text";
            
            const buf: string[] = [];

            // 코드 본문 추가하기.
            while (peekLine() !== null && !peekLine().startsWith("```")) {
                buf.push(peekLine());
                nextLine();
            }

            // 마지막줄 처리.
            if (peekLine()) {
                nextLine();
            }

            result.push({
                type: BlockNodeType.CODE_BLOCK,
                language: lang,
                code: buf.join("\n")
            })

            // console.log(result[result.length - 1]);

            continue;
        }

        // 평문 추가.
        result.push({
            type: BlockNodeType.PARAGRAPH,
            children: inlineParser(nowLine),
        });

        nextLine();
    }

    return result;
}
