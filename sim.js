let alter = true;

let particles = []

let BRUSH_SIZE = 6;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  frameRate(120);
}

var a = ['rgb(244,220,148)', 'rgb(236,211,140)', 'rgb(252,228,156)', 'rgb(252,220,149)', 'rgb(244,212,148)', 'rgb(228,204,132)', 'rgb(240,220,156)']

function sandColor() {
  return color(a[Math.floor(Math.random() * a.length)]);
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
  let i = 4 * (x + y * width);
  let [r, g, b] = [pixels[i], pixels[i + 1], pixels[i + 2]];
  return color(r, g, b)
}

function draw() {

  console.log(frameRate());

  drect(color(37, 150, 190), 0, 0, windowWidth, windowHeight)

  for (let i = 0; i < particles.length; i++) {
    particles[i].draw()
  }

  alter = !(alter)
  if (!alter) {
    loadPixels();


    for (let i = 0; i < particles.length; i++) {
      if (particles[i].p == 's') {
        let down = false
        if (check(particles[i].x, particles[i].y + 4).levels[0] == '37') {
          particles[i].y += 4;
          down = true;
        }
        if (!down) {
          let r = Math.floor(Math.random() * 2);
          if (r == 0) {
            if (check(particles[i].x - 4, particles[i].y + 4).levels[0] == '37') {
              particles[i].y += 4;
              particles[i].x -= 4;
            } else {
              if (check(particles[i].x + 4, particles[i].y + 4).levels[0] == '37') {
                particles[i].y += 4;
                particles[i].x += 4;
              }
            }
          }
        }
      }
    }

    if (mouseIsPressed) {
      if (BRUSH_SIZE == 1) {
        let p = 's'
        let c = sandColor()
        let x = (Math.floor(mouseX / 4)) * 4;
        let y = (Math.floor(mouseY / 4)) * 4;
        let s = 4;

        let sand = new Particle(p, c, x, y, s)
        let d = true;
        for (let m = 0; m < particles.length; m++) {
          if (particles[m].x == x && particles[m].y == y && particles[m].p == "s") {
            d = false;
          }
        }
        if (d) {
          drect(c, x, y, s, s)
          particles.push(sand)
        }
      } else {
        for (let i = 0; i < BRUSH_SIZE; i++) {
          for (let j = 0; j < BRUSH_SIZE; j++) {
            let p = 's'
            let c = sandColor()
            let x = Math.floor(((Math.floor(mouseX / 4)) * 4 + (i * 4) - (BRUSH_SIZE * 1.5)) / 4) * 4;
            let y = Math.floor(((Math.floor(mouseY / 4)) * 4 + (j * 4) - (BRUSH_SIZE * 1.5)) / 4) * 4;
            let s = 4;

            let sand = new Particle(p, c, x, y, s)
            let d = true;
            for (let m = 0; m < particles.length; m++) {
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
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

document.addEventListener('contextmenu', event => event.preventDefault());

var lastScrollTop = window.pageYOffset;

document.addEventListener('keydown', (key) => {
  if (key.key == '=') {
    if (BRUSH_SIZE == 1) {
      BRUSH_SIZE = 2;
    } else if (BRUSH_SIZE < 14) {
      BRUSH_SIZE += 2;
    }
  } else if (key.key == '-') {
    if (BRUSH_SIZE == 2) {
      BRUSH_SIZE = 1;
    } else if (BRUSH_SIZE > 2) {
      BRUSH_SIZE -= 2;
    }
  }
});
