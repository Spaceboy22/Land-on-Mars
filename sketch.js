var backgroundImg;
var rocketImg;
var rocket;
var bg;
var gameState="play"
var lives=3;
function preload(){
  backgroundImg=loadImage("Assets/background.jpg")
  rocketImg=loadImage("Assets/rocket-spaceship-design-illustration-set-isolated-on-white-background-free-vector-removebg-preview-removebg-preview.png")
  asteroidImg=loadImage("Assets/Asteroid-PNG-Free-Image.png")
  heart0Img=loadImage("Assets/life-bar-health-bar-pixel-art_163786-433__2_-removebg-preview 3.png")
  heart1Img=loadImage("Assets/life-bar-health-bar-pixel-art_163786-433-removebg-preview.png")
  heart2Img=loadImage("Assets/life-bar-health-bar-pixel-art_163786-433__2_-removebg-preview.png")
  heart3Img=loadImage("Assets/life-bar-health-bar-pixel-art_163786-433__1_-removebg-preview.png")
}
function setup() {
  createCanvas(windowWidth,windowHeight);
  bg = createSprite(width/2, height/2, width, height);
  bg.addImage(backgroundImg);
  bg.scale=0.35
  rocket = createSprite(width/2,400);
  rocket.addImage(rocketImg);
  rocket.scale=0.5;
  rocket.debug=false;
  rocket.setCollider
  rectMode(CENTER);
  textSize(30)
  ground = createSprite(width/2, height-90,width, 10)
  ground.visible=false;

  heart0= createSprite(1750, 20)
  heart1= createSprite(1750, 20)
  heart2= createSprite(1750, 20)
  heart3= createSprite(1750, 20)

  heart0.addImage(heart0Img)
  heart1.addImage(heart1Img)
  heart2.addImage(heart2Img)
  heart3.addImage(heart3Img)

  heart0.scale=0.4
  heart1.scale=0.4
  heart2.scale=0.4
  heart3.scale=0.4

  heart0.visible=false;
  heart1.visible=false;
  heart2.visible=false;
  heart3.visible=true;

  asteroidGroup=new Group()
}

function draw() {
  background(0,0,0);
  //image(backgroundImg,0,0)
  //rocket.velocityY=-3
  //console.log(rocket.position.y)  
  drawSprites();
  fill("blue")
  text("vertical.velocity : "+ rocket.position.y,100,100)
  text("Lives : "+ lives, 1710, 70)
  if(gameState=="play"){
  rocket.position.y=rocket.position.y-3
  downArrow()
  leftArrow()
  rightArrow()
  asteroids()



  if(lives==3){
    heart0.visible=false;
    heart1.visible=false;
    heart2.visible=false;
    heart3.visible=true;
  }
  if(lives==2){
    heart0.visible=false;
    heart1.visible=false;
    heart2.visible=true;
    heart3.visible=false;
  }

  if(lives==1){
    heart0.visible=false;
    heart1.visible=true;
    heart2.visible=false;
    heart3.visible=false;
  }

  if(lives==0){
    heart0.visible=true;
    heart1.visible=false;
    heart2.visible=false;
    heart3.visible=false;
    gameState="lost"
  }

  if(rocket.isTouching(ground)){
    gameState="win"
  }
  if(asteroidGroup.isTouching(rocket)){
    for(var i = 0; i < asteroidGroup.length; i++){
      if(asteroidGroup[i].isTouching(rocket)){
        lives=lives-1
        asteroidGroup[i].destroy()
      }
    }
  }
  }

  if(gameState=="win"){
    asteroidGroup.destroyEach();
    rocket.position.y = ground.y-125
    fill("green")
    textSize(60)
    text("You Win", width/2, height/2)
  }
  if(gameState=="lost"){
    asteroidGroup.destroyEach();
    rocket.position.y= height/2+60
    fill("green")
    textSize(60)
    text("Try Again", width/2, height/2)
  }

}

function downArrow(){
  if(keyDown(DOWN_ARROW)){
    rocket.position.y=rocket.position.y+4;
  }
}
function leftArrow(){
  if(keyDown(LEFT_ARROW)){
  rocket.position.x=rocket.position.x-4;
  }
}

function rightArrow(){
  if(keyDown(RIGHT_ARROW)){
  rocket.position.x=rocket.position.x+4;
  }
}
function asteroids(){
  if(frameCount%15==0){
  asteroid=createSprite(random(10, 500),random(10,height-500))
  asteroid.debug=false;
  asteroid.scale=0.1
  asteroid.addImage(asteroidImg)
  asteroid.velocityX=3
  asteroidGroup.add(asteroid)
  asteroid.lifetime=500
  }
  
}
//adjust text size, adjust setCollider radius, adjust rocket position
