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

    this.cheat = null;

    this.result = [];

    this.nextSymbols = [];

    this.container = domElement;

    this.reels = Array.from(this.container.getElementsByClassName('reel')).map((reelContainer, idx) => new Reel(reelContainer, idx, this.currentSymbols[idx]));

    this.spinButton = document.getElementById('spin');
    this.spinButton.addEventListener('click', () => this.spin());

    this.withdrawButton = document.getElementById('withdraw');
    this.withdrawButton.addEventListener('click', () => this.handleWithdraw());

    this.payButton = document.getElementById('pay');
    this.payButton.addEventListener('click', () => this.handlePay());

    this.betInput = document.getElementById('bet');
    this.betAmount = this.betInput.value;

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
     console.log('STOP CHEATING!!!');
  }

  handleAderant() {
    this.bigwin = true;
    this.allthesame = false;
    console.log('YOU ARE DISHONEEST!!!');
  }

  handleWithdraw() {
    if(this.balance > 0)
      alert(`Congratulations! You have $${this.balance}. Please contact George to withdraw.`);
    else
      alert(`Poor you, there is $0 balance!`);
  }

  handlePay() {
      let cardNumber = document.getElementById('cardNumber').value;
      let expireDate = document.getElementById('expireDate').value;
      let ccv = document.getElementById('cvv').value;
      let name = document.getElementById('name').value;
      let amount = document.getElementById('amount').value||0;
      if (cardNumber&&expireDate&&ccv&name&&(amount>0))
        alert(`Please pay the amount to William`);
      else
        alert(`Please fill in all fields to finish paying`);
      this.balance = 100;
  }

  spin() {
    this.betAmount = document.getElementById('bet').value;
    if(this.betAmount > this.balance){
      alert("Sorry, you don`t have enough balance");
    }
    else {
      this.onSpinStart();
      this.result = [];
      this.currentSymbols = this.nextSymbols;

      // console.log('bigwin:',this.bigwin);
      // console.log('allthesame:',this.allthesame);
      //Generate result
      if (this.allthesame){
        // console.log('allthesame');
        this.cheat = Symbol.random();
        for (let i = 0; i < 7; i++) {
          this.result.push(this.cheat);
        }
      }
      else if (this.bigwin) {
        // console.log('bigwin');
        this.result = ['A','D','E','R','A','N','T'];
      }
      else{
        for (let i = 0; i < 7; i++) {      
          this.result.push(Symbol.random());
        }
      }
    
      // console.log('result:');
      // console.log(this.result);

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
  }

  onSpinStart() {
    this.spinButton.disabled = true;    
    this.balance = this.balance -this.betAmount;
    document.getElementById('value').innerHTML = this.balance;    
  }

  onSpinEnd() {
    this.spinButton.disabled = false;
    let result = getResult(this.result, this.balance, this.betAmount);
    this.balance = result.balance;
    document.getElementById('value').innerHTML = `$${this.balance} (+${result.reward ? result.reward : 0})`;

    if (this.autoPlayCheckbox.checked) 
      return window.setTimeout(() => this.spin(), 200);

    this.allthesame = false;
    this.bigwin = false;
  }
}
