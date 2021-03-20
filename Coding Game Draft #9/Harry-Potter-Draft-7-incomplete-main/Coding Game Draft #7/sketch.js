
var bg, bgimg, bg2, bgimg2;

var harry, harryimg;

var deatheaters, deathimg;

var text1, textimg;

var lightning1, lightning2, lightning3, lightning4;

var lightning5, lightning6;

var lightning;
var lightningGroup;

var HarryfirespellGroup;
var DeathfirespellGroup;

var Harryfireballimg;
var Deathfireballimg;

var gameState = "start";

var scoreHarry = 500;
var scoreDeath = 500;


function preload(){
//preloading background images
  bgimg = loadImage("HarryImages/background.jpg");
  bgimg2 = loadImage("HarryImages/Burrow.jpg");
  
//preloading harry images
  harryimg = loadImage("HarryImages/harryonbroom.png");
  harry2img = loadImage("DeathImages/harryonbroom.png");

//preloading death images
  deathimg = loadImage("HarryImages/HarryDeath.png");
  death2img = loadImage("DeathImages/Deatheater.png");

//choose your player preloading
  textimg = loadImage("HarryImages/Chooseyourplayer.png");


//preloading lightning images
  lightning1 = loadImage("HarryImages/Lightning1.png");
  lightning2 = loadImage("HarryImages/Lightning2.png");
  lightning3 = loadAnimation("HarryImages/Lightning3.png", "HarryImages/Lightning4.png");
  lightning4 = loadAnimation("HarryImages/Lightning4.png", "HarryImages/Lightning3.png");
  lightning5 = loadImage("HarryImages/Lightning5.png");
  lightning6 = loadImage("HarryImages/Lightning6.png");

//preloading fireball animations
  Harryfireballimg = loadAnimation("HarryImages/Fireball1.png", "HarryImages/Fireball2.png", "HarryImages/Fireball3.png", "HarryImages/Fireball4.png", "HarryImages/Fireball5.png");
  Deathfireballimg = loadAnimation("DeathImages/Fireball1.png", "DeathImages/Fireball2.png", "DeathImages/Fireball3.png", "DeathImages/Fireball4.png", "DeathImages/Fireball5.png");

//preloading sound
  HarryPlaySound = loadSound("themesong.mp3");
  DeathPlaySound = loadSound("themesong.mp3");

}


function setup(){
  createCanvas(displayWidth, 400)
  
  bg = createSprite(displayWidth/2, 200, displayWidth, 400);
  bg.addImage(bgimg);
  bg.x = bg.width/2;
  bg.velocityX = -5;
  bg.scale = 1.8;

  bg2 = createSprite((displayWidth/2)-700, 200, displayWidth, 20);
  bg2.addImage(bgimg2);
  bg2.visible = false;

  edge1 = createSprite(displayWidth/2, 410, displayWidth, 20);
  edge2 = createSprite(displayWidth/2, -10, displayWidth, 20);
  
  harry = createSprite(displayWidth-660, 200, 30, 30);
  harry.addImage("harry", harryimg);
  harry.addImage("harry2", harry2img);
  harry.scale = 0.3;
  harry.debug = true;
  
  deatheaters = createSprite(displayWidth-800, 190, 10, 10);
  deatheaters.addImage("death", deathimg);
  deatheaters.addImage("death2", death2img);
  deatheaters.scale = 0.8;
  deatheaters.debug=true;
  deatheaters.setCollider("rectangle",-80,0,60,80)
  
  text1 = createSprite(displayWidth-750, 50, 50, 50);
  text1.addImage(textimg);
  text1.scale = 0.1; 

//creating new groups
  lightningGroup = new Group();
  HarryfirespellGroup = new Group();
  DeathfirespellGroup = new Group()
}

