const player1 = document.querySelector('#player1');
const player2 = document.querySelector('#player2');
const congrats = document.querySelector('#congrats');
console.dir(player1)
const form = document.querySelector("form");
const boxes = document.querySelectorAll('td');

const Player = (name, symbol) => {
   const playing = false;
    return {name, symbol, playing};
};

const DisplayBoard = (() => {
    let gameBoard = ['','','','','','','','','',];
    return {gameBoard}
})();

const DisplayController = (() => {

    
    let boardCount =0;
    let status = ""
    const addMark =  (event)=>{
        const {index} = event.target.dataset;
        const currentPlayer = GameFlow.playerTurn()
        if(GameFlow.checkSpace(index) && !GameFlow.gameWin(currentPlayer.symbol) ){
            console.log("content of td", event.target.innerHTML);
            event.target.innerHTML = currentPlayer.symbol
            
            //update the game board array
            GameFlow.updateBoard(currentPlayer.symbol, index)
            //status= GameFlow.gameStatus(currentPlayer.symbol, boardCount)
            boardCount++
            if (GameFlow.gameWin(currentPlayer.symbol)){
                congrats.innerHTML = currentPlayer.name + " won"
            }
            console.log(DisplayBoard.gameBoard, "Board count %d", boardCount);
            if(status =='tie'){
                congrats.innerHTML = "It is a tie"
            }
        }
        
    }
    const initialize = (board)=>{
        boxes.forEach(box=>{
            const id = box.dataset.index;
            box.innerHTML = board.gameBoard[id];
            
            box.addEventListener('click',addMark)
        });
    }

    const clearBoard = ()=>{
       boxes.forEach(box=>{
        box.innerHTML = ''

       });
        // GameFlow.start();
    };

    return {initialize, clearBoard, status}
})();


const GameFlow = (() => {
    const board = DisplayBoard;
    let p1, p2;
    const start = ()=>{
         p1 =Player(player1.value, 'X')
         p2 = Player(player2.value, 'O')
        
        //Display the board with an empty array
        DisplayController.initialize(board)
        //others stuff
        
    }
    const checkSpace = (position)=>{
        if(board.gameBoard[position]!==''){
            console.log("position taken");
            return false
        }else{
            return true;
        }
    }
    const playerTurn = ()=>{
         if(!p1.playing){
             p1.playing=true
             p2.playing=false
             return p1;
         }else{
             p1.playing=false
             p2.playing=true
             return p2;
         }
    }

    const updateBoard = (mark,position)=>{
        console.log(position);
        board.gameBoard[position] = mark
    }

    const gameWin = (mark)=>{
        if((board.gameBoard[0]==mark && board.gameBoard[1]==mark && board.gameBoard[2]==mark) 
            || (board.gameBoard[3]==mark && board.gameBoard[4]==mark && board.gameBoard[5]==mark) 
            || (board.gameBoard[6]==mark && board.gameBoard[7]==mark && board.gameBoard[8]==mark) 
            || (board.gameBoard[0]==mark && board.gameBoard[3]==mark && board.gameBoard[6]==mark) 
            || (board.gameBoard[1]==mark && board.gameBoard[4]==mark && board.gameBoard[7]==mark) 
            || (board.gameBoard[2]==mark && board.gameBoard[5]==mark && board.gameBoard[8]==mark) 
            || (board.gameBoard[0]==mark && board.gameBoard[4]==mark && board.gameBoard[8]==mark) 
            || (board.gameBoard[2]==mark && board.gameBoard[4]==mark && board.gameBoard[6]==mark) 
        ){
            return true
        }else{
            return false
        }
    }

    const gameEnd = (boardCount)=>{
        if(boardCount==board.gameBoard.length-1 || gameWin()){
            return true;
        }
    }

    const gameStatus = (mark, boardCount)=>{
        if(gameWin(mark)){
            return "win"
        }else if(boardCount==board.gameBoard.length-1){
            return "tie"
        } else{
            return "continue"
        }
    }
    return {start,checkSpace,playerTurn,gameStatus, updateBoard, gameWin, gameEnd}
})();


form.addEventListener('submit', (event) => {
    event.preventDefault();
    congrats.innerHTML = '';
    //Clear board
    DisplayController.clearBoard()
    
    //Set all value in array to empty
    DisplayBoard.gameBoard=['','','','','','','','','']
    DisplayController.status=""
    GameFlow.start();
    console.log("RESETTING GAME", DisplayController.status);
})

