const Player = (name, symbol) => {
   return {name, symbol};
};

const DisplayBoard = (() => {
    const gameBoard = ['X','','','','','','','','X',];

    return {gameBoard}
})();

const DisplayController = (() => {

    const boxes = document.querySelectorAll('td');
    const initialize = ()=>{
        const board = DisplayBoard;
        boxes.forEach(box=>{
            const id = box.dataset.id;
            box.innerHTML = board.gameBoard[id];
        })
    }

    return {initialize}
})();

const GameFlow = () => {

};

DisplayController.initialize()