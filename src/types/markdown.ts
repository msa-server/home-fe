export type BlockNode = 
| {type: BlockNodeType.HEADING; depth: 0|1|2|3|4; children: InlineNode[] }
| {type: BlockNodeType.PARAGRAPH; children: InlineNode[]}
| {type: BlockNodeType.CODE_BLOCK; language: string; code: string}
| {type: BlockNodeType.EMPTY_LINE}
| {type: BlockNodeType.LIST_BLOCK; ordered: boolean; items: string[]}
| {type: BlockNodeType.DIVIDER_LINE_NORMAL}
| {type: BlockNodeType.IMAGE; size: number; url: string; desc: string;}
;

export enum BlockNodeType {
    HEADING = "heading",
    PARAGRAPH = "paragraph",
    CODE_BLOCK = "code",
    EMPTY_LINE = "empty_line",
    LIST_BLOCK = "list",
    DIVIDER_LINE_NORMAL = "divider_line_normal",
    IMAGE = "image",
};

export type InlineNode = 
| {type: InlineNodeType.NORMAL; value: string}
| {type: InlineNodeType.INLINE_CODE; value: string}
| {type: InlineNodeType.EMPHASIS; children: InlineNode[]}
| {type: InlineNodeType.ITALIC; children: InlineNode[]}
| {type: InlineNodeType.LINK; url: string, placeholder: string | null}
;

export enum InlineNodeType {
    NORMAL = "text",
    INLINE_CODE = "inline_code",
    EMPHASIS = "emphasis",
    ITALIC = "italic",
    LINK = "link",
}