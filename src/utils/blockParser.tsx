import { BlockNode, BlockNodeType } from "@/types/markdown";
import { inlineParser } from "./inlineParser";

// 줄 단위 파싱을 진행 함.
export function blockParser(input: string): BlockNode[] {
    const lines = input.replace(/\r\n?/g, "\n").split("\n");
    const result: BlockNode[] = [];

    let nowlineIdx = 0;
    const peekLine = () => lines[nowlineIdx] ?? null;
    const nextLine = () => lines[++nowlineIdx] ?? null;

    const parseList = (reg: RegExp) => {
        const ol: string[] = [];

        do {
            ol.push(peekLine()?.replace(reg, ""));
        } while (reg.test(nextLine()));

        return ol;
    }

    while (nowlineIdx < lines.length) {
        const nowLine = peekLine();

        // NUL을 잡아 줌.
        if (nowLine === null) {
            nextLine(); // 다음 줄로 이동.
            continue;
        }

        // 1) 제목 블럭 파싱 : [ # title ] 형식의 문장을 획득.
        // 여러줄의 제목은 없음.
        const h = nowLine.match(/^(#{1,5})\s+(.*)$/);
        if (h) {
            nextLine();

            result.push({
                type: BlockNodeType.HEADING,
                depth: (h[1].length - 1) as 0 | 1 | 2 | 3 | 4,
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

        // 3. ol 리스트 파싱 : [ * a ] 형식의 문장.
        const OL_REG = /^[*]\s+/;
        if (OL_REG.test(nowLine)) {
            const ol: string[] = parseList(OL_REG);

            result.push({
                type: BlockNodeType.LIST_BLOCK,
                ordered: true,
                items: ol
            })

            continue;
        }

        // 4. ul 리스트 파싱 : [ - a ] 형식의 문장
        const UL_REG = /^[-]\s+/;
        if (UL_REG.test(nowLine)) {
            const ul: string[] = parseList(UL_REG);

            result.push({
                type: BlockNodeType.LIST_BLOCK,
                ordered: false,
                items: ul                
            })

            continue;
        }

        // 5. 구분선 파싱
        
        // 5-1) like notion style.
        if (nowLine === '---') {
            nextLine();

            result.push({
                type: BlockNodeType.DIVIDER_LINE_NORMAL
            });

            continue;
        }

        // 6 이미지 파싱
        const IMG_REG = /!\[\s*([^\]]*?)\s*\]\s*\(\s*([^)]+?)\s*\)\s*(?:\(\s*([^)]+?)\s*\))?/
        

        if (IMG_REG.test(nowLine)) {
            nextLine();

            const data = nowLine.match(IMG_REG);

            if (data) {
                console.log(data);

                result.push({
                type: BlockNodeType.IMAGE,
                desc: data[1],
                url: data[2],
                size: isNaN(Number(data[3])) ? 100 : Number(data[3])
                })

                console.log(result[result.length - 1])

                continue;
            }
        }

        // 평문 추가.
        if (nowLine === "") {
            result.push({
                type: BlockNodeType.EMPTY_LINE
            })
        } else {
            result.push({
            type: BlockNodeType.PARAGRAPH,
            children: inlineParser(nowLine),
        });
        }
        nextLine();
    }

    return result;
}