export interface Cell {
    value: string | undefined;
    locationX: number;
    locationY: number;
}

export class Board {
    private _minX: number;
    private _minY: number;
    private _maxX: number;
    private _maxY: number;

    private readonly _board: string[][] = [];
    public GetCell(x: number, y: number): string {
        if (!this._board[x]) {
            this._board[x] = [];
        }
        
        return this._board[x][y];
    }

    public SetCell(x: number, y: number, value: string): void {
        if (!this._board[x]) {
            this._board[x] = [];
        }

        if (x < this._minX || this._minX === undefined) {
            this._minX = x;
        }
        if (x > this._maxX || this._maxX === undefined) {
            this._maxX = x;
        }
        if (y < this._minY || this._minY === undefined) {
            this._minY = y;
        }
        if (y > this._maxY || this._maxY === undefined) {
            this._maxY = y;
        }

        this._board[x][y] = value;
    }

    public GetExtent(): {x: number[], y: number[]}{
        return {
            x: [this._minX, this._maxX],
            y: [this._minY, this._maxY]
        };
    }
}

export interface Word {
    value: string;
    hintNumber: number;
    startX: number;
    startY: number;
    direction: "h" | "v";
}
