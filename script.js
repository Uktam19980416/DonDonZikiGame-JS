window.addEventListener('DOMContentLoaded', () => {
    const choices = document.querySelectorAll('.choices'),
          restart = document.querySelector('#restart'),
          score = document.querySelector('#score'),
          modal = document.querySelector('.modal'),
          result = document.querySelector('#result'),
          scoreBoard = {
              player: 0,
              computer: 0,
              draw: 0
          };

    function play(event) {
        restart.style.display = 'inline-block'
        const playerChoice = event.target.id
        const computerChoice = getComputerChoice();
        const winner = getWinner(playerChoice, computerChoice);
        showWinner(winner, computerChoice);
    }

    function getComputerChoice(){
        const random = Math.random();
        if (random < 0.34) {
            return 'rock'
        } else if (random <= 0.67){
            return 'list'
        } else {
            return 'scissors'
        }
    }

    function getWinner(player, computer){
        if (player === computer) {
            return 'draw'
        } else if (player === 'rock'){
            if (computer === 'list') {
                return 'computer'
            } else {
                return 'player'
            }
        } else if (player === 'list'){
            if (computer === 'scissors'){
                return 'computer'
            } else {
                return 'player'
            }
        } else if (player === 'scissors'){
            if (computer === 'rock'){
                return 'computer'
            } else {
                return 'player'
            }
        }
    }

    function showWinner(winner, computerChoice){
        if (winner === 'player') {
            scoreBoard.player++
            result.innerHTML = `
                <h1 class="text-win">You Won!</h1>
                <i class="fas fa-hand-${computerChoice} fa-10x"></i>
                <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}</strong></p>
            `
        } else if (winner === 'computer'){
            scoreBoard.computer++
            result.innerHTML = `
                <h1 class="text-lose">You Lose!</h1>
                <i class="fas fa-hand-${computerChoice} fa-10x">
                <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}</strong></p>
            `
        } else {
            scoreBoard.draw++
            result.innerHTML = `
                <h1>It is a draw!</h1>
                <i class="fas fa-hand-${computerChoice} fa-10x">
                <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}</strong></p>
            `
        }
        score.innerHTML = `
            <p>${scoreBoard.player}</p>
            <p>${scoreBoard.draw}</p>
            <p>${scoreBoard.computer}</p>
        `

        modal.style.display = 'block'
    }

    function restartGame(){
        scoreBoard.player = 0
        scoreBoard.computer = 0
        scoreBoard.draw = 0
        score.innerHTML = `
            <p>Player: ${scoreBoard.player}</p>
            <p>Draw: ${scoreBoard.draw}</p>
            <p>Computer: ${scoreBoard.computer}</p>
        `
    }

    function clearModal(event){
        if (event.target == modal) {
            modal.style.display = 'none'
        }
    }

    choices.forEach(choice => choice.addEventListener('click', play))
    window.addEventListener('click', clearModal)
    restart.addEventListener('click', restartGame)

})