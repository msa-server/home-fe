import { InlineNode } from "@/types/markdown";

// 줄 내부 단위로 파싱을 진행.
export function inlineParser(text: string): InlineNode[] {
    const result: InlineNode[] = [];
    
    const specialChars = ["_", "*"];

    let normalTextCnt: number = 0;

    /**
     * 일반적인 문자열을 추가하는 함수.
     * @param s 추가할 문자열
     */
    const pushText = (s: string) => {
        // 빈문자열 검열.
        if (!s) return;
        
        const last = result[-1];

        // 마지막 inline node가 평문이면 거기에 추가하고, 아닌 경우 새로 만들어서 추가 함.
        if (last && last.type === "text") {
            last.value +=  s;
        } else {
            result.push({type: "text", value: s});
        }
    }

    let nIdx = 0;
    while (nIdx < text.length) {
        // 특수 문법 시작.
        if (text[nIdx] === "$") {
            // $시작전 평문이 존재하면. 추가.
            if (normalTextCnt > 0) {
                pushText(text.slice(nIdx - normalTextCnt, nIdx));
                normalTextCnt = 0;
            }

            // $_ 또는 $* 가 아니면 현재 $가 그냥 일반 문자를 의미하게 됨.
            if (nIdx + 1 < text.length && specialChars.includes(text[nIdx + 1])) {
                // TODO : 각 특수 상황에 대한 코드 추가 필요.
            }
        }

        // 일반 문자인 경우.
        normalTextCnt += 1;
        nIdx += 1;
    }

    if (normalTextCnt > 0) {
        pushText(text.slice(text.length - normalTextCnt));
    }

    console.log("inline test : " + result.length);

    return result;
}