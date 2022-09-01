let alter = true;

particles = []

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    frameRate(120);
  }

function sandColor() {
  r = Math.floor(Math.random() * (255 - 230 + 1) + 230)
  g = Math.floor(Math.random() * (230 - 200 + 1) + 230)
  b = Math.floor(Math.random() * (150 - 130 + 1) + 130)
  return color(r, g, b)
}
  
function drect(c, x, y, l, w) {
  noStroke();
  fill(c);
  rect(x, y, l, w);
}

class Particle {
  constructor(p, c, x, y, s) {
    this.p = p;
    this.c = c;
    this.x = x;
    this.y = y;
    this.s = s;
  }

  draw() {
    drect(this.c, this.x, this.y, this.s, this.s);
  }
}

function check(x, y) {
  found = false;
  let p;
  for (i in particles) {
    if (particles[i].x == x && particles[i].y == y) {
      found = true;
      p = particles[i].p;
    }
  }
  if (found) {
    return [found, p] 
  } else {
    return [found];
  }
}

function draw() {

  drect(color(37, 150, 190), 0, 0, windowWidth, windowHeight)

  tw = 4;
  th = 4;

  for (var i in particles) {
    particles[i].draw()
  }

  alter = !(alter)
  if (!alter) {

    for (i in particles) {
      if (particles[i].p == 's') {
        let down = false
        if (!check(particles[i].x, particles[i].y + 4)[0]) {
          particles[i].y += 4;
          down = true;
        }
        if (!down) {
          let r = Math.floor(Math.random() * 2) + 1;
          if (r == 1) {
            if (!check(particles[i].x - 4, particles[i].y + 4)) {
              particles[i].y += 4;
              particles[i].x -= 4;
            } else {
              if (!check(particles[i].x + 4, particles[i].y + 4)) {
                particles[i].y += 4;
                particles[i].x += 4;
              }
            }
          }
        }
      }
    }

    if (mouseIsPressed) {
      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
          let p = 's'
          let c = sandColor()
          let x = (Math.floor(mouseX / tw)) * tw + (i * 4) - 9;
          let y = (Math.floor(mouseY / th)) * th + (j * 4) - 9;
          let s = 4;
    
          let sand = new Particle(p, c, x, y, s)
          let d = true;
          for (var m in particles) {
            if (particles[m].x == x && particles[m].y == y && particles[m].p == "s") {
              d = false;
            }
          }
          if (d) {
            drect(c, x, y, s, s)
            particles.push(sand)
          }
        }
      }
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

document.addEventListener('contextmenu', event => event.preventDefault());
