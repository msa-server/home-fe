export type BlockNode = 
| {type: BlockNodeType.HEADING; depth: 0|1|2|3|4|5; children: InlineNode[] }
;

export enum BlockNodeType {
    HEADING = "h1",
};

export type InlineNode = 
| {type: "text"; value: string}
;

export enum InlineNodeType {
    NORMAL = "text",
}