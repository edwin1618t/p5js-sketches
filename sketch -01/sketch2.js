let bg;
let mo = 0;
let direction = 1;
let directions = [];
let paused = false;

// We’ll drive all motion (pulse + rotation) from this “time” counter
let t = 0;
 

function setup() {
  createCanvas(1500, 900, WEBGL);

  // build our 26 direction vectors
  let vals = [-1, 0, 1];
  for (let x of vals) {
    for (let y of vals) {
      for (let z of vals) {
        if (x !== 0 || y !== 0 || z !== 0) {
          directions.push(createVector(x, y, z));
        }
      }
    }
  }
}

function keyPressed() {
  if (key === ' ') {
    paused = !paused;
  }
}

function draw() {
  background(220, 204, 350);

  // always allow camera orbit
  orbitControl();

  // draw background image behind everything
  

  // only advance our “time” and pulse when NOT paused
  if (!paused) {
    t++;
    mo += 0.5 * direction;
    if (mo > 200 || mo < 0) {
      direction *= -1;
    }
  }

  // use t (not frameCount) for all rotations/glow so they freeze when paused
  let rotateAmount = t * 0.01;
  let glow = map(sin(t * 0.05), -1, 1, 100, 255);

  // apply global rotation to the burst
  push();
    rotateX(rotateAmount);
    rotateY(rotateAmount);
    rotateZ(rotateAmount);

    // draw all outward branches
    for (let dir of directions) {
      for (let i = 0; i < 10; i++) {
        push();
          let x = dir.x * mo;
          let y = dir.y * mo;
          let z = dir.z * mo;
          translate(x, y, z);

          directionalLight(255,255,255, 0,-100,-300);
          ambientLight(200);

          specularMaterial(255);
          shininess(100);
          fill(50,34,120,150);
          strokeWeight(2);

          // rotate each element by its own speed
          rotateY(t * 0.02 * (i+1));
          rotateX(t * 0.02 * (i+1));

          sphere(30);
          box(90, 70, 10);
        pop();
      }
    }

    // center  orb
    push();
      emissiveMaterial(255,100,200, glow);
      rotateX(t * 0.05);
      sphere(30);
    pop();

  pop();
}