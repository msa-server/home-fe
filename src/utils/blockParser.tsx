import { BlockNode, BlockNodeType } from "@/types/markdown";
import { inlineParser } from "./inlineParser";

// 줄 단위 파싱을 진행 함.
export function blockParser(input: string): BlockNode[] {
    const lines = input.replace(/\r\n?/g, "\n").split("\n");
    const result: BlockNode[] = [];

    console.log(lines);

    let nowlineIdx = 0;
    const peekLine = () => lines[nowlineIdx] ?? null;
    const nextLine = () => lines[nowlineIdx++] ?? null;

    while (nowlineIdx < lines.length) {
        const nowLine = peekLine();
        console.log("now line : " + nowLine);

        // !을 통하여 빈문자열과 NUL을 잡아 줌.
        if (!nowLine) {
            nextLine(); // 다음 줄로 이동.
            continue;
        }

        // 1) 제목 블럭 파싱 : [ ## title ] 형식의 문장을 획득.
        // 여러줄의 제목은 없음.
        const h = nowLine.match(/^(#{2,7})\s+(.*)$/);
        console.log("h : " + h);
        if (h) {
            console.log("h :" + h);
            nextLine();

            result.push({
                type: BlockNodeType.HEADING,
                depth: (h[1].length - 2) as 0 | 1 | 2 | 3 | 4 | 5,
                children: inlineParser(h[2]),
            });

            continue;
        }

        result.push({
            type: BlockNodeType.PARAGRAPH,
            children: inlineParser(nowLine),
        });
        console.log(result);
        nextLine();
    }

    return result;
}
