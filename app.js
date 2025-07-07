// Button to show hidden wish note
const button = document.getElementById('showWish');
const wishNote = document.getElementById('wishNote');

button.addEventListener('click', () => {
  wishNote.classList.add('show');
});

// Simple heart confetti using canvas
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

function createHeart() {
  return {
    x: Math.random() * canvas.width,
    y: -10,
    size: Math.random() * 20 + 10,
    speed: Math.random() * 1 + 0.5,
    drift: (Math.random() - 0.5) * 2,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 2,
  };
}

function drawHeart(x, y, size, rotation) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation * Math.PI / 180);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(0, -size / 2, -size, -size / 2, -size, 0);
  ctx.bezierCurveTo(-size, size, 0, size, 0, size * 1.5);
  ctx.bezierCurveTo(0, size, size, size, size, 0);
  ctx.bezierCurveTo(size, -size / 2, 0, -size / 2, 0, 0);
  ctx.fillStyle = `hsl(${Math.random() * 360}, 70%, 60%)`;
  ctx.fill();
  ctx.restore();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach((heart, index) => {
    heart.y += heart.speed;
    heart.x += heart.drift;
    heart.rotation += heart.rotationSpeed;

    drawHeart(heart.x, heart.y, heart.size, heart.rotation);

    if (heart.y > canvas.height + 50) {
      hearts.splice(index, 1);
    }
  });

  if (Math.random() < 0.1) {
    hearts.push(createHeart());
  }

  requestAnimationFrame(animate);
}

animate();
