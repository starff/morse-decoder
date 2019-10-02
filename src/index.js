const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};

function decode(expr) {
    let length = expr.length / 10;    //число букв и пробелов
    let letters = [];
    for (let key in MORSE_TABLE) {  //перебираем обьект, меняем местами ключи и знаения. (остаются старые ключи со значениями, не знаю как их удалить...)
        let changer;
        changer = key;
        delete key;
        key = MORSE_TABLE[key];
        MORSE_TABLE[key] = changer;
    };
   
    for (let key in MORSE_TABLE) {    // строку сплитуем в массив, а там точку меняем на 10, - на 11. после собираем все обратно в строку
        let arrCode = MORSE_TABLE[key].split("");
        for (x = 0; x < arrCode.length; x++) {
            if (arrCode[x] == ".") {
                arrCode[x] = "10";
            } else if (arrCode[x] == "-") {
                arrCode[x] = "11";
            };
        };
        MORSE_TABLE[key] = arrCode.join("");
    };

        
    for(let i = 0; i < length; i++) {  // каждая буква состоит из 10 цифр, поэтому входную строку делим на 10, и каждые 10 цифр помещаем отдельным элементом в массив
        letters[i] = expr.substr(i*10, 10);
    };
    let cleanLetters = letters.map(function(letter) { // так как до 10 цифр догоняется нолями в начало, избавляемся от нулей методом slice
        for(let j = 0; j < 10; j++) {
            if ( letter[j] == "1") {
               return letter = letter.slice(j);
            } else if (letter[j] == "*") {
                return letter = " ";
            };
        };
    });
    let words = cleanLetters.map(function(item) { // проходимся по числовым значениям букв, и подбираем соответствующему числу букву из таблицы
        for (let key in MORSE_TABLE) {
            if ( MORSE_TABLE[key] == item) {
                return item = key;
            } else if ( item == " ") {
            	return item = " ";
            };
        };
    }); 
    return words.join(""); // собираем в строку
};

module.exports = {
    decode
} 