import { setLocalStorage, getLocalStorage } from './LocalStorage.js';

const countRepeatedChar = (original) => {
    //console.log(original);
    let prevChar = null;
    let currentCount = 1;
    let maxCount = 1;

    original.forEach((x) => {
        //console.log(`x=${x}   prevChar=${prevChar}  currentCount=${currentCount}    maxCount=${maxCount}`);
        
        if (currentCount !== null && prevChar !== null && prevChar === x){
            
            currentCount = currentCount + 1;
            //console.log(`Equal   currentCount=${currentCount}`);
            if (currentCount > maxCount)
                maxCount = currentCount;
        }
        else
            currentCount = 1;
        prevChar = x;
    });    
    
    return maxCount;
}

const calculateReward = (repeatedChar) => Math.pow(2,(repeatedChar-3))*10;

const getResult = (original, balance) => {
    let reward = 0;
    if (original.join('') === 'ADERANT')
        reward = 9999;
    else {
        let repeatedChar = countRepeatedChar(original);
        if (repeatedChar > 2)
            reward = calculateReward(repeatedChar);
    }
    // If there is a reward, start flashing for 5 seconds
    if (reward > 0){
        $(document).ready(function() {
            var f = document.getElementById('reels');
            //Start flashing
            var interval = setInterval(function() {
                f.style.border = (f.style.border == "" ? "5px dotted yellow" : "");
            }, 100);
            //Stop flashing
            setTimeout(function() {clearInterval(interval)},3000);
        });
    }

    return balance + reward;
}

export { getResult }

