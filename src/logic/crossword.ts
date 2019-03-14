export interface Cell {
    value: string | undefined;
    locationX: number;
    locationY: number;
}

export type Board = Cell[][];

export interface Word {
    value: string;
    startX: number;
    startY: number;
    direction: "h" | "v";
}
