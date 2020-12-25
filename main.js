let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d');
let thrower;
let numOfThrower;
class Canvas {
    constructor(x,y,width,height,firstPlayerScore,secondPlayerScore) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.firstPlayerScore = firstPlayerScore
        this.secondPlayerScore = secondPlayerScore
    }
    drawBoard() {
        ctx.fillStyle = 'green'
        ctx.fillRect(this.x,this.y,this.width,this.height)
    }
    showTheScore() {
        ctx.font = '100px Arial'
        ctx.fillStyle = 'white'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'bottom'
        ctx.fillText(this.firstPlayerScore + '-' + this.secondPlayerScore,this.width/2,100)
    }
    update() {
        if(gameBall.x < this.x) {
            this.firstPlayerScore++
            gameBall.x = this.width/2
            getTheThrower()
        } else if(gameBall.x > this.width) {
            this.secondPlayerScore++
            gameBall.x = this.width/2
            getTheThrower()
        }
    }
}
class Racket {
    constructor(x,y,width,height,color) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
    }
    drawRackets() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x,this.y - (this.height/2),this.width,this.height)
    }
}
class Ball {
    constructor(x,radius,speedX,speedY) {
        this.x = x
        this.y = gameBoard.height/2
        this.radius = radius
        this.speedX = speedX
        this.speedY = speedY
    }
    drawBall() {
        ctx.fillStyle = 'white'
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.radius,0,2 * Math.PI)
        ctx.fill()
    }
    moveBall() {
        if(thrower === 'firstPlayer') {
            this.x += this.speedX 
        } else {
            this.x -= this.speedX 
        }
        this.drawBall()
    }
}

 let gameBoard = new Canvas(0,0,800,400,0,0)
 let firstPlayerRacket = new Racket(0,200,20,100,'red')
 let secondPlayerRacket = new Racket(780,200,20,100,'blue')
 let gameBall = new Ball(400,5,5,5)



 function getTheThrower() {
   numOfThrower = Math.round(Math.random())
   numOfThrower === 0 ? thrower = 'firstPlayer' : thrower = 'secondPlayer'
 }
getTheThrower()


function checkCollision() {
    if(gameBall.y > firstPlayerRacket.y - (firstPlayerRacket.height/2) && gameBall.y < firstPlayerRacket.y + (firstPlayerRacket.height/2) && gameBall.x - gameBall.radius === firstPlayerRacket.x + firstPlayerRacket.width) {
        gameBall.speedX = -gameBall.speedX
    } 
    else if (gameBall.y > secondPlayerRacket.y - (secondPlayerRacket.height/2) && gameBall.y < secondPlayerRacket.y + (secondPlayerRacket.height/2) && gameBall.x + gameBall.radius === secondPlayerRacket.x) {
        gameBall.speedX = -gameBall.speedX
    }
}


let interval = setInterval(function() {
    ctx.clearRect(0,0,800,400)
    gameBoard.drawBoard()
    gameBoard.showTheScore()
    gameBoard.update()
    firstPlayerRacket.drawRackets()
    secondPlayerRacket.drawRackets()
    gameBall.moveBall()
    checkCollision()
},10)




canvas.addEventListener('mousemove',racketsMove)
function racketsMove(event) {
    if(event.offsetY - firstPlayerRacket.height/2 < gameBoard.y || event.offsetY + firstPlayerRacket.height/2 > gameBoard.height) {
        event.returnValue = false
    }
    else if(event.offsetX < gameBoard.width/2) {
        firstPlayerRacket.y = event.offsetY
    }
    else if(event.offsetX > gameBoard.width/2) {
        secondPlayerRacket.y = event.offsetY
    }
}