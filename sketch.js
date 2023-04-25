
function setup() {
  createCanvas(1440,800);   
  componets();
}
function draw() {
  circuloD( 220,450, 120);
  circuloD( 700,450, 120);
  circuloD( 1170,450, 120);
}

function componets(){
  input = createInput('');
  input.size(250,30);
  input.position( width / 2.5, (height / 2) - 250);

  buttonS = createButton('Sumbit');
  buttonS.position(850,150);
  buttonS.size (100,40);
  buttonS.style('font-size', '15px');
  buttonS.style('border', 'none');
  buttonS.style('border-radius', '5px');
  buttonS.mousePressed(action);
}

function action(){
  const diametro = input.value();
  if(diametro > 1){
    circuloD( 220,450, 120);
    circuloD( 350*2,450, 120);
    circuloD( 390*3,450, 120);
    division(220,450, 120,diametro,'point');
    division(350*2,450, 120,diametro,'dda');
    division(390*3,450, 120,diametro,'bhm');
  }else{
    console.log('error')
  }
}

function circuloD(x, y, r) {
  let x1 = 0;
  let y1 = r;
  let d = 1 - r;
  while (x1 <= y1) {
    point(x + x1, y + y1);
    point(x - x1, y + y1);
    point(x + x1, y - y1);
    point(x - x1, y - y1);
    point(x + y1, y + x1);
    point(x - y1, y + x1);
    point(x + y1, y - x1);
    point(x - y1, y - x1);
    if (d < 0) {
      d = d + 2 * x1 + 3;
    } else {
      d = d + 2 * (x1 - y1) + 5;
      y1--;
    }
    x1++;
  }
}
function division(x, y, r, d, type) {
  for (let i = 0; i < d; i++) {

    const angulo = TWO_PI * i / d;
    const x2 = x + r * cos(angulo);
    const y2 = y + r * sin(angulo);
    if (type == 'point')
      algoritmoPP(x, y, x2, y2);
    if (type == 'dda')
      algoritmoDDA(x, y, x2, y2);
    if (type == 'bhm')
      algoritmoBHM(x, y, round(x2), round(y2));
  }
}
function algoritmoPP(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const m = (dy !== 0) ? dy / dx : 0;
  const b = y1 - m * x1;

  const xMin = min(x1, x2);
  const xMax = max(x1, x2);
  if (abs(m) == Infinity) {
      if (y2 > y1) {
          for (let y = y1; y <= y2; y++) {
              point(x1, y)
          }
      } else if (y1 > y2) {
          for (let y = y2; y <= y1; y++) {
              point(x1, y)
          }
      }
  } else {
      for (let x = xMin; x <= xMax; x++) {
          const y = m * x + b;
          point(x, y);
      }
  }
}
function algoritmoDDA(x1, y1, x2, y2) {
  const dx = x2 - x1
  const dy = y2 - y1

  let pasos = Math.max(Math.abs(dx), Math.abs(dy))

  const xInc = dx / pasos
  const yInc = dy / pasos

  for (let i = 0; i <= pasos; i++) {
    point(x1, y1)
    x1 += xInc
    y1 += yInc
  }
}
function algoritmoBHM(x0, y0, x1, y1) {
  let dx = abs(x1 - x0);
  let dy = abs(y1 - y0);
  let sx = x0 < x1 ? 1 : -1;
  let sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;
  while (x0 !== x1 || y0 !== y1) {
    point(x0, y0);
    let e2 = err * 2;
    if (e2 > -dy) {
      err -= dy;
      x0 += sx;
    }
    if (e2 < dx) {
      err += dx;
      y0 += sy;
    }
  }
}
