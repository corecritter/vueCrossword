import { Word, Board, Cell } from './crossword';

export function generate(inputs: ReadonlyArray<string>): { words: Array<Word>, success: boolean} {
    const words = inputs.concat([]);
    const placeResults = tryPlaceWords([], words);
    if (placeResults.success) {
        return { success: true, words: labelWords(placeResults.words) }
    } else {
        return { success: false, words: [] };
    }
}

function tryPlaceWords(placed: Readonly<Word>[], notPlaced: ReadonlyArray<string>): { words: Readonly<Word>[], success: boolean} {
    if (placed.length === 0) {
        const remainingWords = notPlaced.slice(1);

        let firstWordH: Readonly<Word> = {
            direction: "h",
            value: notPlaced[0],
            startX: 0,
            startY: 0
        };
    
        const firstPlaceH = tryPlaceWords([firstWordH], remainingWords);
        if (firstPlaceH.success) {
            return firstPlaceH;
        }

        let firstWordV: Readonly<Word> = {
            direction: "v",
            value: notPlaced[0],
            startX: 0,
            startY: 0
        };
        return tryPlaceWords([firstWordV], remainingWords);
    }
    if (notPlaced.length === 0) {
        return { words: placed, success: true};
    }
    for (let i = 0; i < notPlaced.length; i++) {
        const placeResults = placeWord(placed, notPlaced[i]);
        if (placeResults.success) {
            const cloned = notPlaced.concat([]);
            const removedWord = cloned.splice(i, 1);
            const nextPlaceResult = tryPlaceWords(placeResults.words, cloned);
            if (nextPlaceResult.success) {
                return nextPlaceResult;
            }
        }
    }
    return { words: [], success: false};
}

export function placeWord(placed: ReadonlyArray<Readonly<Word>>, nextWord: string): { words: Array<Word>, success: boolean} {   
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
                    if ((positions[k].x === word.startX + j) &&
                        (positions[k].y === word.startY)) {
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

                let doesExist = false;
                for (let k = 0; k < positions.length; k++) {
                    if ((positions[k].x === word.startX) &&
                        (positions[k].y === word.startY + j)) {
                        doesExist = true;
                        break;
                    }
                }
                if (!doesExist) {
                    positions.push({x: word.startX,  y: word.startY + j});
                }
                letters.set(letter, positions);
            }
        }
        
    }

    for (let i = 0; i < nextWord.length; i++) {
        let letterPositions = letters.get(nextWord[i]);
        if (letterPositions === undefined) {
            continue;
        }

        for (let j = 0; j < letterPositions.length; j++) {
            const testWordH: Word = {
                direction: "h",
                value: nextWord,
                startX: letterPositions[j].x - i,
                startY: letterPositions[j].y
            }
            const placedNextH = placed.concat([testWordH]);
            if (testWords(placedNextH)) {
                return {words: placedNextH, success: true};
            }

            const testWordV: Word = {
                direction: "v",
                value: nextWord,
                startX: letterPositions[j].x,
                startY: letterPositions[j].y - i
            }
            const placedNextV = placed.concat([testWordV]);
            if (testWords(placedNextV)) {
                return {words: placedNextV, success: true};
            }
        }
    }

    return { words: [], success: false };
}

export function makeBoard(input: ReadonlyArray<Readonly<Word>>): Board {
    let board: Board = new Board();;
    for (let i = 0; i < input.length; i++) {
        let word = input[i];
        let wordLength = word.value.length;
        for (let j = 0; j < wordLength; j++) {
            let cell: Cell;
            if (word.direction === "h") {
                cell = {
                    cellNumber: j == 0 ? word.cellNumber : undefined,
                    locationX: word.startX + j,
                    locationY: word.startY,
                    value: word.value[j]
                };
            } else {
                cell = {
                    cellNumber: j == 0 ? word.cellNumber : undefined,
                    locationX: word.startX,
                    locationY: word.startY + j,
                    value: word.value[j]
                };
            }
            board.SetCell(cell);
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
                // Words that intersect going the same direction must 
                // overlap which is not allowed
                if (input[i].direction === input[j].direction) {
                    return false;
                }

                for (let k = 0; k < input[i].value.length; k++) {
                    if (input[i].direction === "h") {
                        const hitTestResult = testHitWord(input[j], input[i].startX + k, input[i].startY);
                        if (hitTestResult.doesHit && hitTestResult.letter !== input[i].value[k]) {
                            return false;
                        }
                    } else {
                        const hitTestResult = testHitWord(input[j], input[i].startX, input[i].startY + k);
                        if (hitTestResult.doesHit && hitTestResult.letter !== input[i].value[k]) {
                            return false;
                        }
                    }
                    
                }

                intersectionFound = true;
            }
        }

        if (!intersectionFound) {
            return false;
        }
    }

    // Any cell immediately perpendicular to the word must be a character of
    // another word or be empty
    for (let i = 0; i < input.length; i++) {
        const testWord = input[i];
        for (let j = -1; j < testWord.value.length; j++) {
            let p1: {x: number, y: number}, p2: {x:number, y: number};
            if (j >= 0) {
                if (testWord.direction === "h") {
                    p1 = {
                        x: testWord.startX + j,
                        y: testWord.startY - 1
                    };
                    p2 = {
                        x: testWord.startX + j,
                        y: testWord.startY + 1
                    };
                } else {
                    p1 = {
                        x: testWord.startX - 1,
                        y: testWord.startY + j
                    };
                    p2 = {
                        x: testWord.startX + 1,
                        y: testWord.startY + j
                    };
                }
            } else {
                if (testWord.direction === "h") {
                    p1 = {
                        x: testWord.startX - 1,
                        y: testWord.startY
                    };
                    p2 = {
                        x: testWord.startX + testWord.value.length + 1,
                        y: testWord.startY
                    };
                } else {
                    p1 = {
                        x: testWord.startX,
                        y: testWord.startY - 1
                    };
                    p2 = {
                        x: testWord.startX,
                        y: testWord.startY + testWord.value.length + 1
                    };
                }
            }

            for (let k = 0; k < input.length; k++) {
                if (i === k) {
                    continue;
                }

                const p1TestHit = testHitWord(input[k], p1.x, p1.y);
                if (p1TestHit.doesHit) {
                    if (input[k].direction === testWord.direction) {
                        return false;
                    } else {
                        if (testWord.direction === "h") {
                            if (!testHitWord(input[k], testWord.startX + j, testWord.startY).doesHit) {
                                return false;
                            }
                        } else {
                            if (!testHitWord(input[k], testWord.startX, testWord.startY + j).doesHit) {
                                return false;
                            }
                        }
                    }
                }

                const p2TestHit = testHitWord(input[k], p2.x, p2.y);
                if (p2TestHit.doesHit) { 
                    if (input[k].direction === testWord.direction) {
                        return false;
                    } else {
                        if (testWord.direction === "h") {
                            if (!testHitWord(input[k], testWord.startX + j, testWord.startY).doesHit) {
                                return false;
                            }
                        } else {
                            if (!testHitWord(input[k], testWord.startX, testWord.startY + j).doesHit) {
                                return false;
                            }
                        }
                    }
                }
            }
        }
    }

    return true;
}

