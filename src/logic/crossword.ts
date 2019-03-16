export interface Cell {
    value: string | undefined;
    locationX: number;
    locationY: number;
    cellNumber: number | undefined;
}

export class Board {
    private _minX: number;
    private _minY: number;
    private _maxX: number;
    private _maxY: number;

    private readonly _board: Cell[][] = [];
    public GetCell(x: number, y: number): Cell {
        if (!this._board[x]) {
            this._board[x] = [];
        }
        
        return this._board[x][y];
    }

    public SetCell(value: Cell): void {
        if (!this._board[value.locationX]) {
            this._board[value.locationX] = [];
        }

        if (value.locationX < this._minX || this._minX === undefined) {
            this._minX = value.locationX;
        }
        if (value.locationX > this._maxX || this._maxX === undefined) {
            this._maxX = value.locationX;
        }
        if (value.locationY < this._minY || this._minY === undefined) {
            this._minY = value.locationY;
        }
        if (value.locationY > this._maxY || this._maxY === undefined) {
            this._maxY = value.locationY;
        }

        this._board[value.locationX][value.locationY] = value;
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
    cellNumber?: number;
    startX: number;
    startY: number;
    direction: "h" | "v";
}
