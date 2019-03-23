# Hello Aderant Slot Machine
Hello World Application for Graduate Training Programme. Modified base on johakr/html5-slot-machine.

## Features
* Fully responsive for great UX on mobile, web & fullscreen mode.
* Autoplay functionality, which keeps running even if the game window is in background.

## Installation, Build & Deployment
1) Clone repository
2) Run `npm install`
    - *Development*: run `npm start` and go to `http://localhost:8080`
    - *Production*: run `npm run build` and serve from `/dist`
    
## Configuration
For configuration options see `config` object in [index.js](https://github.com/johakr/html5-slot-machine/blob/master/src/js/index.js)

| Property | Description | Default |
| ------------- | ------------- | ------------- |
| `inverted`  | Controls visual spinning direction of reels. If false, reels will spin from bottom to top. If true, reels will spin from top to bottom | false |
