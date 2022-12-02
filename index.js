const platformImage = document.getElementById("platform");
const backgroundImage = document.getElementById("background");
const spriteStandRight = document.getElementById("spriteStandRight");
const hillsImage = document.getElementById("hills");
const canva = document.querySelector("canvas");
canva.width = 1084;
canva.height = 730;
const c = canva.getContext("2d");
const gravity = 3.5;
const keys = {
  right: { code: "ArrowRight", isPressed: false },
  left: { code: "ArrowLeft", isPressed: false },
  up: { code: "ArrowUp", isPressed: false },
};
class Player {
  constructor() {
    this.position = {
      x: 30,
      y: 30,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.speed = 10;
    this.width = 66;
    this.height = 150;
    this.frames = 0;
  }

  draw() {
    c.drawImage(
      spriteStandRight,
      177 * this.frames,
      0,
      177,
      400,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.frames++;
    if (this.frames > 28) this.frames = 0;
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.velocity.y += gravity;
    if (this.position.y + this.height + this.velocity.y >= canva.height) init();
    // else this.velocity.y = 0;
  }
}

class Platform {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    };
    this.image = image;
    this.width = this.image.width;
    this.height = this.image.height;
  }

  draw() {
    c.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

class GenericObject {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    };
    this.image = image;
    this.width = this.image.width;
    this.height = this.image.height;
  }

  draw() {
    c.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canva.width, canva.height);
  generics.forEach((generic) => {
    generic.draw();
  });
  platforms.forEach((platform) => {
    platform.draw();
  });

  player.update();

  if (keys.right.isPressed && player.position.x <= 400) {
    player.velocity.x = player.speed;
  }
  if (keys.left.isPressed && player.position.x >= 100) {
    player.velocity.x = -player.speed;
  }
  if (keys.up.isPressed) {
    player.velocity.y = -25;
  }

  if (keys.right.isPressed && player.position.x >= 400) {
    player.velocity.x = 0;
    platforms.forEach((platform) => {
      platform.position.x -= player.speed * 0.66;
    });
    generics.forEach((generic) => {
      generic.position.x -= player.speed * 0.66;
    });
  }
  if (keys.left.isPressed && player.position.x <= 100) {
    player.velocity.x = 0;
    platforms.forEach((platform) => {
      platform.position.x += player.speed * 0.66;
    });
    generics.forEach((generic) => {
      generic.position.x += player.speed * 0.66;
    });
  }

  platforms.forEach((platform) => {
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
    }
  });
}

function init() {
  player.position = {
    x: 30,
    y: 30,
  };
  window.location.reload();
}

const player = new Player();
const platforms = [
  new Platform({
    x: 0,
    y: canva.height - platformImage.height,
    image: platformImage,
  }),
  new Platform({
    x: platformImage.width - 1,
    y: canva.height - platformImage.height,
    image: platformImage,
  }),
  new Platform({
    x: (platformImage.width - 100) * 3 - 100,
    y: canva.height - platformImage.height,
    image: platformImage,
  }),
  new Platform({
    x: (platformImage.width - 100) * 5 - 100,
    y: canva.height - platformImage.height,
    image: platformImage,
  }),
  new Platform({
    x: (platformImage.width - 100) * 7 - 100,
    y: canva.height - platformImage.height,
    image: platformImage,
  }),
  new Platform({
    x: (platformImage.width - 100) * 9 - 100,
    y: canva.height - platformImage.height,
    image: platformImage,
  }),
];
const generics = [
  new GenericObject({
    x: 0,
    y: 0,
    image: backgroundImage,
  }),
  new GenericObject({
    x: 0,
    y: canva.height - hillsImage.height + 10,
    image: hillsImage,
  }),
];
animate();

addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowRight":
      keys.right.isPressed = true;
      break;
    case "ArrowLeft":
      keys.left.isPressed = true;
      break;
    case "ArrowUp":
      keys.up.isPressed = true;
      break;

    default:
      break;
  }
});

addEventListener("keyup", (e) => {
  switch (e.code) {
    case "ArrowRight":
      keys.right.isPressed = false;
      player.velocity.x = 0;
      break;
    case "ArrowLeft":
      keys.left.isPressed = false;
      player.velocity.x = 0;
      break;
    case "ArrowUp":
      keys.up.isPressed = false;

      break;

    default:
      break;
  }
});
