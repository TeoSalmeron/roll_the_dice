// GAME

class Game {

    constructor(playerOne, playerTwo, activePlayer = undefined) {
        this.playerOne = playerOne
        this.playerTwo = playerTwo
        this.activePlayer = activePlayer
    }

    resetScores() {
        // Reset scores and banks
        this.playerOne.score = 0
        this.playerOne.html.score.innerText = 0
        this.playerOne.bank = 0
        this.playerOne.html.bank.innerText = 0

        this.playerTwo.score = 0
        this.playerTwo.html.score.innerText = 0
        this.playerTwo.bank = 0
        this.playerTwo.html.bank.innerText = 0
    }

    startGame() {
        
        this.resetScores()

        // Define active player
        this.setActivePlayer(playerOne)
        
        // Enable buttons
        roll.disabled = false
        hold.disabled = false
    }

    checkIfPlayerHasWon() {
        if(this.activePlayer.bank >= 10) {
            this.resetScores()
            alert(this.activePlayer.html.name.innerText + " a gagné !")
            let action = confirm("Voulez-vous recommencer ?")
            if(action) {
                this.startGame()
            } else {
                return
            }
        }
    }

    rollDice() {

        let diceValue = number(1, 6)
        
        dice.style.rotate = "360deg"
        dice.style.scale = "0"
        diceImg.src = returnDiceImage(diceValue)
        setTimeout(() => {
            dice.style.rotate = "0deg"
            dice.style.scale = "1"
        }, 300);

        if(diceValue !== 1) {
            this.activePlayer.score += diceValue
            this.activePlayer.html.score.innerText = this.activePlayer.score
            this.checkIfPlayerHasWon()
        } else {
            this.activePlayer.score = 0
            this.activePlayer.html.score.innerText = 0
            this.switchActivePlayer()
        }
    }

    switchActivePlayer() {
        if(this.activePlayer === playerOne) {
            this.activePlayer = playerTwo
            this.setActivePlayer(playerTwo)
            this.removeActivePlayerStyle(playerOne)
        } else {
            this.activePlayer = playerOne
            this.setActivePlayer(playerOne)
            this.removeActivePlayerStyle(playerTwo)
        }
    }

    hold() {
        this.activePlayer.bank += this.activePlayer.score
        this.activePlayer.html.bank.innerText = this.activePlayer.bank
        this.activePlayer.score = 0
        this.activePlayer.html.score.innerText = 0
        this.checkIfPlayerHasWon()
        this.switchActivePlayer()
        
    }

    removeActivePlayerStyle(player) {
        // CSS display
        player.html.score.style.color = color2
        player.html.name.style.color = color4
        player.html.bank.style.backgroundColor = color4
        player.html.score.style.scale = "1"
        player.html.name.style.scale = "1"
        player.html.bank.style.scale = "1"
    }

    setActivePlayer(player) {
        this.activePlayer = player

        // CSS display
        player.html.score.style.color = color1
        player.html.name.style.color = color5
        player.html.bank.style.backgroundColor = color5
        player.html.score.style.scale = "1.1"
        player.html.name.style.scale = "1.1"
        player.html.bank.style.scale = "1.1"
    }

    getActivePlayer() {
        return this.activePlayer
    }

}

class Player {
    constructor(id, score, bank, html) {
        this.id = id
        this.score = score
        this.bank = bank
        this.html = html
    }
}

// VARIABLES
const newGameBtn = document.getElementById("newGameBtn")
const roll = document.getElementById("roll")
const hold = document.getElementById("hold")
const dice = document.getElementById("dice")
const diceImg = document.getElementById("diceImg")

const color1 = "#7D4FFE"
const color2 = "#C49FFF"
const color3 = "#FFD0E6"
const color4 = "#FF9CB6"
const color5 = "#F08488"

// RULES

const closeRules = document.getElementById("closeRules")
const rulesBtn = document.getElementById("rulesBtn")
const rules = document.getElementById("rules")

// HTML display

const playerOneHTML = {
    name: document.getElementById("playerOneName"),
    score: document.getElementById("playerOneScore"),
    bank: document.getElementById("playerOneBank")
}

const playerTwoHTML = {
    name: document.getElementById("playerTwoName"),
    score: document.getElementById("playerTwoScore"),
    bank: document.getElementById("playerTwoBank")
}

// GAME OBJECTS

const playerOne = new Player(1, 0, 0, playerOneHTML)
const playerTwo = new Player(2, 0, 0, playerTwoHTML)

const game = new Game(playerOne, playerTwo)

// EVENT LISTENERS

rulesBtn.addEventListener("click", () => {
    rules.style.left = "0px"
})

closeRules.addEventListener("click", () => {
    rules.style.left = "-100vw"
})

newGameBtn.addEventListener("click", () => {
    game.startGame()
})

roll.addEventListener("click", () => {
    game.rollDice()
})

hold.addEventListener("click", () => {
    game.hold()
})

// FUNCTIONS

let number = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function returnDiceImage(diceValue) {
    switch(diceValue) {
        case 1:
            return "./img/dice_1.png"
            break
        case 2:
            return "./img/dice_2.png"
            break
        case 3:
            return "./img/dice_3.png"
            break
        case 4:
            return "./img/dice_4.png"
            break
        case 5:
            return "./img/dice_5.png"
            break
        case 6:
            return "./img/dice_6.png"
            break
        default:
            return "./img/dice_1.png"
            break
    }
}
