var bgImage;bgImage2
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var ironMan;
var ground;
var obstacle1,obstacle2,obstcale3,obstacle3,obtsacle4,obstacle4,obstacle5,obstcale6
var MindStone,PowerStone,RealityStone,SoulStone,SpaceStone,TimeStone;
var score=0;
var gameOver, restart;

localStorage["HighestScore"] = 0;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	bgImage=loadImage("images/bg1.png")
	bgImage2=loadImage("images/bg2.png")

	ironMan=loadAnimation("")

	Thanos=loadAnimation("")

	robot1=loadAnimation("")
	robot2=loadAnimation("")
	robot3=loadAnimation("")
	robot4=loadAnimation("")
	robot5=loadAnimation("")
	robot6=loadAnimation("")

}

function setup() {
	createCanvas(800, 700);


	engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.
	ironMan = createSprite(50,180,20,50);
  
	ironMan.addAnimation("running", trex_running);
	ironMan.addAnimation("collided", trex_collided);
	ironMan.scale = 0.5;
	
	ground = createSprite(200,180,400,20);
	ground.addImage("ground",groundImage);
	ground.x = ground.width /2;
	ground.velocityX = -(6 + 3*score/100);
	
	gameOver = createSprite(300,100);
	gameOver.addImage(gameOverImg);
	
	restart = createSprite(300,140);
	restart.addImage(restartImg);
	
	gameOver.scale = 0.5;
	restart.scale = 0.5;
  
	gameOver.visible = false;
	restart.visible = false;
	
	invisibleGround = createSprite(200,190,400,10);
	invisibleGround.visible = false;
	
	obstaclesGroup = new Group();
	
	score = 0;

	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(bgImage);
  ext("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && trex.y >= 159) {
      trex.velocityY = -12;
    }
  
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    trex.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    
    //change the trex animation
    ironMan.changeAnimation("collided",ironMan_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  
  ironMan.changeAnimation("running",ironMan_running);
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  
}


