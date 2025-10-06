export type BlockNode = 
| {type: BlockNodeType.HEADING; depth: 0|1|2|3|4|5; children: InlineNode[] }
| {type: BlockNodeType.PARAGRAPH; children: InlineNode[]}
| {type: BlockNodeType.CODE_BLOCK; language: string; code: string}
| {type: BlockNodeType.EMPTY_LINE}
;

export enum BlockNodeType {
    HEADING = "heading",
    PARAGRAPH = "paragraph",
    CODE_BLOCK = "code",
    EMPTY_LINE = "empty_line"
};

export type InlineNode = 
| {type: "text"; value: string}
;

export enum InlineNodeType {
    NORMAL = "text",
}