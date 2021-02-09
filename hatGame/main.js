
const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(){
    this.fieldArray = []
    this.playerX = 0
    this.playerY = 0 
  }

  generateField(height,width,percent){
      //set up the plain field
      this.fieldArray = []; // Initialize array
      for (let i = 0 ; i < height; i++) { 
        this.fieldArray[i] = []; // Initialize inner array
            for (let j = 0; j < width; j++) { // i++ needs to be j++
                this.fieldArray[i][j] = '░';
            }
        }

               
      //put the holes
      let numHoles = Math.floor(height*width*percent/100)
      for (let p = 1;p <= numHoles; p++){
        let  x = Math.floor(height*Math.random())
        let  y = Math.floor(width*Math.random())
          this.fieldArray[x][y]= hole
      }
      
      //put the hat
      let x=0
      let y=0
      do{
        x = Math.floor(height*Math.random())
        y = Math.floor(width*Math.random())
        this.fieldArray[x][y]= hat
      } while (x === 0 && y===0)

      this.print()
            
      
    }
 

  print(){
    for(let i = 0; i < this.fieldArray.length;i++){
      console.log(this.fieldArray[i].join(''))
    }
  }

  findedHat(){
    if (this.fieldArray[this.playerX][this.playerY] === hat){
      return true
    } else {
      return false
    }
  }

  fallInHole(){
    if (this.fieldArray[this.playerX][this.playerY] === hole){
      return true
    } else {
      return false
    }
  }
  
  outOfBounds(){
    if (this.playerX < 0 || this.playerY < 0){
      return true
    }
    if (this.playerX > this.fieldArray.length || this.playerY > this.fieldArray[0].length){
      return true
    }
    return false
  }

  makeMove(){
    let move = prompt('Loose your hat? Where do you want to go?')
    switch (move){
      case 'd':
        this.playerX +=1;
        break
      case 'u':
        this.playerX -=1;
        break
      case 'l':
        this.playerY -=1;
        break
      case 'r':
        this.playerY +=1;
        break
      default:
        console.log('Sorry that is not a move');
    }
  }

  playGame(){
    let gameOver = false
    do{
      this.makeMove()
      if (this.outOfBounds()){
        console.log('Game over, you are out of bounds')
        gameOver = true
        break
      }
      if (this.fallInHole()){
        console.log('Game over, you have falled into a hole')
        gameOver = true
      }
      if (this.findedHat()){
        console.log('You have founded the hat Yeah!!')
        gameOver = true
      }
      this.fieldArray[this.playerX][this.playerY] = pathCharacter
      this.print()
    } while(!gameOver)
    
  }

}



const myField = new Field()
myField.generateField(5,5,20)
myField.playGame()