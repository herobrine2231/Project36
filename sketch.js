//const Engine = Matter.Engine;
 //const  World = Matter.World;
 //const Events = Matter.Events;
 // const Bodies = Matter.Bodies;
  //const Constraint = Matter.Constraint;

var dog, happyDog,database,foodS,foodStock;
var dogImage1, dogImage2,dogImage3,dogImage4;
var dogSprite;

var feedPet, addFood, fedTime,lastFed;
var foodObj;
var bedroomImage, gardenImage,washroomImage;
var gameState;
var readState;
var changeState;
var currentTime;
var livingRoomImage;

function preload()
{
  dogImage1=loadImage("images/Dog.png");
  dogImage2=loadImage("images/dogImg.png");
  dogImage3=loadImage("images/dogImg1.png");
  dogImage4=loadImage("images/happydog.png");
  bedroomImage=loadImage("images/Bed Room.png");
  gardenImage=loadImage("images/Garden.png");
  washroomImage=loadImage("images/Wash Room.png");
  livingRoomImage=loadImage("images/Living Room.png")
}

function setup() {

  database = firebase.database();
  //console.log(database);

  createCanvas(500,500);
  
  dogSprite=createSprite(width/2+100,200,10,10);
  dogSprite.addImage(dogImage1);
  dogSprite.scale=0.2;

  foodStock=database.ref('Food');
  foodStock.on("value", readStock);

  foodObj= new Food();

  feedPet= createButton("Feed the dog");
  feedPet.position(650,95);
  feedPet.mousePressed(feedDog);
  
  addFood=createButton("Add Food");
  addFood.position(750,95);
  addFood.mousePressed(addFoods);

  //read game state from database
  readState=database.ref('gameState');
  readState.on("value", function(data)
  {
    gameState=data.val();
   // console.log(gameState);
   //console.log(data.val());
  })
}


function draw() {  

  background(46,139,87);

  foodObj.display();
 /* if(keyWentDown(UP_ARROW))
  { 
    writeStock(foodS);
    dogSprite.addImage(dogImage4);
  }*/


  //add styles here

  

  fedTime=database.ref('FeedTime');
  fedTime.on("value", function(data)
  {
    lastFed=data.val();
  });

  fill(255,255,254);
  textSize(15);
 // console.log(lastFed);
 //console.log(foodStock);
  //console.log(gameState);
  if(lastFed>=12)
  {
    text("Last Feed: "+ lastFed%12 + "PM", 400,30)
  }
  else if(lastFed==0)
  {
    text("Last Feed: 12 AM", 400,30);
  }
  else
  {
    text("Last Feed: " +lastFed +"AM", 400,30);
  }

  textSize(15);
  fill("white");
  stroke(10);
  text("Food Stock:" +foodStock, 20,30);

  if(gameState!= "Hungry")
  {
   feedPet.remove();
   addFood.remove();
   //feedDog.remove();
   dogSprite.remove();
  }
  else
  {
    feedPet.show();
    addFood.show();
    dogSprite.addImage(dogImage4);
  }

  console.log(gameState);
  currentTime=hour();
 // console.log(currentTime);
  if(currentTime==(lastFed+1))
  {
    update("Playing");
    foodObj.garden();
  }
  else if(currentTime==(lastFed+2))
  {
    update("Sleeping");
    foodObj.bedroom();
  }
  else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4))
  {
    update("Bathing");
    foodObj.washroom();
  }
  else
  {
    update("Hungry");
    foodObj.display();
    //background(livingRoomImage, 100,100);
  }
  drawSprites();
}

function feedDog()
{
  dogSprite.addImage(dogImage4);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update(
    {
      Food:foodObj.getFoodStock(),
      FeedTime:hour()
    })
}

function addFoods()
{
  foodStock++;
  database.ref('/').update(
    {
      Food:foodStock
    }
  )
}
/*function readStock(data)
{
  foodS=data.val();
}*/

/*function writeStock(x)
{
  if(x<=0)
  {
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({Food:x})
}*/

function readStock(data)
{
  foodStock=data.val();
  foodObj.updateFoodStock(foodStock);
}

  

function update(state)
{
  database.ref('/').update(
    {
      gameState:state
    }
  );
}



