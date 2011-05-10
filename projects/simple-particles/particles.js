var container;
var particles;

function createParticle(span) {
  return {
  	elm: span ? span : createParticleElement(),
    x: Math.random() * -30.0,
    y: Math.random() * -30.0,
    dx: Math.random() + 1.5,
    dy: Math.random() + 1.5,
    ttl: Math.floor(Math.random()*300) + 30 // time to live in frames
  }
}

function createParticleElement() {
  var elm = document.createElement('span');
	/*
  elm.style.border = '1px solid white';
  elm.style.position = 'absolute';
  elm.style.width = elm.style.height = '3px';
	*/
  container.appendChild(elm);
  return elm;	
}

function update() {
  for (var i=0; i < particles.length; i++) {
    particles[i].ttl = particles[i].ttl - 1;
    if (particles[i].ttl > 0) {
      particles[i].x = particles[i].x + particles[i].dx;
      particles[i].y = particles[i].y + particles[i].dy;
      particles[i].elm.style.left = Math.floor(particles[i].x) + 'px';
      particles[i].elm.style.top = Math.floor(particles[i].y) + 'px';
    } else {
      particles[i] = createParticle(particles[i].elm);
    }
  }
}

window.onload = function() {
	container = document.getElementById('container');
	particles = [];
	for (var i=0; i < 600; i++) {
	  particles.push(createParticle());
	}

	setInterval("update()", 25);
}