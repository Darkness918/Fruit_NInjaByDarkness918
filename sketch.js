//Estados del Juego
var PLAY=1;
var END=0;
var gameState=1;

var knife,fruit ,monster,fruitGroup,monsterGroup, score,r,randomFruit, position;
var knifeImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage;
var gameOverSound ,knifeSwoosh;

function preload(){
  
  knifeImage = loadImage("knife.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png")

  //carga aquí el sonido
gameOverSound = loadSound("gameover.mp3")
  knifeSwooshSound = loadSound("knifeSwoosh.mp3")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  //crea la espada/cuchillo
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
  
  //establece la colisión para el cuchillo
  knife.setCollider("rectangle",0,0,40,40);

  //Puntuación de Variables y Grupos
  score=0;
  fruitGroup=createGroup();
  monsterGroup=createGroup();
 
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    //Llama la función de frutas y Monstruo
    fruits();
    Monster();
    
    //Mueve la espada/cuchillo con el ratón
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    //Incrementa la puntuación si el cuchillo toca la fruta
    if(fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
    knifeSwooshSound.play();
      score=score+2;
  
    }
    else
    {
      // Ve al estado del juego: end, si el cuchillo toca al enemigo
      if(monsterGroup.isTouching(knife)){
        gameState=END;
        
        //agrega aquí el sonido de fin del juego
        
        gameOverSound.play()
        
        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
        
        // Cambia la animación de la espada a gameover y reinicia su posición
        knife.addImage(gameOverImage);
        knife.scale=2;
        knife.x=width/2;
        knife.y=height/2;
      }
    }
  }
  
  drawSprites();
  //Muestra la puntuación
  textSize(25);
  text("Puntuación : "+ score,width/2-50,50);
}


function Monster(){
  if(World.frameCount%200===0){
    monster=createSprite(width,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,550));
   
    //actualiza a continuación la línea de código para incrementar la velocidad de monsterGroup en 10
    
    monster.velocityX=-(8+(score/10));
    
    monster.velocityX = -8;
    monster.setLifetime=50;
    monsterGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%80===0){
    position = Math.round(random(1,2));
    fruit=createSprite(width,200,20,20);
    
     //utilizando la variable aleatoria, cambia la posición de la fruta para hacerlo más desafiante
    
    if(position==1)
    {
    fruit.x=width;
    //actualiza a continuación la línea de código para incrementar la velocidad de fruitGroup en 4
      
    fruit.velocityX=-(7+(score/4));
      
    }
    else
    {
      if(position==2){
      fruit.x=0;
      
     //actualiza a continuación la línea de código para incrementar la velocidad de fruitGroup en 7
   fruit.velocityX= (7+(score/10));
      }
    }
    
    fruit.scale=0.2;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
     fruit.scale=1
    }
    
    fruit.y=Math.round(random(50,550));
   
    
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}