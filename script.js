var Engine = Matter.Engine,
  // Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies;
  Body=Matter.Body;
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint;

var rectangle, ellip,triang,rectangle1,hexagon;

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

// function mouseWheel(event) {
//
//   scrollPos += event.delta;
//   gScale= map(scrollPos,500,0,-1,1);
//     console.log(gScale);
//   //posRev = height - 10 - pos;
//     world.gravity.y=gScale;
//     World.remove(world, wall1);
//     fill(255);
//     rect(50,0,width-50,height*gScale);
// }


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
  ground = Bodies.rectangle(width / 2, height + 50, width+200, 98, options);
  wall1 = Bodies.rectangle(width / 2, -50, width+200, 98, options);
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

  rectangle = Bodies.rectangle(width*0.2, 200, 450, 140, options);
  World.add(world, rectangle);

  ellip=Bodies.circle(width*0.3,200,250,options)
  Body.scale(ellip,1,0.28);
  World.add(world, ellip);

  triang= Bodies.polygon(width*0.6,200,3,160,options);
  Body.scale(triang,0.9,1);
  Body.rotate(triang,90);
  World.add(world, triang);//h=210




    options = {
      friction: 0.7,
      restitution: 0.5,
      chamfer: { radius: 65 }
    };

  rectangle1 = Bodies.rectangle(width*0.8, 200, 650, 140, options);
  World.add(world, rectangle1);
  options = {
    friction: 0.7,
    restitution: 0.5
  };

  hexagon = Bodies.polygon(width*0.9,100,6,160,options);
  Body.scale(hexagon,0.8,1);
  Body.rotate(hexagon,90);
  World.add(world, hexagon);





  var canvasmouse = Mouse.create(canvas.elt);
  canvasmouse.pixelRatio = pixelDensity();
  options = {
    mouse: canvasmouse
  };
  mConstraint = MouseConstraint.create(engine, options);
  World.add(world, mConstraint);
  world.gravity.y=0.8;

}





function draw() {
  background(0);
  Engine.update(engine);

  drawRect();
  drawEllipse();
  drawTriangle();
  drawRect1();
  drawHex();


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
  rect(0, 0, 450, 140);
  fill(0);
  textSize(40);
  textFont(union);
  track("ON VIEW UNTIL", -143, -3, -1.5);
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

  pop();
  push();
  fill(0);
  textSize(38);
  translate(pos.x, pos.y);
  rotate(angle+PI*3+PI/2);
  textFont(lido);
  trackTime("6 P.M. –", -55, -10, -2);
  trackTime("7:30 P.M.", -60, 30, -2);

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
  rect(0, 0, 650, 140,65);
  fill(0);
  textSize(40);
  textFont(union);
  track("OPENING RECEPTION", -195, -3, -1.5);
  textFont(lido);
  textSize(38);
  track("March 12, 2020", -100, 34, -1.5);
  pop();

}




function drawHex() {
  var pos = hexagon.position;
  var angle = hexagon.angle;
  push();
  translate(pos.x, pos.y);

  rotate(angle+PI/2);
  scale(1,0.8);
  rectMode(CENTER);
  //textAlign(CENTER);
  noStroke();
  fill(0,120,191);
  polygon(0, 0, 160,6);
  pop();
  push();

  fill(0);
  translate(pos.x, pos.y);
  rotate(angle+PI/2*3);
  textSize(40);
  textFont(union);

  track("WOODS-", -80, -25, -1.5);
  track("GERRY", -70, 15, -1.5);
  track("GALLERY", -90, 55, -1.5);
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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  setup();
}
