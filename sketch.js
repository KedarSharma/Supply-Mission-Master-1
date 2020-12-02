//variables and constants
var intro, introImg;
var helicopterIMG, helicopterSprite; //helicopter
var packageSprite,packageIMG, packageBody;  //package
var ground , groundSprite; //ground
var levelImg, levelSprite; //level image on home screen
var screen = "home"; // screen
var level1Img,level2Img,level3Img,level4Img,level5Img,level6Img; //level images on levels screen
var lvlSprite1,lvlSprite2,lvlSprite3,lvlSprite4,lvlSprite5,lvlSprite6; //level image sprites
var home,homeImg;
var back,backImg;
var level1play , level2play,level3play,level4play,level5play,level6play;
var level1playImg , level2playImg,level3playImg,level4playImg,level5playImg,level6playImg;
var level1water;
var timely;
var edge1,edge2,edge3;
var leveldne,leveldneImg;
var level1star,starback;
var delivery,deliveryImg;
var eject,ejectImg;
var arrow,arrowImg;
var state = "play";
var level1packagezone,packzone1Img;
var limit;
var danger,dangerImg;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

//images
function preload(){
	helicopterIMG=loadImage("helicopter.png");
	homeImg = loadImage("HOME button.jpg");
	packageIMG=loadImage("package.png");
	levelImg = loadImage("LevelImage.jpg");
	introImg = loadImage("Supply Mission.jpg");
	level1Img = loadImage("Level 1.png");
	level2Img = loadImage("Level 2.png");
	level3Img = loadImage("Level 3.png");
	level4Img = loadImage("Level 4.png");
	level5Img = loadImage("Level 5.png");
	level6Img = loadImage("Level 6.png");
	backImg = loadImage("Back Button.png");
	level1playImg = loadImage("Level 1 play.jpg");
	packzone1Img = loadImage("Packagezone level 1.png");
	starback = loadImage("Star background.jpg");
	dangerImg = loadImage("DANGER ALERT.jpg");
	leveldneImg = loadImage("Level dne.png");
	deliveryImg = loadImage("Delivery.jpg");
	ejectImg = loadImage("Eject.jpg");
	arrowImg = loadImage("Arrow.jpg");
}

//setting all things up
function setup(){
	createCanvas(1200, 600);
	rectMode(CENTER);

	edge1 =createSprite(600,0,1200,1);
	edge1.visible = false;

	edge2 =createSprite(0,150,1,300);
	edge2.visible = false;

	edge3 =createSprite(1200,150,1,300);
	edge3.visible = false;

	engine = Engine.create();
	world = engine.world;

	//limit
	limit = createSprite(600,300,1200,20);
	limit.visible = false;

	//starry background
	level1star = createSprite(600,200);
	level1star.addImage(starback);
	level1star.visible = false;

	//alert
	danger = createSprite(600,100);
	danger.addImage(dangerImg);
	danger.visible = false;

	//intro sign
	intro = createSprite(600,300);
	intro.addImage(introImg);
	intro.scale = 1.5;

	//back button
	back = createSprite(75,300);
	back.addImage(backImg);
	back.scale = 0.25;

	//level
	levelSprite = createSprite(600,300);
	levelSprite.addImage(levelImg);
	levelSprite.scale = 0.2;

	//level sprites at levels screen
	lvlSprite1 = createSprite(200,150);
	lvlSprite1.addImage(level1Img);
	lvlSprite1.scale = 0.13;

	lvlSprite2 = createSprite(600,150);
	lvlSprite2.addImage(level2Img);
	lvlSprite2.scale = 0.13;

	lvlSprite3 = createSprite(1000,150);
	lvlSprite3.addImage(level3Img);
	lvlSprite3.scale = 0.13;

	lvlSprite4 = createSprite(200,450);
	lvlSprite4.addImage(level4Img);
	lvlSprite4.scale = 0.13;

	lvlSprite5 = createSprite(600,450);
	lvlSprite5.addImage(level5Img);
	lvlSprite5.scale = 0.13;

	lvlSprite6 = createSprite(1000,450);
	lvlSprite6.addImage(level6Img);
	lvlSprite6.scale = 0.13;

	//level initiative
	level1play = createSprite(1200,500);
	level1play.addImage(level1playImg);
	level1play.visible = false;
	level1play.scale = 2;

	level1water = createSprite(600,650,1200,100);
	level1water.shapeColor = "blue";
	level1water.visible = false;

	level1packagezone = createSprite(900,450);
	level1packagezone.addImage(packzone1Img);
	level1packagezone.visible = false;

	//ground
	groundSprite=createSprite(600,565,1200,30);
	groundSprite.shapeColor=color(255);
	groundSprite.visible = false;

	ground = Bodies.rectangle(600, groundSprite.y - 15, width, 30 , {isStatic:true} );
	World.add(world, ground);

	//package
	packageSprite=createSprite(width/2, 200, 10,10);
	packageSprite.addImage(packageIMG);
	packageSprite.scale=0.2;

	packageBody = Bodies.rectangle(width/2 , 200 , 5, 5 , {restitution:0.5, isStatic:true});
	World.add(world, packageBody);

	//helicopter
	helicopterSprite=createSprite(width/2, 200);
	helicopterSprite.addImage(helicopterIMG);
	helicopterSprite.scale=0.6;	

	leveldne = createSprite(600,300);
	leveldne.addImage(leveldneImg);
	leveldne.scale = 0.1;
	leveldne.visible = false;

	home = createSprite(600,500);
	home.addImage(homeImg);
	home.scale = 0.1;
	home.visible = false;

	delivery = createSprite(1060,450);
	delivery.addImage(deliveryImg);
	delivery.scale = 0.1;
	delivery.visible = false;

	eject = createSprite(600,400);
	eject.addImage(ejectImg);
	eject.scale = 0.1;
	eject.visible = false;

	arrow = createSprite(300,400);
	arrow.addImage(arrowImg);
	arrow.scale = 0.1;
	arrow.visible = false;

	Engine.run(engine);
  
}

