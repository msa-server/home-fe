import { InlineNode, InlineNodeType } from "@/types/markdown";


/**
 * 파서 컨텍스트 (커서/퍼버/결과 를 한 곳에 모음)
 */
type Context = {
    // type
    text: string;
    nIdx: number;
    buf: string[];
    result: InlineNode[];
    // helpers
    haveCh: () => boolean;
    peekCh: (offset?: number) => string | null;
    nextCh: () => string | null;
    peekNextCh: () => string | null;
    rollbackCh: () => void;
    consumeCh: (n: number) => void;
    flushBufAsText: (prefix?: string, suffix?: string) => void;
    pushBuf: () => void;
}

// Context 생성자.
function createContext(text: string): Context {
    const result: InlineNode[] = [];
    const buf: string[] = [];
    let nIdx = 0;

    // 현재 글자를 가져옴
    const peekCh = () => text[nIdx] ?? null;

    // 다음 글자로 이동
    const nextCh = () => text[++nIdx] ?? null;

    // 다음 글자 미리 보기
    const peekNextCh = () => text[nIdx + 1] ?? null;

    // 임의로 n개의 문자를 소비
    const consumeCh = (cnt: number) => nIdx += cnt;

    // buf에 현재 문자를 추가.
    const pushBuf = () => {
        buf.push(peekCh());
        nextCh();
    }

    // 현재 버퍼에 있는 문자들을 일반 문자로 변환.
    const flushBufAsText = (prefix?: string, suffix?: string) => {
        const data = `${prefix ?? ""}${buf.join("")}${suffix ?? ""}`;
        buf.length = 0;

        if (data.length) {
            const last = result[-1];

            // 마지막 inline node가 평문이면 거기에 추가하고, 아닌 경우 새로 만들어서 추가 함.
            if (last && last.type === InlineNodeType.NORMAL) {
                last.value +=  data;
            } else {
                result.push({type: InlineNodeType.NORMAL, value: data});
            }
        }
    }

    // 현재 buf 만큼 nIdx 롤백 시킴.
    const rollbackCh = () => {
        nIdx -= buf.length;
        buf.length = 0;
    }

    // 문자 존재 여부
    const haveCh = () => {
        return nIdx < text.length;
    }

    return {text, nIdx, buf, result, 
        peekCh, nextCh, peekNextCh,  consumeCh, flushBufAsText, pushBuf, haveCh, rollbackCh};
}

// 줄 내부 단위로 파싱을 진행.
export function inlineParser(text: string): InlineNode[] {
    const ctx = createContext(text);

    while (ctx.haveCh()) {
        const nowCh = ctx.peekCh();

        if (nowCh === null) {
            break;
        }

        // 특수 문법 시작.
        if (nowCh === "$") {
            // 특수 문법 시작전 평문이 존재하면, 추가.
            if (ctx.buf.length > 0) {
                ctx.flushBufAsText();
            }

            // 특수문자 확인.
            switch(ctx.peekNextCh()) {
                case "`": {
                    tryParseInlineCode(ctx);
                    continue;
                }
                case "*": {
                    tryParseEmphasis(ctx);
                    continue;
                }
                case "_": {
                    tryParseItalic(ctx);
                    continue;
                }
                case "[": {
                    tryParseLink(ctx);
                    continue;
                }
            }
        }

        // 일반 문자인 경우.
        ctx.pushBuf();
    }

    ctx.flushBufAsText();

    return ctx.result;
}

function tryParseInlineCode(ctx: Context): void {
    // consume heading [ $` ] two chars.
    ctx.consumeCh(2);

    // 코드 블럭내 글자 하나씩 처리.
    while (ctx.haveCh()) {
        // closing 이나오면 종료.
        if (ctx.peekCh() === '$' && ctx.peekNextCh() === '`') {
            break;
        }

        ctx.pushBuf();
    }

    // 정상적인 탈출의 경우 ctx.peekCh() 가 closing의 $ 를 가리키게 됨.

    if (ctx.haveCh()) {
        // closing 소비
        ctx.consumeCh(2);

        ctx.result.push({
            type: InlineNodeType.INLINE_CODE,
            value: ctx.buf.join("")
        });
        ctx.buf.length = 0;
    } else {
        // closing을 찾지 못함.
        ctx.rollbackCh();
        ctx.flushBufAsText("$`");
    }
}

function tryParseEmphasis(ctx: Context): void {
    // consume heading [ $* ] two chars.
    ctx.consumeCh(2);
    
    // 코드 블럭내 글자 하나씩 처리.
    while (ctx.haveCh()) {
        // closing 이나오면 종료.
        if (ctx.peekCh() === '$' && ctx.peekNextCh() === '*') {
            break;
        }

        ctx.pushBuf();
    }

    // 정상적인 탈출의 경우 ctx.peekCh() 가 closing의 $ 를 가리키게 됨.

    if (ctx.haveCh()) {
        // closing 소비
        ctx.consumeCh(2);

        console.log("ctx.buf : " + ctx.buf.join(""));
        ctx.result.push({
            type: InlineNodeType.EMPHASIS,
            children: inlineParser(ctx.buf.join(""))
        });
        ctx.buf.length = 0;
    } else {
        // closing을 찾지 못함.
        ctx.rollbackCh();
        ctx.flushBufAsText("$*");
    }
}

function tryParseItalic(ctx: Context): void {
    // consume heading [ $_ ] two chars.
    ctx.consumeCh(2);
    
    // 코드 블럭내 글자 하나씩 처리.
    while (ctx.haveCh()) {
        // closing 이나오면 종료.
        if (ctx.peekCh() === '$' && ctx.peekNextCh() === '_') {
            break;
        }

        ctx.pushBuf();
    }

    // 정상적인 탈출의 경우 ctx.peekCh() 가 closing의 $ 를 가리키게 됨.

    if (ctx.haveCh()) {
        // closing 소비
        ctx.consumeCh(2);

        console.log("ctx.buf : " + ctx.buf.join(""));
        ctx.result.push({
            type: InlineNodeType.ITALIC,
            children: inlineParser(ctx.buf.join(""))
        });
        ctx.buf.length = 0;
    } else {
        // closing을 찾지 못함.
        ctx.rollbackCh();
        ctx.flushBufAsText("$_");
    }
}

function tryParseLink(ctx: Context): void {
    // consume heading [ $_ ] two chars.
    ctx.consumeCh(2);

    // 1. 표기할 텍스트 파싱
    while (ctx.haveCh()) {
        if (ctx.peekCh() === ']' && ctx.peekNextCh() === '(') {
            break;
        }

        ctx.pushBuf();
    }

    // 비정상적인 탈출의 경우 => 롤백 및 종료
    if (!ctx.haveCh()) {
        ctx.rollbackCh();
        ctx.flushBufAsText("$[")
        return;
    }

    // consume placeholder footer :  "](" 
    ctx.pushBuf()
    ctx.pushBuf()

    // 2. 이동할 링크 파싱.
    while(ctx.haveCh()) {
        if (ctx.peekCh() === ')') {
            break;
        }

        ctx.pushBuf();
    }

    // 정상적인 탈출의 경우 peekCh() == ')'
    if (ctx.haveCh()) {
        // closing 소비
        ctx.consumeCh(1);

        const data = ctx.buf.join("").split("](");
        
        ctx.result.push({
            type: InlineNodeType.LINK,
            placeholder: data[0],
            url: data[1].startsWith("http") ? data[1] : `https://${data[1]}`
        })
        
        ctx.buf.length = 0;
    } else {
        ctx.rollbackCh()
        ctx.flushBufAsText("$[");
    }
}