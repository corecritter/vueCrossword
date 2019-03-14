import { Word, Board, Cell } from './crossword';

export function generate(inputs: ReadonlyArray<string>): { words: Array<Word>, wasSuccessful: boolean} {
    let words: Readonly<Word>[] = [{
        direction: "h",
        value: inputs[0],
        startX: 0,
        startY: 0
    }];

    const remainingWords = inputs.concat([]);
    while(remainingWords.length > 0) {
        for (let i = 1; i < inputs.length; i++) {
            let results = placeWord(words, inputs[i]);
            if (results) {
                words = results.words;
                break;
            }
        }
    }

    return {words: [], wasSuccessful: false};
}

function placeWord(placed: ReadonlyArray<Readonly<Word>>, nextWord: string): { words: Array<Word>, wasSuccessful: boolean} {
    const items = placed.map(x => { value: x.value; startX: x.startX; startY: x.startY; direction: x.direction });
    
    const letters: Map<String, {x: number, y: number}[]> = new Map<String, {x: number, y: number}[]>();
    for (let i = 0; i < placed.length; i++) {
        const word = placed[i];
        if (word.direction === "h") {
            for (let j = 0; j < word.value.length; j++) {
                const letter = word.value[j];
                let positions = letters.get(letter);
                if (positions === undefined) {
                    positions = []
                }

                let doesExist = false;
                for (let k = 0; k < positions.length; k++) {
                    if ((positions[k].x !== word.startX + k) &&
                        (positions[k].y !== word.startY)) {
                        doesExist = true;
                        break;
                    }
                }
                if (!doesExist) {
                    positions.push({x: word.startX + j,  y: word.startY});
                }
                letters.set(letter, positions);
            }
        } else {
            for (let j = 0; j < word.value.length; j++) {
                const letter = word.value[j];
                let positions = letters.get(letter);
                if (positions === undefined) {
                    positions = []
                }

                for (let k = 0; k < positions.length; k++) {
                    if ((positions[k].x !== word.startX) &&
                        (positions[k].y !== word.startY + k)) {
                        positions.push({x: word.startX,  y: word.startY + k});
                    }
                }
            }
        }
        
    }

    for (let i = 0; i < nextWord.length; i++) {
        let letterPositions = letters.get(nextWord[i]);
        if (letterPositions === undefined) {
            continue;
        }

        for (let j = 0; j < nextWord.length; j++) {
            const testWordH: Word = {
                direction: "h",
                value: nextWord,
                startX: letterPositions[j].x - j,
                startY: letterPositions[j].y
            }
            const placedNextH = placed.concat([testWordH]);
            if (testWords(placedNextH)) {
                return {words: placedNextH, wasSuccessful: true};
            }

            const testWordV: Word = {
                direction: "v",
                value: nextWord,
                startX: letterPositions[j].x,
                startY: letterPositions[j].y - j
            }
            const placedNextV = placed.concat([testWordV]);
            if (testWords(placedNextV)) {
                return {words: placedNextH, wasSuccessful: true};
            }
        }
    }

    return { words: [], wasSuccessful: false };
}

export function makeBoard(input: ReadonlyArray<Readonly<Word>>): Board {
    let board: Board = [];
    for (let i = 0; i < input.length; i++) {
        let word = input[i];
        let wordLength = word.value.length;
        for (let j = 0; j < wordLength; j++) {
            if (word.direction === "h") {
                if (!board[word.startX + j]) {
                    board[word.startX + j] = [];
                }
                board[word.startX + j][word.startY] = { 
                    value: word.value[j],
                    locationX: word.startX + j,
                    locationY: word.startY
                };
            } else {
                if (!board[word.startX]) {
                    board[word.startX] = [];
                }
                board[word.startX][word.startY + j] = { 
                    value: word.value[j],
                    locationX: word.startX,
                    locationY: word.startY + j
                };
            }
        }
    }

    return board;
}

export function testWords(input: ReadonlyArray<Readonly<Word>>): boolean {
    if (input.length === 1) {
        return true;
    }

    // Every word must have at least one intersection with another word
    for (let i = 0; i < input.length; i++) {
        let intersectionFound = false;
        for (let j = 0; j < input.length; j++) {
            if (i === j) {
                continue;
            }

            if (testWordsIntersect(input[i], input[j])) {
                intersectionFound = true;
                break;
            }
        }

        if (!intersectionFound) {
            return false;
        }
    }

    // const cells = makeBoard(input);
    // printBoard(cells);
    // for (let i = 0; i < input.length; i++) {
    //     const word = input[i];
    //     for (let j = 0; j < input.length; j++) {
    //         if (i === j) {
    //             continue;
    //         }
    //     }
    // }

    return true;
}

export function testWordsIntersect(w1: Readonly<Word>, w2: Readonly<Word>): boolean {
    if (w1.direction === w2.direction) {
        if (w1.direction === "h") {
            if (w1.startY === w2.startY) {
                if (w1.startX === w2.startX) {
                    return false;
                }

                if (w1.startX < w2.startX) {
                    if ((w1.value.length + w1.startX) >= w2.startX) {
                        return false;
                    }
                } else {
                    if ((w2.value.length + w2.startX >= w1.startX)) {
                        return false;
                    }
                }
            }
        } else {
            if (w1.startX === w2.startX) {
                if (w1.startY === w2.startY) {
                    return false;
                }

                if (w1.startY < w2.startY) {
                    if ((w1.value.length + w1.startY) >= w2.startY) {
                        return false;
                    }
                } else {
                    if ((w2.value.length + w2.startY >= w1.startY)) {
                        return false;
                    }
                }
            }
        }
    }

    if (w1.direction === "h") {
        for (let i = 0; i < w1.value.length; i++) {
            const hitTest = testHitWord(w2, w1.startX + i, w1.startY);
            if (hitTest.doesHit) {
                if (hitTest.letter != w1.value[i]) {
                    return false;
                }
                return true;
            }
        }        
    } else {
        for (let i = 0; i < w1.value.length; i++) {
            const hitTest = testHitWord(w2, w1.startX, w1.startY + i);
            if (hitTest.doesHit) {
                if (hitTest.letter != w1.value[i]) {
                    return false;
                }
                return true;
            }
        }
    }
    return false;
}

function testHitWords(input: ReadonlyArray<Readonly<Word>>, x: number, y: number): boolean {
    for (let i = 0; i < input.length; i++) {
        if (!testHitWord(input[i], x, y)) {
            return false;
        }
    }
    return true;
}

export function testHitWord(input: Readonly<Word>, x: number, y: number): { doesHit: boolean, letter: string} {
    if (input.direction === "h") {
        if (input.startY != y) {
            return { doesHit: false, letter: ""};
        }

        if (input.startX <= x && input.startX + input.value.length >= x) {
            return { doesHit: true, letter: input.value[x - input.startX]};
        }
    } else {
        if (input.startX != x) {
            return { doesHit: false, letter: ""};
        }

        if (input.startY <= y && input.startY + input.value.length >= y) {
            return { doesHit: true, letter: input.value[y - input.startY]};
        }
    }

    return { doesHit: false, letter: ""};
}