/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("(()=>{\n    const player1 = document.querySelector(\"#player1\");\nconst player2 = document.querySelector(\"#player2\");\nconst congrats = document.querySelector(\"#congrats\");\nconst form = document.querySelector(\"form\");\nconst boxes = document.querySelectorAll(\"td\");\n\nconst Player = (name, symbol) => {\n  const playing = false;\n  return { name, symbol, playing };\n};\n\nconst GameBoard = (() => {\n  let gameBoard = [\"\", \"\", \"\", \"\", \"\", \"\", \"\", \"\", \"\"];\n  return { gameBoard };\n})();\n\nconst DisplayController = (() => {\n  const addMark = event => {\n    const { index } = event.target.dataset;\n\n    if (GameFlow.checkSpace(index) && !GameFlow.gameEnd()) {\n      const currentPlayer = GameFlow.playerTurn();\n      GameFlow.play(currentPlayer, index);\n      event.target.innerHTML = currentPlayer.symbol;\n      if (GameFlow.gameWin(currentPlayer.symbol)) {\n        congrats.innerHTML = `Hurray!! ${currentPlayer.name} won the game`;\n        return;\n      }\n      if (GameFlow.boardFull()) {\n        congrats.innerHTML = `It's a tie`;\n      }\n    }\n  };\n  const initialize = board => {\n    boxes.forEach(box => {\n      const id = box.dataset.index;\n      box.innerHTML = board.gameBoard[id];\n\n      box.addEventListener(\"click\", addMark);\n    });\n  };\n\n  const clearBoard = () => {\n    boxes.forEach(box => {\n      box.innerHTML = \"\";\n    });\n  };\n\n  return { initialize, clearBoard };\n})();\n\nconst GameFlow = (() => {\n  const board = GameBoard;\n  let p1, p2;\n  let boardCount = 0;\n  let gameStatus = \"playing\";\n  let nextPlayer = null;\n  const start = () => {\n    p1 = Player(player1.value, \"X\");\n    p2 = Player(player2.value, \"O\");\n\n    //Display the board with an empty array\n    DisplayController.initialize(board);\n    //others stuff\n  };\n  const checkSpace = position => {\n    if (board.gameBoard[position] !== \"\") {\n      return false;\n    } else {\n      return true;\n    }\n  };\n  const playerTurn = () => {\n    if (!p1.playing) {\n      p1.playing = true;\n      p2.playing = false;\n      nextPlayer = p2;\n      return p1;\n    } else {\n      p1.playing = false;\n      p2.playing = true;\n      nextPlayer = p1;\n      return p2;\n    }\n  };\n\n  const changeGameStatus = () => {\n    gameStatus = \"playing\";\n    boardCount = 0;\n  };\n  const play = (player, position) => {\n    updateBoard(player.symbol, position);\n    if (gameWin(player.symbol)) {\n      gameStatus = \"end\";\n      return false;\n    }\n    return true;\n  };\n\n  const updateBoard = (mark, position) => {\n    board.gameBoard[position] = mark;\n    boardCount++;\n  };\n\n  const gameWin = mark => {\n    if (\n      (board.gameBoard[0] == mark &&\n        board.gameBoard[1] == mark &&\n        board.gameBoard[2] == mark) ||\n      (board.gameBoard[3] == mark &&\n        board.gameBoard[4] == mark &&\n        board.gameBoard[5] == mark) ||\n      (board.gameBoard[6] == mark &&\n        board.gameBoard[7] == mark &&\n        board.gameBoard[8] == mark) ||\n      (board.gameBoard[0] == mark &&\n        board.gameBoard[3] == mark &&\n        board.gameBoard[6] == mark) ||\n      (board.gameBoard[1] == mark &&\n        board.gameBoard[4] == mark &&\n        board.gameBoard[7] == mark) ||\n      (board.gameBoard[2] == mark &&\n        board.gameBoard[5] == mark &&\n        board.gameBoard[8] == mark) ||\n      (board.gameBoard[0] == mark &&\n        board.gameBoard[4] == mark &&\n        board.gameBoard[8] == mark) ||\n      (board.gameBoard[2] == mark &&\n        board.gameBoard[4] == mark &&\n        board.gameBoard[6] == mark)\n    ) {\n      return true;\n    } else {\n      return false;\n    }\n  };\n\n  const gameEnd = () => {\n    if (boardCount == board.gameBoard.length || gameStatus == \"end\") {\n      return true;\n    } else {\n      return false;\n    }\n  };\n\n  const boardFull = () => {\n    if (boardCount == board.gameBoard.length) {\n      return true;\n    } else {\n      return false;\n    }\n  };\n\n  return {\n    start,\n    checkSpace,\n    playerTurn,\n    gameEnd,\n    updateBoard,\n    gameWin,\n    play,\n    changeGameStatus,\n    nextPlayer,\n    boardFull\n  };\n})();\n\nform.addEventListener(\"submit\", event => {\n  event.preventDefault();\n  congrats.innerHTML = \"\";\n  //Clear board\n  DisplayController.clearBoard();\n\n  //Set all value in array to empty\n  GameBoard.gameBoard = [\"\", \"\", \"\", \"\", \"\", \"\", \"\", \"\", \"\"];\n  GameFlow.changeGameStatus();\n  GameFlow.start();\n});\n\n})()\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ })

/******/ });