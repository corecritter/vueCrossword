import { generate, testHitWord, testWordsIntersect, testWords, makeBoard } from "../src/logic/generate";
import { Word, Cell } from '@/logic/crossword';

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

// const words = generate(answers);

// words.words.forEach(x => {
//     console.log(JSON.stringify(x));
// });

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

    const board1 = makeBoard([w1, w2]);
    printBoard(board1);
    if (!testWords([w1, w2])) {
        return false;
    }

    const board2 = makeBoard([w1, w3]);
    printBoard(board2);
    if (testWords([w1, w3])) {
        return false;
    }

    const board3 = makeBoard([w1, w3]);
    printBoard(board3);
    if (testWords([w1, w3])) {
        return false;
    }

    const board4 = makeBoard([w1, w4]);
    printBoard(board4);
    if (testWords([w1, w4])) {
        return false;
    }

    const board5 = makeBoard([w1, w5]);
    printBoard(board5);
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

function printBoard(board: Cell[][]) {
    let output = "";
    for (let i = 0; i < board.length; i++) {
        if (board[i] !== undefined) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] === undefined) {
                    output += " ";
                } else {
                    output += board[i][j].value;
                }
                output += " ";
            }
        }
        
        output += "\n";
    }

    console.log(output);
    console.log(" ");
    console.log(" ");
    console.log(" ");
    console.log(" ");
}