function draw(){
  background("white");
  drawSprites();
  
  deatheaters.velocityY = 0;
  harry.velocityY = 0;

  edgecollide();

//gamestates for winning and losing both sides
  if(gameState === "winDeath"){
    bg2.visible = false;
    textSize(40)
    text("You Win! The Dark Lord appreciates your help in getting rid of Harry Potter. Play again!", camera.position.x-50, 200);
    harry.visible = false;
    harry2.visible = false;
    deatheaters.y = 320;
    Deathfirespell.visible = false;
    Deathfirespellbutton.visible = false;
  }

  if(gameState === "loseDeathL"){
    bg.visible = false;
    textSize(40)
    text("You lost! Try again to get past the first round!", camera.position.x-50, 200);
    harry.visible = false;
    harry2.visible = false;
    deatheaters.y = 320;
    lightning.visible = false;
  }

  if(gameState === "loseDeathH"){
    bg.visible = false;
    bg2.visible = false;
    textSize(40)
    text("You lost to Harry Potter! Keep Trying!", camera.position.x-50, 200);
    Deathfirespellbutton.visible = false;
    harry.visible = false;
    harry2.visible = false;
    deatheaters.y = 320;
    lightning.visible = false;
  }


  if(gameState === "winHarry"){
    bg2.visible = false;
    textSize(40)
    text("You Won! You defeated the Deatheater and made it safely to the Burrow. Play again!", camera.position.x-50, 200);
    deatheaters.visible = false;
    harry.y = 320;
    Harryfirespell.visible = false;
    Harryfirespellbutton.visible = false;
  }

  if(gameState === "loseHarryL"){
    bg.visible = false;
    textSize(40)
    text("You lost! Try again to get past the first round!", camera.position.x-50, 200);
    deatheaters.visible = false;
    harry.y = 320;
    lightning.visible = false;
  }

  if(gameState === "loseHarryD"){
    bg.visible = false;
    textSize(40)
    text("You lost to the Deatheater! Try again to defeat the Deatheater again!", camera.position.x-50, 200);
    deatheaters.visible = false;
    console.log("harry lost");
    harry.y = 320;
    lightning.visible = false;
  }

//harry code starting
  if(mousePressedOver(harry) && gameState === "start"){
    harryPlayer();

    HarryPlaySound.play();
    
    bg.velocityX = 0;

    gameState = "playHarry"
    
    harry.changeImage("harry");
  }

  if(bg.x<200){
    bg.x = bg.width/2;
  } 

  if(gameState === "playHarry"){
    spawnLightning();

    edgecollide();

    if(scoreHarry <= 0){
      gameState = "loseHarryL";
    }

    bg.depth = deatheaters.depth;
    bg.depth += 5;
    harry.depth = bg.depth + 5

    textSize(20);
    text("Count:" + scoreHarry, camera.position.x-50, 320);

    HarrykeyControls();

    if(lightningGroup.isTouching(harry)){
      scoreHarry = scoreHarry - 5;
    }

    if(harry.x<0){
      gameState = "level1Harry";
    }
  }

  if(gameState === "level1Harry"){
    harryPlayer();
    deatheaters.x = camera.position.x-300;

    edgecollide();

    if(scoreHarry <= 0){
      gameState = "loseHarryD";
    }

    if(scoreDeath <= 0){
      gameState = "winHarry";
    }

    bg.visible = false;
    bg2.visible = true;

    if(bg2.x<200){
      bg2.x = bg2.width/2;
    }

    bg2.scale = 1.2;
    harry.depth = bg2.depth;
    harry.depth = harry.depth+5;
    deatheaters.depth = harry.depth;

    Harryfirespellbutton = createImg("HarryImages/Fireballbutton.png", "firebutton");
    Harryfirespellbutton.position((displayWidth/2)+350, 320)
    Harryfirespellbutton.size(60, 60);

    Harryfirespellbutton.mousePressed((()=>{      
     firespellsHarry();
    }))

    if(HarryfirespellGroup.isTouching(deatheaters)){
      HarryfirespellGroup.destroyEach();
      scoreDeath = scoreDeath - 40;
    }

    if(DeathfirespellGroup.isTouching(harry)){
      DeathfirespellGroup.destroyEach();
      scoreHarry = scoreHarry - 40;
    }

    if(frameCount % 120 === 0){
      deatheaters.y = random(0,300);
    }

    if(frameCount % 1000 === 0){
      deatheaters.y = harry.y;
    }

    if(frameCount % 250 === 0){
      deatheaters.y = harry.y;
      firespellsdeath();
    }

    textSize(20);
    text("Harry Count:" + scoreHarry, camera.position.x-100, 320);
    text("Deatheater Count:" + scoreDeath, camera.position.x-500, 320);

    HarrykeyControls();
  }


//deatheater code starting
  if(mousePressedOver(deatheaters) && gameState === "start"){
    deathPlayer();

    DeathPlaySound.play();

    bg.velocityX = 0;

    gameState = "playDeath"

    deatheaters.changeImage("death2");

    harry.changeImage("harry2", harry2img);
  }

  if(bg.x<200){
    bg.x = bg.width/2;
  } 

  if(gameState === "playDeath"){
    spawnLightning();

    edgecollide();

    if(scoreDeath <= 0){
      gameState = "loseDeathL";
    }

    edge1.visible = true;
    edge2.visible = true;

    bg.depth = deatheaters.depth;
    bg.depth += 5;
    deatheaters.depth = bg.depth + 5

    textSize(20);
    text("Count:" + scoreDeath, camera.position.x-50, 320);

    DeathkeyControls();

    if(lightningGroup.isTouching(deatheaters)){
      scoreDeath = scoreDeath - 5;
    }

    if(deatheaters.x<0){
      gameState = "level1Death";
    }

  }
    
    if(gameState === "level1Death"){
      deathPlayer();
      harry.x = camera.position.x-300;

      edgecollide();

      if(scoreDeath <= 0){
        gameState = "loseDeathH";
        textSize(40)
        text("You lost to Harry Potter! Keep Trying!", displayWidth/2, displayHeight/2);
      }

      if(scoreHarry <= 0){
        gameState = "winDeath"
      }
     
         
      bg.visible = false;
      bg2.visible = true;
      bg2.scale = 1.2;
      deatheaters.depth = bg2.depth;
      deatheaters.depth = deatheaters.depth+5;
      harry.depth = deatheaters.depth;
    
      Deathfirespellbutton = createImg("DeathImages/Fireballbutton.png", "firebutton");
      Deathfirespellbutton.position((displayWidth/2)+350, 320)
      Deathfirespellbutton.size(60, 60);
    
    
      Deathfirespellbutton.mousePressed((()=>{      
        firespellsDeath();
      }))
    
      if(DeathfirespellGroup.isTouching(harry)){
        DeathfirespellGroup.destroyEach();
        scoreHarry = scoreHarry - 40;
      }
    
      if(HarryfirespellGroup.isTouching(deatheaters)){
        HarryfirespellGroup.destroyEach();
        scoreDeath = scoreDeath - 40;
      }
    
    
      if(frameCount % 120 === 0){
        harry.y = random(0,300);
      }
    
      if(frameCount % 1000 === 0){
        harry.y = deatheaters.y;
      }
    
      if(frameCount % 250 === 0){
        harry.y = deatheaters.y;
        firespellsharry();
      }
    
      textSize(20);
      text("Harry Count:" + scoreHarry, camera.position.x-500, 320);
      text("Deatheater Count:" + scoreDeath, camera.position.x-100, 320);
      
      DeathkeyControls();
    }

  function harryPlayer(){
    text1.visible = false;
    harry.debug = true;
  }

  function deathPlayer(){
    text1.visible = false;
    deatheaters.debug = true;
  }

  function spawnLightning(){
    if(frameCount % 50 === 0){
      lightning = createSprite(Math.round(random(10,700)), Math.round(random(10,50)), 40, 40);
      lightning.depth = bg.depth;
      lightning.depth = lightning.depth+10;
        var rand = 
      Math.round(random(1,6));
        switch(rand){
          case 1:
      lightning.addImage(lightning1);
                    break;
          case 2:
      lightning.addImage(lightning2);
                    break;
          case 3:
      lightning.addAnimation("l3", lightning3);
                    break;
          case 4:
      lightning.addAnimation("l4", lightning4);
                    break;
          case 5:
      lightning.addImage(lightning5);
                    break;
          case 6:
      lightning.addImage(lightning6);
                    break;
        }
    lightning.lifetime = 50;
    lightningGroup.add(lightning);
    }
  }

  function firespellsHarry(){
    var Harryfirespell = createSprite(displayWidth/2, 200, 40, 40);
    Harryfirespell.addAnimation("f1", Harryfireballimg);
    HarryfirespellGroup.add(Harryfirespell)
    Harryfirespell.x = harry.x;
    Harryfirespell.y = harry.y;
    Harryfirespell.debug=true;
    Harryfirespell.setCollider("rectangle",-10,0,5,1)
    Harryfirespell.velocityX = -6;
    Harryfirespell.depth = deatheaters.depth;
    
  }

  function firespellsdeath(){
    var Deathfirespell = createSprite(displayWidth/2, 200, 40, 40);
    Deathfirespell.addAnimation("f1", Deathfireballimg);
    DeathfirespellGroup.add(Deathfirespell)
    Deathfirespell.x = deatheaters.x;
    Deathfirespell.y = deatheaters.y;
    Deathfirespell.debug=true;
    Deathfirespell.setCollider("rectangle",-10,0,5,1)
    Deathfirespell.velocityX = 6;
    Deathfirespell.depth = harry.depth;
  }

  function firespellsharry(){
    var Harryfirespell = createSprite(displayWidth/2, 200, 40, 40);
    Harryfirespell.addAnimation("f1", Deathfireballimg);
    HarryfirespellGroup.add(Harryfirespell)
    Harryfirespell.x = harry.x;
    Harryfirespell.y = harry.y;
    Harryfirespell.debug=true;
    Harryfirespell.setCollider("rectangle",-10,0,5,1)
    Harryfirespell.velocityX = 6;
    Harryfirespell.depth = deatheaters.depth;
  }

  function firespellsDeath(){
    var Deathfirespell = createSprite(displayWidth/2, 200, 40, 40);
    Deathfirespell.addAnimation("f1", Harryfireballimg);
    DeathfirespellGroup.add(Deathfirespell)
    Deathfirespell.x = deatheaters.x;
    Deathfirespell.y = deatheaters.y;
    Deathfirespell.debug=true;
    Deathfirespell.setCollider("rectangle",-10,0,5,1)
    Deathfirespell.velocityX = -6;
    Deathfirespell.depth = harry.depth;
  }

  function edgecollide(){
    harry.collide(edge1);
    harry.collide(edge2);
    deatheaters.collide(edge1);
    deatheaters.collide(edge2);
  }

  function HarrykeyControls(){
    if(keyIsDown(LEFT_ARROW)){
      harry.x = harry.x-6;
      edge1.x = edge1.x-6;
      edge2.x = edge2.x-6;
      camera.position.x = harry.x;
    }

    if(keyIsDown(RIGHT_ARROW)){
      harry.x = harry.x+6;
      edge1.x = edge1.x+6;
      edge2.x = edge2.x+6;
      camera.position.x = harry.x;
    }

    if(keyIsDown(DOWN_ARROW)){
      harry.y = harry.y+6;
    }

    if(keyIsDown(UP_ARROW)){
      harry.y = harry.y-6;
    }
  }

  function DeathkeyControls(){
    if(keyIsDown(LEFT_ARROW)){
      deatheaters.x = deatheaters.x-6;
      edge1.x = edge1.x-6;
      edge2.x = edge2.x-6;
      camera.position.x = deatheaters.x;
    }

    if(keyIsDown(RIGHT_ARROW)){
      deatheaters.x = deatheaters.x+6;
      edge1.x = edge1.x+6;
      edge2.x = edge2.x+6;
      camera.position.x = deatheaters.x;
    }

    if(keyIsDown(DOWN_ARROW)){
      deatheaters.y = deatheaters.y+6;
    }

    if(keyIsDown(UP_ARROW)){
      deatheaters.y = deatheaters.y-6;
    }
  }

}
