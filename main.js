const Player = (name, symbol) => {
   const playing = false;
    return {name, symbol,playing};
};

const DisplayBoard = (() => {
    const gameBoard = ['','','','','','','','','',];

    return {gameBoard}
})();

const DisplayController = (() => {

    const boxes = document.querySelectorAll('td');
    let boardCount =0;
    let status = ""
    const addMark =  (event)=>{
        const {index} = event.target.dataset;
        
        if(GameFlow.checkSpace(index) && status !== "win" && status !=="tie"){
            const currentPlayer = GameFlow.playerTurn()
            event.target.innerHTML = currentPlayer.symbol

            //update the game board array
            GameFlow.updateBoard(currentPlayer.symbol, index)
            status= GameFlow.gameStatus(currentPlayer.symbol, boardCount)
            boardCount++

            console.log(status);
        }else{
            console.log(status);
        }
        
    }
    const initialize = (board)=>{
        boxes.forEach(box=>{
            const id = box.dataset.index;
            box.innerHTML = board.gameBoard[id];

            //
            box.addEventListener('click',addMark)
        });
    }

    


    return {initialize}
})();

const p1 = Player('Selma','X')
const p2 = Player('Edem','O')

const GameFlow = ((p1,p2) => {
    const board = DisplayBoard;
    
    const start = ()=>{
        
        //Display the board with an empty array
        DisplayController.initialize(board)
        //others stuff
    }
    const checkSpace = (position)=>{
        if(board.gameBoard[position]!==''){
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
        board.gameBoard[position] = mark
    }

    const gameStatus = (mark, boardCount)=>{
        if(boardCount==board.gameBoard.length-1){
            return "tie"
        }
        else if((board.gameBoard[0]==mark && board.gameBoard[1]==mark && board.gameBoard[2]==mark) 
            || (board.gameBoard[3]==mark && board.gameBoard[4]==mark && board.gameBoard[5]==mark) 
            || (board.gameBoard[6]==mark && board.gameBoard[7]==mark && board.gameBoard[8]==mark) 
            || (board.gameBoard[0]==mark && board.gameBoard[3]==mark && board.gameBoard[6]==mark) 
            || (board.gameBoard[1]==mark && board.gameBoard[4]==mark && board.gameBoard[7]==mark) 
            || (board.gameBoard[2]==mark && board.gameBoard[5]==mark && board.gameBoard[8]==mark) 
            || (board.gameBoard[0]==mark && board.gameBoard[4]==mark && board.gameBoard[8]==mark) 
            || (board.gameBoard[2]==mark && board.gameBoard[4]==mark && board.gameBoard[6]==mark) 
        ){
            return "win"
        }else{
            return "continue"
        }
    }
    return {start,checkSpace,playerTurn,gameStatus, updateBoard}
})(p1,p2);


GameFlow.start()

