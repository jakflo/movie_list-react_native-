function roundToEven(number) {
    number = Math.round(number);
    return number % 2 === 1? number - 1 : number; 
}

module.exports = {roundToEven};

