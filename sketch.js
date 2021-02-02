//Create variables here
var dogImg, happyDogImg, dog, happyDog, database, foodS, foodStock, feedTime, lastFeed, feed, addFood, foodObject;
var bedroomImg,washroomImg,gardenImg;
var gameState, changeGameState,readGameState;
function preload()
{
  //load images here
  dogImg=loadImage("virtual pet images/Dog.png")
  happyDogImg=loadImage("virtual pet images/Happy.png")
  bedroomImg=loadImage("virtual pet images/Bed Room.png")
  gardenImg=loadImage("virtual pet images/Garden.png")
  washroomImg=loadImage("virtual pet images/Wash Room.png")
}

function setup() {
  createCanvas(1000, 400);
  database=firebase.database()

  gameState=database.ref('gameState')
  gameState.on("value",function(data){
    gameState=data.val();
  })
  
  readGameState=database.ref('gameState');
  readGameState.on("value",function(data){
    gameState=data.val();
  });

  foodObject=new food()
  dog=createSprite(800,200,150,150)
  dog.addImage(dogImg)
  dog.scale=0.15

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  feed=createButton("Feed the Dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)

  addFood=createButton("Add Food")
  addFood.position(800,95)
  addFood.mousePressed(addFoods)

  
}


function draw() {  

  
  //add styles here
  background("purple")

 if(gameState!="Hungry"){
   feed.hide()
   addFood.hide()
   dog.remove()
 }else{
   feed.show()
   addFood.show()
   dog.addImage(dogImg)
 }

 currentTime=hour();
     if(currentTime == (lastFeed + 1)){
         update("Playing");
         foodObject.garden();
     } else if(currentTime==(lastFeed+2)){
         update("Sleeping");
         foodObject.bedroom();
     } else if(currentTime>(lastFeed+2) && currentTime<=(lastFeed+4)){
         update("Bathing")
         foodObject.washroom()
     } else{
       update("Hungry")
       foodObject.display()
     }

  foodObject.display()
  feedTime=database.ref('FeedTime')
  feedTime.on("value",function(data){lastFeed=data.val()})

  fill("white")
  textSize(20)
  if(lastFeed>=12){
    text("Last Feed: "+lastFeed%12+" pm",350,30)
  } 
  else if(lastFeed==0){
     text("Last Feed: 12 am",350,30)
  }
  else{
    text("Last Feed: "+lastFeed+" am",350,30)
  }
  drawSprites();
  /*if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }
  stroke("white")
  textSize(20)
  fill("white") 
  text("Food Remaining "+foodS,170,200) 
  text("Note: Press UP_ARROW Key To Feed Drago Milk",40,20)*/
}
function readStock(data){
  foodS=data.val();
  foodObject.updateFoodStock(foodS)
}

/*function writeStock(x){
  if(x<=0){
    x=0}
    else{
      x=x-1
    }
    database.ref('/').update({
    Food:x
  })
}*/
 
function feedDog(){
  dog.addImage(happyDogImg);

  foodObject.updateFoodStock(foodObject.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObject.getFoodStock(),
    FeedTime:hour()
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({Food:foodS})
}
function update(state){
  database.ref('/').update({
    gameState:state
  })
}