//things happen here
function draw(){

	helicopterSprite.collide(edge1);
	helicopterSprite.collide(edge2);
	helicopterSprite.collide(edge3);

	packageSprite.collide(groundSprite);
	helicopterSprite.collide(limit);

	var time = performance.now(); 
	var correctTime = Math.round(time/1000);

	//home screen
	if(screen == "home"){
		rectMode(CENTER);
		background("#5ABBEB");
		helicopterSprite.visible = true;
		levelSprite.visible = true;
		lvlSprite1.visible = false;
		lvlSprite2.visible = false;
		lvlSprite3.visible = false;
		lvlSprite4.visible = false;
		lvlSprite5.visible = false;
		lvlSprite6.visible = false;
		back.visible = false;

		if(mousePressedOver(levelSprite)){
			screen = "levels";
			helicopterSprite.visible = false;
			levelSprite.visible = false;
			packageSprite.visible = false;
			lvlSprite1.visible = true;
			lvlSprite2.visible = true;
			lvlSprite3.visible = true;
			lvlSprite4.visible = true;
			lvlSprite5.visible = true;
			lvlSprite6.visible = true;
		}
	}

	//levels
	if(screen == "levels"){
		back.visible = true;
		if(mousePressedOver(back)){
			screen = "home";
		}

		if(mousePressedOver(lvlSprite1)){
			intro.visible = false;
			lvlSprite1.visible = false;
			lvlSprite2.visible = false;
			lvlSprite3.visible = false;
			lvlSprite4.visible = false;
			lvlSprite5.visible = false;
			lvlSprite6.visible = false;
			level1water.visible = true;
			level1play.visible = true;
			helicopterSprite.visible = true;
			packageSprite.visible = true;
			back.visible = false;
			timely = correctTime;
			console.log(timely);
			screen = "level1";
			level1star.visible = true;
			level1packagezone.visible = true;
			helicopterSprite.x = 200;
		}
		if(mousePressedOver(lvlSprite2)){
			leveldne.visible = true;
			leveldne.x = lvlSprite2.x;
			leveldne.y = 300;
		}
		if(mousePressedOver(lvlSprite3)){
			leveldne.visible = true;
			leveldne.x = lvlSprite3.x;
			leveldne.y = 300;
		}
		if(mousePressedOver(lvlSprite4)){
			leveldne.visible = true;
			leveldne.x = lvlSprite4.x;
			leveldne.y = 550; 
		}
		if(mousePressedOver(lvlSprite5)){
			leveldne.visible = true;
			leveldne.x = lvlSprite5.x;
			leveldne.y = 550;
		}
		if(mousePressedOver(lvlSprite6)){
			leveldne.visible = true;
			leveldne.x = lvlSprite6.x;
			leveldne.y = 550;
		}
	}

	//first level
	if(screen == "level1"){
		background("#000E8C");

		level1play.visible = true;
		helicopterSprite.visible = true;
		packageSprite.visible = true;
		level1star.visible = true;
		level1packagezone.visible = true;
		delivery.visible = true;
		eject.visible = true;
		arrow.visible = true;

		packageSprite.depth = 1000000;
		helicopterSprite.depth = 1000000000000;

		if(packageSprite.collide(groundSprite)){
			packageSprite.velocityY = 0;
		}
		if((correctTime - timely)%1 == 0){
			level1water.y = level1water.y - 0.01;
		}
		if(keyDown(RIGHT_ARROW)){
			helicopterSprite.x = helicopterSprite.x + 5;
		}
		if(keyDown(DOWN_ARROW)){
			helicopterSprite.y = helicopterSprite.y + 5;
		}
		if(keyDown(LEFT_ARROW)){
			helicopterSprite.x = helicopterSprite.x - 5;
		}
		if(keyDown(UP_ARROW)){
			helicopterSprite.y = helicopterSprite.y - 5;
		}

		if(helicopterSprite.y + (helicopterSprite.height)/2 >= 300){
			danger.visible = true;
		}
		else{
			danger.visible = false;
		}

		//play states
		if(state == "play"){
			packageSprite.x = helicopterSprite.x;
			packageSprite.y = helicopterSprite.y;

			packageBody.position.x = packageSprite.x;
			packageBody.position.y = packageSprite.y;			

			if (keyWentDown("e")){
				Matter.Body.setStatic(packageBody,false);
				state= "eject";
			}

			if(level1water.y < 520){
				state = "lose";
			}
		}

		if(state == "eject"){
			packageSprite.velocityY = packageSprite.velocityY + 1;

			packageBody.position.x = packageSprite.x;
			packageBody.position.y = packageSprite.y;

			if(packageSprite.x >= level1packagezone.x - level1packagezone.width
				&& packageSprite.x <= level1packagezone.x + level1packagezone.width
				&& packageSprite.y >= level1packagezone.y - level1packagezone.height
				&& packageSprite.y <= level1packagezone.y + level1packagezone.height
				&& packageSprite.velocityY <= 10){
					state = "win";
			}
			else if(packageSprite.x < level1packagezone.x - level1packagezone.width
				&& packageSprite.velocityY <= 10
				&& packageSprite.y > 500){
					state = "lose";
			}
			else if(packageSprite.x > level1packagezone.x + level1packagezone.width
				&& packageSprite.velocityY <= 10
				&& packageSprite.y > 500){
					state = "lose";
			}
		
		}

		if(state == "win"){
			delivery.visible = false;
			eject.visible = false;
			home.visible = true;
			arrow.visible = false;
			level1packagezone.visible = false;
			helicopterSprite.visible = false;
			packageSprite.visible = false;
			level1water.visible = false;
			level1play.visible = false;
			helicopterSprite.y = 100;
			dangervisible = false;
			level1star.visible = false;
			background("black");
			fill("red");
			textSize(80);
			text("YOU WIN !!!!!!!",400,320);

			if(mousePressedOver(home)){
				home.visible = false;
				screen = "home";
				intro.visible = true;
				helicopterSprite.x = width/2;
				helicopterSprite.y = 200;
				state = "play";
				level1water.y = 650;
			}
		}
		if(state == "lose"){
			delivery.visible = false;
			eject.visible = false;
			home.visible = true;
			arrow.visible = false;
			level1packagezone.visible = false;
			helicopterSprite.visible = false;
			packageSprite.visible = false;
			level1water.visible = false;
			level1play.visible = false;
			helicopterSprite.y = 100;
			dangervisible = false;
			level1star.visible = false;
			background("black");
			fill("red");
			textSize(80);
			text("YOU LOSE",400,320);

			if(mousePressedOver(home)){
				home.visible = false;
				state = "play";
				screen = "home";
				intro.visible = true;
				helicopterSprite.x = width/2;
				helicopterSprite.y = 200;
				level1water.y = 650;
			}
		}

	}

	drawSprites();
}	