const countRepeatedChar = (original) => {
    let prevChar = null;
    let currentCount = 1;
    let maxCount = 1;

    original.forEach((x) => {        
        if (currentCount !== null && prevChar !== null && prevChar === x){
            
            currentCount = currentCount + 1;
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

const setEffect =  (type) => {
    if (type==="Bigwin"){
        //visual
        $(document).ready(function() {
            let f = document.getElementById('reels');
            let t = document.getElementById('title-container');
            //Start flashing
            let interval = setInterval(function() {
                f.style.border = (f.style.border == "" ? "5px dotted yellow" : "");
                t.style.transform = (t.style.transform == "" ?"scale(1.5)" : "");
            }, 100);
            //Stop flashing
            setTimeout(function() {clearInterval(interval)},3000);
        });
        //sound
        playSound(type);
    }
    else if (type==="Allthesame"){
        //visual
        $(document).ready(function() {
            let f = document.getElementById('reels');
            let t = document.getElementById('title-container');
            //Start flashing
            let interval = setInterval(function() {
                f.style.border = (f.style.border == "" ? "5px dotted yellow" : "");
                t.style.border = (t.style.border == "" ? "5px solid green" : "");
            }, 100);
            //Stop flashing
            setTimeout(function() {clearInterval(interval)},3000);
        });
        //sound
        playSound(type);
    }
    else if (type==="Reward"){
        //visual
        $(document).ready(function() {
            var f = document.getElementById('reels');
            //Start flashing
            var interval = setInterval(function() {
                f.style.border = (f.style.border == "" ? "5px dotted yellow" : "");
            }, 100);
            //Stop flashing
            setTimeout(function() {clearInterval(interval)},3000);
        });
        //sound
        playSound(type);
    }   
}

const getResult = (original, balance) => {
    let reward = 0;
    let repeatedChar = 1;
    let type = 'normal';
    repeatedChar = countRepeatedChar(original);
    if (original.join('') === 'ADERANT'){
        reward = 9999;
        type = 'Bigwin';
    }
    else if (repeatedChar === 7){
        reward = calculateReward(repeatedChar);
        type = "Allthesame";
    }
    else if (repeatedChar > 2) {        
        reward = calculateReward(repeatedChar);
        type = "Reward";
    }

    setEffect(type);
    return balance + reward;
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }

const playSound = (type) => {
    let name = `sounds/${type}.wav`;
    let audio = new sound(name);
    audio.play();
}

export { getResult, playSound }

