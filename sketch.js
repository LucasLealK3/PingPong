let input, button;

const player1 = new Player();
player1.controller = 'mouse';
player1.nome = 'Player1';
const player2 = new Player();
const bola = new Bola();

function setup() {
  createCanvas(windowWidth, windowHeight);
  input = createInput();
  input.position(width/2.5, height/2);

  button = createButton('submit');
  button.position(input.x + input.width, height/2);
  button.mousePressed(greet);  

  resetGame();
}

function greet() {
  player1.nome = input.value();
  input.value('');
}

function resetGame(){
  player1.pos.x = 10;
  player2.pos.x = width - 20;
  player1.pos.y = 180;
  player2.pos.y = 180;
  bola.pos.x = (bola.direcao === 1) ? (player1.pos.x + player1.size.w) : player2.pos.x;
  bola.pos.y = height/2;
}

function verificaPontuacao(){
  if(bola.pos.x > width){
    console.log('player 1 fez o ponto');
    player1.pontuacao++;
    aumentaDificuldade()
    resetGame();
  }
  
  if(bola.pos.x + bola.size.w < 0){
    player2.pontuacao++;
    aumentaDificuldade()
    resetGame()
  }
}

function aumentaDificuldade(){

  if (player1.pontuacao >= player2.pontuacao + 20){
    bola.deslocamento = 15;
  } else if (player1.pontuacao >= player2.pontuacao + 15){
    bola.deslocamento = 12.5;
  } else if (player1.pontuacao >= player2.pontuacao + 10){
    bola.deslocamento = 10;
  } else if (player1.pontuacao >= player2.pontuacao + 5){
    bola.deslocamento = 7.5;
  } else if (player1.pontuacao >= player2.pontuacao){
    bola.deslocamento = 5;
  } else {
    bola.deslocamento = 2.5;
  }
}

function mostrarPontuacao() {
  fill('pink');
  textSize(48);
  text(player1.pontuacao, (width/2) - 75, 50);
  text(player2.pontuacao, (width/2) + 50, 50);
}



function mostrarNome() {
  fill('pink');
  textSize(48);
  text(player1.nome, (width/2) - 400, 50);
  text(player2.nome, (width/2) + 200, 50);
}

function teveColisaoObjetos(obj1, obj2) {
  if(
      (
      obj1.pos.x + obj1.size.w > obj2.pos.x 
       && 
      obj1.pos.x < obj2.pos.x + obj2.size.w
      )
    &&
      (
      obj1.pos.y + obj1.size.h > obj2.pos.y
        &&
      obj1.pos.y < obj2.pos.y + obj2.size.h
      )
  ){
    return true;  
  }
  return false;
}

function verificaColisao(){
  if(teveColisaoObjetos(bola, player2)){
    bola.direcao = -1;
    bola.deslocamento += 0.1;
  }
  
  if(teveColisaoObjetos(bola, player1)){
    bola.direcao = 1;
    bola.deslocamento += 0.1;
  }
  
  if((bola.pos.y + bola.size.h) > height){
    bola.direcaoVertical = -1;
  }
  
  if(bola.pos.y < 0){
    bola.direcaoVertical = 1;
  }
}

function draw() {
  background("black");


  //Configurando o meio de campo
  strokeWeight(5);
  stroke("white");
  line(width / 2, 0, width / 2, height);
  
  //atualiza as posições dos objetos
  player1.update();
  player2.update();
  bola.update();
  
  //verificar colisão
  verificaColisao();
  //verificar se teve pontuação
  verificaPontuacao();
  
  //mostra os objetos
  player1.show();
  player2.show();
  bola.show();
  
  mostrarPontuacao();
  mostrarNome();
}