export function testWordsIntersect(w1: Readonly<Word>, w2: Readonly<Word>): boolean {
    if (w1.direction === w2.direction) {
        if (w1.direction === "h") {
            if (w1.startY !== w2.startY) {
                return false;
            }

            if (w1.startX === w2.startX) {
                return true;
            }

            if (w1.startX < w2.startX) {
                if ((w1.value.length + w1.startX) >= w2.startX) {
                    return true;
                }
            } else {
                if ((w2.value.length + w2.startX >= w1.startX)) {
                    return true;
                }
            }
        } else {
            if (w1.startX !== w2.startX) {
                return false;
            }

            if (w1.startY === w2.startY) {
                return true;
            }

            if (w1.startY < w2.startY) {
                if ((w1.value.length + w1.startY) >= w2.startY) {
                    return true;
                }
            } else {
                if ((w2.value.length + w2.startY >= w1.startY)) {
                    return true;
                }
            }
        }
    }

    if (w1.direction === "h") {
        for (let i = 0; i < w1.value.length; i++) {
            const hitTest = testHitWord(w2, w1.startX + i, w1.startY);
            if (hitTest.doesHit) {
                // if (hitTest.letter !== w2.value[i]) {
                //     return false;
                // }
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

export function testHitWord(input: Readonly<Word>, x: number, y: number): { doesHit: boolean, letter: string} {
    if (input.direction === "h") {
        if (input.startY != y) {
            return { doesHit: false, letter: ""};
        }

        if (input.startX <= x && input.startX + input.value.length > x) {
            return { doesHit: true, letter: input.value[x - input.startX]};
        }
    } else {
        if (input.startX != x) {
            return { doesHit: false, letter: ""};
        }

        if (input.startY <= y && input.startY + input.value.length > y) {
            return { doesHit: true, letter: input.value[y - input.startY]};
        }
    }

    return { doesHit: false, letter: ""};
}

function labelWords(input: ReadonlyArray<Readonly<Word>>): Array<Word> {
    const d = input
    .map(x => {
        const distance = Math.floor(Math.sqrt(Math.pow(x.startX, 2) + Math.pow(x.startY, 2)))
        return {
            d: x.startX > 0 ? distance : distance * -1,
            w: x
        };
    })
    .sort(x => x.d);

    let count = 1;
    const returnWords = [];
    let previous: Word | undefined;
    for (let i = 0; i < d.length; i++) {
        if (i === 0) {
            const returnWord: Word = {
                cellNumber: count,
                startX: d[i].w.startX,
                startY: d[i].w.startY,
                direction: d[i].w.direction,
                value: d[i].w.value
            };
            count++;
            previous = returnWord;
            returnWords.push(returnWord);
            continue;
        }
        
        const word = d[i].w;
        if (word.startX === d[i - 1].w.startX &&
            word.startY === d[i - 1].w.startY) {
                const returnWord: Word = {
                    cellNumber: previous.cellNumber,
                    startX: d[i].w.startX,
                    startY: d[i].w.startY,
                    direction: d[i].w.direction,
                    value: d[i].w.value
                };
                previous = returnWord;
                returnWords.push(returnWord);
        } else {
            const returnWord: Word = {
                cellNumber: count,
                startX: d[i].w.startX,
                startY: d[i].w.startY,
                direction: d[i].w.direction,
                value: d[i].w.value
            };
            count++;
            previous = returnWord;
            returnWords.push(returnWord);
        }
    }
    return returnWords;
}

export function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
