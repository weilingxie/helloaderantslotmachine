import Reel from './Reel.js';
import Symbol from './Symbol.js';
import { getResult,playSound } from './Utility.js';

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

    // Initial Parameters
    this.balance = 100;

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

    //Cheating
    this.allthesame = false;
    this.bigwin = false;

    this.hello = document.getElementById('hello');
    this.hello.addEventListener('click', () => this.handleHello());
    this.aderant = document.getElementById('aderant');
    this.aderant.addEventListener('click', () => this.handleAderant());
    
    // Set initial balance
    document.getElementById('value').innerHTML = this.balance;
  }

  handleHello() {
     this.allthesame = true;
     this.bigwin = false;
  }

  handleAderant() {
    this.bigwin = true;
    this.allthesame = false;
  }

  spin() {

    this.onSpinStart();
    this.result = [];
    this.currentSymbols = this.nextSymbols;

    console.log('bigwin:',this.bigwin);
    console.log('allthesame:',this.allthesame);
    //Generate result
    if (this.allthesame){
      console.log('allthesame');
      for (let i = 0; i < 7; i++) {
        this.result.push(this.cheat);
      }
    }
    else if (this.bigwin) {
      console.log('bigwin');
      this.result = ['A','D','E','R','A','N','T'];
    }
    else{
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

    // Play sound
    playSound('Spin');

    return Promise.all(this.reels.map(reel => {
      reel.renderSymbols(this.currentSymbols[reel.idx], this.nextSymbols[reel.idx]);
      return reel.spin();
    })).then(() => this.onSpinEnd());
  }

  onSpinStart() {
    this.spinButton.disabled = true;
    this.balance = this.balance -1;
    document.getElementById('value').innerHTML = this.balance;    
  }

  onSpinEnd() {
    this.spinButton.disabled = false;
    this.balance = getResult(this.result, this.balance);
    document.getElementById('value').innerHTML = this.balance;

    if (this.autoPlayCheckbox.checked) 
      return window.setTimeout(() => this.spin(), 200);

    this.allthesame = false;
    this.bigwin = false;
  }
}
