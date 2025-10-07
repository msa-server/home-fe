import { InlineNode, InlineNodeType } from "@/types/markdown";

// 줄 내부 단위로 파싱을 진행.
export function inlineParser(text: string): InlineNode[] {
    const result: InlineNode[] = [];
    
    const specialChars = [
        "_", // 
        "*", //
        "`", // inline code
    ];

    /**
     * 일반적인 문자열을 추가하는 함수.
     * @param s 추가할 문자열
     */
    const pushText = (s: string) => {
        // 빈문자열 검열.
        if (!s) return;
        
        const last = result[-1];

        // 마지막 inline node가 평문이면 거기에 추가하고, 아닌 경우 새로 만들어서 추가 함.
        if (last && last.type === InlineNodeType.NORMAL) {
            last.value +=  s;
        } else {
            result.push({type: InlineNodeType.NORMAL, value: s});
        }
    }

    let nIdx = 0;
    const peekCh = () => text[nIdx] ?? null;
    const nextCh = () => text[++nIdx] ?? null;
    const peekNextCh = () => text[nIdx + 1] ?? null;
    const consumeCh = (cnt: number) => nIdx += cnt;

    const buff = [];

    while (nIdx < text.length) {
        const nowCh = peekCh();

        if (nowCh === null) {
            break;
        }

        // 특수 문법 시작.
        if (nowCh === "$") {
            // 특수 문법 시작전 평문이 존재하면. 추가.
            if (buff.length > 0) {
                pushText(buff.join(''));
                buff.length = 0;
            }

            // $_ 또는 $* 가 아니면 현재 $가 그냥 일반 문자를 의미하게 됨.
            switch(peekNextCh()) {
                case "`": {
                    // consume heading [ $` ] two chars.
                    consumeCh(2);
                    
                    while (peekCh() !== null) {
                        if (peekCh() === "$" && peekNextCh() === "`") {
                            break;
                        }

                        buff.push(peekCh());
                        nextCh();
                    }

                    if (peekCh() === null) {
                        // closing 을 찾지 못한 상황. => 평문임.
                        pushText("$`" + buff.join(''));
                    } else {
                        // closing 을 찾음 => 이라인 코드 블럭
                        consumeCh(2);

                        result.push({
                            type: InlineNodeType.INLINE_CODE,
                            value: buff.join('')
                        })
                    }

                    buff.length = 0;
                    continue;
                }
            }
        }

        // 일반 문자인 경우.
        buff.push(nowCh);
        nextCh();
    }

    if (buff.length > 0) {
        pushText(buff.join(''));
    }

    return result;
}