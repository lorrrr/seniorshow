var Engine = Matter.Engine,
  // Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies;
  Body=Matter.Body;
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint;

var rectangle, ellip,triang,rectangle1;

var engine;
var world;
var boxes = [];
var mConstraint;
var ground, wall1, wall2, wall3;
var union, lido;
var ctx;
var logo;
var scrollPos=0;
var gScale;

function mouseWheel(event) {

  scrollPos += event.delta;
  gScale= map(scrollPos,500,0,-1,1);
    console.log(gScale);
  //posRev = height - 10 - pos;
    world.gravity.y=gScale;
    World.remove(world, wall1);
    fill(255);
    rect(50,0,width-50,height*gScale);
}


function setup() {
  union = loadFont("fonts/union.woff");
  lido = loadFont("fonts/LidoSTF.otf");
  logo=loadImage("asset/logo.svg");


  var canvas = createCanvas(windowWidth, windowHeight);
  ctx = canvas.drawingContext;

  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);
  var options = {
    isStatic: true
  };
  ground = Bodies.rectangle(width / 2, height + 50, width, 98, options);
  wall1 = Bodies.rectangle(width / 2, -50, width, 98, options);
  wall2 = Bodies.rectangle(-50, height / 2, 98, height, options);
  wall3 = Bodies.rectangle(width + 50, height / 2, 98, height, options);

  World.add(world, ground);
  World.add(world, wall1);
  World.add(world, wall2);
  World.add(world, wall3);

  options = {
    friction: 0.7,
    restitution: 0.5
  };

  rectangle = Bodies.rectangle(200, 200, 500, 140, options);
  World.add(world, rectangle);

  ellip=Bodies.circle(300,200,250,options)
  Body.scale(ellip,1,0.28);
  World.add(world, ellip);

  triang= Bodies.polygon(600,200,3,160,options);
  Body.scale(triang,0.9,1);
  Body.rotate(triang,90);
  World.add(world, triang);//h=210



    options = {
      friction: 0.7,
      restitution: 0.5,
      chamfer: { radius: 65 }
    };

  rectangle1 = Bodies.rectangle(800, 200, 700, 140, options);
  World.add(world, rectangle1);

  var canvasmouse = Mouse.create(canvas.elt);
  canvasmouse.pixelRatio = pixelDensity();
  options = {
    mouse: canvasmouse
  };
  mConstraint = MouseConstraint.create(engine, options);
  World.add(world, mConstraint);


}





function draw() {
  background(0);
  Engine.update(engine);

  drawRect();
  drawEllipse();
  drawTriangle();
  drawRect1();
  if (mConstraint.body) {
    var pos = mConstraint.body.position;
    var offset = mConstraint.constraint.pointB;
    var m = mConstraint.mouse.position;

  }
  // rect(ground.position.x, ground.position.y, width, 100);
}

function track(type, x, y, tracking) {
  for (var i = 0; i < type.length; i++) {
    text(type[i], x, y);
    x = x + textWidth(type[i]) + tracking;

  }
}

function trackTime(type, x, y, tracking) {
  for (var i = 0; i < type.length; i++) {
    text(type[i], x, y);
    x = x + textWidth(type[i]) + tracking;
    if (type[i]=="P"){
      x-=5;
    }
  }
}//kerning pair for P.M.




function drawRect() {
  var pos = rectangle.position;
  var angle = rectangle.angle;
  push();
  translate(pos.x, pos.y);
  rotate(angle);
  rectMode(CENTER);
  //textAlign(CENTER);
  noStroke();
  fill(255, 102, 94);
  rect(0, 0, 500, 140);
  fill(0);
  textSize(40);
  textFont(union);
  track("ON VIEW UNTIL", -143, -3, -1);
  textFont(lido);
  textSize(38);
  track("March 17, 2020", -120, 34, -1.5);
  pop();

}

function drawEllipse() {
  var pos = ellip.position;
  var angle = ellip.angle;
  push();
  translate(pos.x, pos.y);
  rotate(angle);
  rectMode(CENTER);
  textAlign(LEFT,CENTER);
  noStroke();
  fill(0,120,191);
  ellipse(0, 0, 500, 140);
  fill(0);
  textSize(40);
  textFont(union);
  track("intersections.risd.gd", -175, -6, -1);
  pop();
}

function drawTriangle() {
  var pos = triang.position;
  var angle = triang.angle;
  push();
  translate(pos.x, pos.y);
  rotate(angle+PI*3);
  scale(0.9,1);
  rectMode(CENTER);
  textAlign(LEFT,CENTER);
  noStroke();
  fill(0,169,92);
  polygon(0,0,160,3);
  fill(0);
  textSize(38);
  rotate(PI/2);
  textFont(lido);
  trackTime("6 P.M. –", -55, -20, -2);
  trackTime("7:30 P.M.", -60, 20, -2);

  pop();

}


function drawRect1() {
  var pos = rectangle1.position;
  var angle = rectangle1.angle;
  push();
  translate(pos.x, pos.y);
  rotate(angle);
  rectMode(CENTER);
  //textAlign(CENTER);
  noStroke();
  fill(255,232,0);
  rect(0, 0, 700, 140,65);
  fill(0);
  textSize(40);
  textFont(union);
  track("OPENING RECEPTION", -195, -3, -1);
  textFont(lido);
  textSize(38);
  track("March 12, 2020", -100, 34, -1.5);
  pop();

}


function polygon(x, y, radius, npoints) {
  let angle = TWO_PI / npoints;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
