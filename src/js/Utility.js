
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

export { countRepeatedChar }

