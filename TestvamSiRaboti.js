function bombNumbers(sequence, special) {
    let specialNum = special[0];
    let range = special[1];
 
    for (let i = 0; i < sequence.length; i++) {
        let item = sequence[i];
        if (item == specialNum) {
            if (sequence.indexOf(item) == 0) {
                for(let y = 0; y < range + 1; y++){
                    sequence.shift();
                }
            } else if (sequence.indexOf(item) == sequence.length - 1) {
                for(let x = 0; x < range + 1; x++){
                    sequence.pop();
                }
            } else {
                sequence.splice(Math.max(0, sequence.indexOf(item) - range), range * 2 + 1);
            }
            i = 0;
        }
    }
 
    let sum = 0;
    sequence.forEach(item => sum += item);
    console.log(sum);
}