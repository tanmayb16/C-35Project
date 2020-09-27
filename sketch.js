//Create variables here
var dog, happyDog;
var database, foodCount;
var foodS;
var foodStock;
var addFood, feed;
var fedTime, lastFed;
var foodObj;

function preload(){
  //load images here
  dog = loadImage("images/dog.png");
  happyDog = loadImage("images/happydog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(800,400);
  dogSprite = createSprite(650,250,10,10);
  dogSprite.addImage(dog);
  dogSprite.scale = 0.2;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  food1 = new Food();

  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}

function draw() {  
  background(46, 139, 87);

/*  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dogSprite.addImage(happyDog);
  }*/
  food1.display();
  drawSprites();
}

//To read values
function readStock(data){
  foodS = data.val();
  food1.foodStock = foodS;
}

//To write values
function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food : x,
  })
}

function feedDog (){
  dogSprite.addImage(happyDog);
  food1.getFoodStock();
 // console.log(foodCount);
  food1.updateFoodStock(foodCount - 1);
  FeedTime : hour();
  
}

function addFoods(){
  food1.getFoodStock();
  foodS++ ;
  database.ref('/').update({
    Food : foodS,
  })
}



