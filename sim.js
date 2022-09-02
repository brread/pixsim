let alter = true;

const particles = [];

const tw = 4;
const th = 4;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(120);
}

const sandColor = () =>
  color(
    Math.floor(Math.random() * (255 - 230 + 1) + 230),
    Math.floor(Math.random() * (230 - 200 + 1) + 230),
    Math.floor(Math.random() * (150 - 130 + 1) + 130)
  );

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
  for (let i = 0; i < particles.length; i++)
    if (particles[i].x == x && particles[i].y == y)
      return [true, particles[i].p];
  return [false];
}

function draw() {
  drect(color(37, 150, 190), 0, 0, windowWidth, windowHeight);
  alter = !alter;

  for (let i = 0; i < particles.length; i++) {
    particles[i].draw();

    if (alter) {
      if (particles[i].y > windowHeight) particles.splice(i, 1); //removes the particle from particles if it is out of bounds. without this, particles.length would increase forever and bottle up.
      if (particles[i]?.p == 's') {
        if (!check(particles[i].x, particles[i].y + 4)[0]) {
          particles[i].y += 4;
          if (Math.floor(Math.random() * 2) + 1 == 1) {
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
  }

  if (mouseIsPressed) {
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        let p = 's';
        let c = sandColor();
        let x = Math.floor(mouseX / tw) * tw + i * 4 - 9;
        let y = Math.floor(mouseY / th) * th + j * 4 - 9;
        let s = 4;

        let sand = new Particle(p, c, x, y, s);
        let d = true;
        for (let m = 0; m < particles.length; m++) {
          if (
            particles[m].x == x &&
            particles[m].y == y &&
            particles[m].p == 's'
          ) {
            d = false;
            //if the condition is met, no need to look at the rest of the particles list
            break;
          }
        }
        if (d) {
          drect(c, x, y, s, s);
          particles.push(sand);
        }
      }
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

document.addEventListener('contextmenu', (event) => event.preventDefault());
