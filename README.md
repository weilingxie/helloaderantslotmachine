# Hello Aderant Slot Machine
Hello World Application for Graduate Training Programme. Base on johakr/html5-slot-machine on Github.

## Features
* Spin: Initially you are given $100, each spin cost $1
* Autoplay functionality, which keeps running even if the game window is in background
* Show the balance, and the reward from last bet
* Choose the bet amount, should be a number, and less than current balance
* Deposit (Mock), show a fake credit card information box, then show a message box and deposit $100 eventually if you fill in the info and click on Pay.
* Withdraw (Mock), just show a message box
* Sound effect, different sounds for bet, different kinds of rewards

## Reward Mechanism
* 3 continues characters     $1*betAmount
* 4 continues characters     $2*betAmount
* 5 continues characters     $4*betAmount
* 6 continues characters     $8*betAmount
* 7 continues characters    $16*betAmount
* ADERANT BIG WIN          $9999*betAmount

## Installation, Build & Deployment
1) Clone repository
2) Run `npm install`
    - *Development*: run `npm start` and go to `http://localhost:8080`
    - *Production*: run `npm run build` and serve from `/dist`
