const boxs: NodeListOf<Element> = document.querySelectorAll('.box');
const statusTxt: HTMLElement | null = document.querySelector('#center');
const btnRestart: HTMLElement | null = document.querySelector('#right');
const tryy: HTMLElement | null = document.querySelector('#try');
let x: string = "X";
let o: string = "O";

let counter: number = 0;
let youWin: number = 0;
let otherWin: number = 0;

const win: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let options: string[] = ["", "", "", "", "", "", "", "", ""];
let currentPlayer: string = x;
let player: string = "X";
let running: boolean = false;
init();

function init(): void {
  boxs.forEach(box => box.addEventListener('click', boxClick));
  if (btnRestart) btnRestart.addEventListener('click', restartGame);
  if (statusTxt) statusTxt.textContent = `${player} Your Turn`;
  running = true;
}

function boxClick(): void {
  const index: string | undefined = this.dataset.index;
  if (index === undefined || options[index] !== "" || !running) {
    return;
  }
  updateBox(this, parseInt(index));
  checkWinner();
}

function updateBox(box: Element, index: number): void {
  options[index] = player;
  box.innerHTML = currentPlayer;
}

function changePlayer(): void {
  player = (player === 'X') ? "O" : "X";
  currentPlayer = (currentPlayer === x) ? o : x;
  if (statusTxt) statusTxt.textContent = `${player} Turn`;
}

function chooseWiner(): void {
  if (statusTxt?.textContent?.trim().toLowerCase().includes("xwon")) {
    youWin += 1;
  } else if (statusTxt?.textContent?.trim().toLowerCase().includes("owon")) {
    otherWin += 1;
  }
}
chooseWiner();
console.log(youWin, otherWin);

function checkWinner(): void {
  let isWon: boolean = false;
  for (let i = 0; i < win.length; i++) {
    const condition: number[] = win[i];
    const box1: string = options[condition[0]];
    const box2: string = options[condition[1]];
    const box3: string = options[condition[2]];
    if (box1 === "" || box2 === "" || box3 === "") {
      continue;
    }
    if (box1 === box2 && box2 === box3) {
      isWon = true;
      boxs[condition[0]].classList.add('win');
      boxs[condition[1]].classList.add('win');
      boxs[condition[2]].classList.add('win');
    }
  }

  if (isWon) {
    if (statusTxt) statusTxt.textContent = `${player} Won`;
    running = false;
  } else if (!options.includes("")) {
    if (statusTxt) statusTxt.textContent = "Game Draw..!";
    running = false;
  } else {
    changePlayer();
  }

  if (statusTxt?.textContent === "X Won") {
    let xWonCount = document.querySelector('.x-win-count');
    let num = Number(xWonCount?.textContent);
    num++;
    if (xWonCount) xWonCount.textContent = num.toString();
  }
  if (statusTxt?.textContent === "O Won") {
    let oWonCount = document.querySelector('.o-win-count');
    let num = Number(oWonCount?.textContent);
    num++;
    if (oWonCount) oWonCount.textContent = num.toString();
  }
}

function restartGame(): void {
  options = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = x;
  player = "X";
  running = true;
  if (statusTxt) statusTxt.textContent = `${player} Your Turn`;

  boxs.forEach(box => {
    box.innerHTML = "";
    box.classList.remove('win');
  });
  counter++;
  if (tryy) tryy.textContent = counter.toString();
}

console.log(Number("3"));
