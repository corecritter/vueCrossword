import { generate, testHitWord, testWordsIntersect, testWords, makeBoard, placeWord } from "../src/logic/generate";
import { Word, Cell, Board } from '@/logic/crossword';

const answers = [ "cow", "chickens", "hogs" ];



if (t_testHitWord()) {
    console.log("testHistWord ... ok");
} else {
    console.error("testHistWord ... fail");
}

if (t_testWordsIntersect()) {
    console.log("testWordsIntersect ... ok");
} else {
    console.error("testWordsIntersect ... fail");
}

if (t_testWords()) {
    console.log("testWords ... ok");
} else {
    console.error("testWords .. fail");
}

if (t_placeWord()) {
    console.log("placeWords ... ok");
} else {
    console.error("placeWords ... fail");
}

const generateResults = generate(answers);
if (generateResults.success) {
    printBoard(makeBoard(generateResults.words));
} else {
    console.error("Could not make board");
}


/// Test functions

function t_testWords(): boolean {
    const w1: Word = {
        value: "cow",
        direction: "h",
        startX: 1,
        startY: 2
    };

    const w2: Word = {
        value: "crow",
        direction: "v",
        startX: 2,
        startY: 0
    };

    // Does not intersect with 1 or 2
    const w3: Word = {
        value: "chicken",
        direction: "v",
        startX: 0,
        startY: 0
    };

    // Overlaps 1
    const w4: Word = {
        value: "chicken",
        direction: "h",
        startX: 1,
        startY: 2
    };

    // Invalid intersect character on 2
    const w5: Word = {
        value: "chicken",
        direction: "h",
        startX: 1,
        startY: 0
    };

    //printBoard(makeBoard([w1, w2]));
    if (!testWords([w1, w2])) {
        return false;
    }

    //printBoard(makeBoard([w1, w3]));
    if (testWords([w1, w3])) {
        return false;
    }

    //printBoard(makeBoard([w1, w3]));
    if (testWords([w1, w3])) {
        return false;
    }

    //printBoard(makeBoard([w1, w4]));
    if (testWords([w1, w4])) {
        return false;
    }

    //printBoard(makeBoard([w2, w5]));
    if (testWords([w2, w5])) {
        return false;
    }

    return true;
}

function t_testWordsIntersect(): boolean {
    const w1: Word = {
        value: "cow",
        direction: "h",
        startX: 8,
        startY: 2
    };

    const w2: Word = {
        value: "crow",
        direction: "v",
        startX: 9,
        startY: 0
    };

    const w3: Word = {
        value: "crow",
        direction: "v",
        startX: 7,
        startY: 0
    };


    if (!testWordsIntersect(w1, w2)) {
        return false;
    }
    if (!testWordsIntersect(w2, w1)) {
        return false;
    }
    if (testWordsIntersect(w1, w3)) {
        return false;
    }


    return true;
}

function t_testHitWord(): boolean {
    const w1: Word = {
        value: "cow",
        direction: "h",
        startX: 8,
        startY: 2
    };
    const w2: Word = {
        value: "cow",
        direction: "v",
        startX: 8,
        startY: 2
    };

    const result1 = testHitWord(w1, 9, 2);
    const result2 = testHitWord(w1, 7, 2);
    const result3 = testHitWord(w2, 9, 2);
    const result4 = testHitWord(w2, 8, 3);
    if (!result1.doesHit || result1.letter !== "o") {
        return false;
    }

    if (result2.doesHit) {
        return false;
    }

    if (result3.doesHit) {
        return false;
    }


    if (!result4.doesHit || result1.letter !== "o") {
        return false;
    }
    return true;
}

function t_placeWord(): boolean {
    const w1: Word = {
        value: "cow",
        direction: "h",
        startX: 0,
        startY: 0
    };

    const w2: Word = {
        value: "chickens",
        direction: "v",
        startX: 0,
        startY: 0
    };

    const placeResults = placeWord([w1, w2], "pig");
    if (!placeResults.success) {
        return false;
    }

    return true;
}

function printBoard(board: Board) {
    const boardExtent = board.GetExtent();
    let output = "\n";
    for (let i = boardExtent.y[0]; i <= boardExtent.y[1]; i++) {
        for (let j = boardExtent.x[0]; j <= boardExtent.x[1]; j++) {
            const value = board.GetCell(j, i);
            if (value === undefined) {
                output += " ";
            } else {
                output += value;
            }
            output += " ";
        }
        output += "\n";
    }

    console.log(output);
    console.log(" ");
}