var PLAY=1;
var END=0;
var sword, alien1, alien2, fruit1, fruit2, fruit3, fruit4, alien_monving;
var fruitGroup;

var swordImage, f1Image, f2Image, f3Image, f4Image, alien1Image, alien2Image,gameoverImage;
var gamestate=PLAY;

var score;
var fruitGroup, enemyGroup;
var swooshSound,gameoverSound

function preload(){
  swordImage=loadImage("sword.png")
  f1Image=loadImage("fruit1.png")
  f2Image=loadImage("fruit2.png")
  f3Image=loadImage("fruit3.png")
  f4Image=loadImage("fruit4.png")
  alien1Image=loadImage("alien1.png")
  alien2Image=loadImage("alien2.png")
  gameoverImage=loadImage("gameover.png")
  
  alien_moving=loadAnimation("alien1.png", "alien2.png")
  
  swooshSound=loadSound("whoosh sound 2.mp3")
 gameoverSound=loadSound("Game over sounds.wav")
}

function setup(){
  createCanvas(600,600);
  //Creating the background 
  background("lightblue")
  
  //Creating the knife
  sword=createSprite(480,220,20,50);
  sword.addImage(swordImage);
  sword.scale=0.7;
  
  gameover=createSprite(300,100);
  gameover.addImage(gameoverImage);
  
  score=0;
  
  //Creating group for the fruits and enemies
    fruitGroup=new Group();
    enemyGroup=new Group();
  
}

function draw(){
  //Clear the screen
  background("lightblue");
  
  if(background.x<0){
    background.x=background.width/2;
    
  }
   
  //Moving sword
  sword.y=World.mouseY;
  sword.x=World.mouseX;
  
  if(gamestate===PLAY){
    gameover.visible=false
    fruits();
    enemy();
    
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score=score+2;
      swooshSound.play();
                                    }
    if(sword.isTouching(enemyGroup)){
      sword.addImage(gameoverImage);
      gamestate=END;
      sword.scale=0.9;
      gameoverSound.play();
                                    }
    
  }
     if(gamestate===END){
       fruitGroup.setVelocityXEach(0);
       enemyGroup.setVelocityXEach(0);
       fruitGroup.destroyEach();
       enemyGroup.destroyEach();
       sword.x=300;
       sword.y=300;
             
     }
    
  //Add the score
  text("Score: "+ score, 500,50);
  
  
  drawSprites();
}
function fruits(){
  //Code for fruits
  if(World.frameCount%60===0){
    position=Math.round(random(1,2));
    fruit=createSprite(650,200,20,20);
    
    if(position==1){
      fruit.x=600;
      fruit.velocityX= -(7+(score/4));
                   }
    else{
      if(position==2)
      fruit.x=0;  
      fruit.velocityX= (7+(score/4));
    
      }
    
    
    fruit.scale=0.3;
    //fruit.debug=true;
    r=Math.round(random(1,4));
    if(r==1){
      fruit.addImage(f1Image);
            } 
    else if(r==2){
      fruit.addImage(f2Image);
                 }
    else if(r==3){
      fruit.addImage(f3Image);
                 }
    else if(r==4){
      fruit.addImage(f4Image);
                 }
    fruit.y=Math.round(random(50,340));
    fruit.lifetime=100;
    fruitGroup.add(fruit);
                            }
                          } 
  function enemy(){
    if(World.frameCount%200===0){
      position=Math.round(random(1,2));
      monster=createSprite(700,Math.round(random(50,350)),20,20);
      
      
    if(position==1){
      monster.x=600;
      monster.velocityX= -(7+(score/4));
                   }
    else{
      if(position==2)
      monster.x=0;  
      monster.velocityX= (7+(score/4));
    
      }
      monster.addAnimation("moving", alien_moving);
      monster.lifetime=100;
      enemyGroup.add(monster);
    }
  }
