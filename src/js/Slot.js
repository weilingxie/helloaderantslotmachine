import Reel from './Reel.js';
import Symbol from './Symbol.js';
import { getResult } from './Utility.js';

export default class Slot {
  constructor(domElement, config = {}) {
    Symbol.preload();

    this.currentSymbols = [
      ['A', 'A', 'A'],
      ['D', 'D', 'D'],
      ['E', 'E', 'E'],
      ['R', 'R', 'R'],
      ['A', 'A', 'A'],
      ['N', 'N', 'N'],
      ['T', 'T', 'T'],
    ];

    this.balance = 100;
    document.getElementById('value').innerHTML = this.balance;
    this.cnt = 0;

    this.cheat = null;

    this.result = [];

    this.nextSymbols = [];

    this.container = domElement;

    this.reels = Array.from(this.container.getElementsByClassName('reel')).map((reelContainer, idx) => new Reel(reelContainer, idx, this.currentSymbols[idx]));

    this.spinButton = document.getElementById('spin');
    this.spinButton.addEventListener('click', () => this.spin());

    this.autoPlayCheckbox = document.getElementById('autoplay');

    if (config.inverted) {
      this.container.classList.add('inverted');
    } 
  }

  spin() {
    this.cnt +=1;
    console.log('cnt:',this.cnt);
    this.onSpinStart();
    this.result = [];
    this.currentSymbols = this.nextSymbols;
    this.mod = this.cnt%5;
    this.cheat = Symbol.random();
    //Generate result
    if(this.mod==0){
      for (let i = 0; i < 7; i++) {     
        this.result.push(this.cheat);
      }
    }
    else{
      console.log('normal');
      for (let i = 0; i < 7; i++) {      
        this.result.push(Symbol.random());
      }
    }
  
    console.log('result:');
    console.log(this.result);

    this.nextSymbols = [];
    this.result.forEach((symbol)=>{
      let column = [Symbol.random(), symbol, Symbol.random()];
      this.nextSymbols.push(column);    
    });
    // console.log('nextSymbols');
    // console.log(this.nextSymbols);

    return Promise.all(this.reels.map(reel => {
      reel.renderSymbols(this.currentSymbols[reel.idx], this.nextSymbols[reel.idx]);
      return reel.spin();
    })).then(() => this.onSpinEnd());
  }

  onSpinStart() {
    this.spinButton.disabled = true;
    this.balance = this.balance -1;
  }

  onSpinEnd() {
    this.spinButton.disabled = false;
    this.balance = getResult(this.result, this.balance);
    document.getElementById('value').innerHTML = this.balance;

    if (this.autoPlayCheckbox.checked) return window.setTimeout(() => this.spin(), 200);
  }
}
