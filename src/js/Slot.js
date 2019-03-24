import Reel from './Reel.js';
import Symbol from './Symbol.js';
import { countRepeatedChar } from './Utility.js';

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
    this.onSpinStart();
    this.result = [];
    this.currentSymbols = this.nextSymbols;

    //Generate result
    for (let i = 0; i < 7; i++) { 
      this.result.push(Symbol.random());
    }
    console.log('result:');
    console.log(this.result);

    this.nextSymbols = [];
    this.result.forEach((symbol)=>{
      let column = [Symbol.random(), symbol, Symbol.random()];
      this.nextSymbols.push(column);    
    });
    console.log('nextSymbols');
    console.log(this.nextSymbols);

    return Promise.all(this.reels.map(reel => {
      reel.renderSymbols(this.currentSymbols[reel.idx], this.nextSymbols[reel.idx]);
      return reel.spin();
    })).then(() => this.onSpinEnd());
  }

  onSpinStart() {
    this.spinButton.disabled = true;

    console.log('SPIN START');
  }

  onSpinEnd() {
    this.spinButton.disabled = false;
    alert(countRepeatedChar(this.result));
    
    console.log('SPIN END');

    if (this.autoPlayCheckbox.checked) return window.setTimeout(() => this.spin(), 200);
  }
}
