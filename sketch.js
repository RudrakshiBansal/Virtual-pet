//Create variables here
var dog,happyDog,database,foodS,foodStock,dogImage,happyDogImage;

function preload()
{
  //load images here
  happyDogImage = loadImage("dogImg1.png");
  dogImage = loadImage("dogImg.png");
}

function setup() {
  createCanvas(500,500);
  database = firebase.database();

  dog = createSprite(250,270,20,20);
  dog.addImage(dogImage);
  dog.scale = 0.2;
  
  foodStock = database.ref("food");
  foodStock.on("value",readStock);
 
}


function draw() {  
  background(46,139,87)

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImage);
  }

  if(foodS === 5){
    textSize(15);
    fill("white");
    stroke("white");
    strokeWeight(0.1);
    text("WARNING: Be carefull only 5 glasses milk are left",25,470);
  }

  drawSprites();

  textSize(25)
  stroke(255,255,255);
  fill(255,255,255);
  
  text("food remaning: "+foodS,150,150);
  textSize(20);
  text("Note: Press up arrow key to feed the dog",80,20)
  //add styles here

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }else{
    x = x-1;
  }
  database.ref().update({
    food:x
  })

  
}



