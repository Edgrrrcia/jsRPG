//Starter stats
let xp = 0;
let health = 100;
let gold = 20;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

//Global Declaratios
const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const knightImg = document.querySelector("#knight");
const backgroundImg = document.querySelector("#background");
const otherImg = document.querySelector("#other");
const knightDmg = document.querySelector("#knightDmg");
const otherDmg = document.querySelector("#otherDmg");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const canvas = document.getElementById('fireworks');
const firework = document.querySelector('.firework');
const weapons = [
  { name: 'stick', power: 5 },
  { name: 'dagger', power: 30 },
  { name: 'claw hammer', power: 50 },
  { name: 'sword', power: 100 }
];
const monsters = [
  {
    name: "Noahmorphous Slime",
    level: 2,
    health: 15
  },
  {
    name: "Vincentaur Beast",
    level: 8,
    health: 60
  },
  {
    name: "Dragon",
    level: 20,
    health: 300
  }
]
//Inventory Images
const stickimg = document.querySelector(".menu-item:nth-child(6)");
const stickimg2 = document.querySelector(".purple");
const daggerimg = document.querySelector(".menu-item:nth-child(7)");
const daggerimg2 = document.querySelector(".orange");
const clawimg = document.querySelector(".menu-item:nth-child(8)");
const clawimg2 = document.querySelector(".lightblue");
const swordimg = document.querySelector(".menu-item:nth-child(3)");
const swordimg2 = document.querySelector(".blue");

//Game Locations
const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the town square. You see a sign that says \"Store\". On the side, you see the pathway outside the city walls."
  },
  {
    name: "store",
    "button text": ["Buy Health Potion (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store."
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters minding their own business."
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run back to Town"],
    "button functions": [attack, dodge, goTown],
    text: "You are engaged in battle."
  },
  {
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, easterEgg],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You died. ☠️"
  },
  {
    name: "win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You defeated the dragon! YOU WIN THE GAME! 🎉"
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret room and stumble upon several 10 sided-dice on a table. You see a floating ghost who tells you to pick the number 2 or 8. The ghost says it will randomly roll ten dices and if the number you choose matches one of the random numbers, you will be rewarded!"
  }
];

//Initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

//Update buttons
function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
}

//Sets knight to origin
function refreshKnight() {
  knightImg.style.margin = "15em auto";
  knightImg.style.backgroundPosition = "top 0 bottom 0 left 0 right 0";
  knightImg.style.padding = "0";
  knightImg.style.opacity = "1";
}

//Sets other character to origin
function refreshOther() {
  otherImg.style.margin = "-25em auto";
  otherImg.style.backgroundPosition = "top 0 bottom 0 left 0 right 0";
  otherImg.style.padding = "0";
  otherImg.style.opacity = "1";
}

//Go to town
function goTown() {
  update(locations[0]);
  clearDodge();
  refreshKnight();
  refreshOther();
  clearDmg();
  backgroundImg.style.backgroundImage = "url('https://raw.githubusercontent.com/Edgrrrcia/jsRPG.github.io/main/townSquare.png')";
  otherImg.style.display = "none";
  if (weapons["name"] === "sword") {
    button2.innerText = "You have all the weapons";
  }
}

//Go to store
function goStore() {
  update(locations[1]);
  refreshKnight()
  refreshOther();
  shopKeeper();
  backgroundImg.style.backgroundImage = "url('https://raw.githubusercontent.com/Edgrrrcia/jsRPG.github.io/main/shop.jpg')";
  knightImg.style.marginLeft = "5em";
  knightImg.style.marginTop = "19em";
}

//Unique location for shopkeeper
function shopKeeper() {
  otherImg.style.backgroundImage = "url('https://raw.githubusercontent.com/Edgrrrcia/jsRPG.github.io/main/shopekeeper.png')";
  otherImg.style.display = "block";
  otherImg.style.marginRight = "5.5em";
  otherImg.style.marginTop = "-26.5em";
  //dialoge
  let textArray = [
    'Hey there',
    'Need something?',
    'Some may call this junk',
    'You need iron or steel?',
    'Everything\'s for sale',
    'I used to be a traveler like you',
    'Call me Jacky Ironforge'
  ];
  let randomNumber = Math.floor(Math.random()*textArray.length);

  otherDmg.innerText = textArray[randomNumber];
  otherDmg.style.display = "block";
  otherDmg.style.fontSize = "10px";
  otherDmg.style.lineHeight = "10px";
  otherDmg.style.color = "#FFFFFF";
}

//Go to cave
function goCave() {
  update(locations[2]);
  refreshKnight()
  refreshOther();
  backgroundImg.style.backgroundImage = "url('https://raw.githubusercontent.com/Edgrrrcia/jsRPG.github.io/main/cave1.png')";
  knightImg.style.marginLeft = "100px";
  knightImg.style.marginTop = "17em";
}

//Increase health
function buyHealth() {
  clearDmg();
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
    knightDmg.innerText = "+10 HP";
    knightDmg.style.display = "block";
    knightDmg.style.color = "#F50D37";
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}

//Buy weapon
function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory;
      //shows dagger
      if (weapons[currentWeapon].name === "dagger") {
        knightDmg.innerText = "+David's Dagger";
        knightDmg.style.display = "block";
        knightDmg.style.color = "#A2C6F5";
        knightDmg.style.marginTop = "-2em";
        knightDmg.style.float = "left";
        daggerimg.style.visibility = "visible";
        daggerimg2.style.visibility = "visible";
        console.log("dagger")
      }
      //shows hammer
      if (weapons[currentWeapon].name === "claw hammer") {
        knightImg.style.backgroundImage = "url('https://raw.githubusercontent.com/Edgrrrcia/jsRPG.github.io/main/knight2.png')";
        knightDmg.innerText = "+Arthurian Claw Hammer";
        knightDmg.style.display = "block";
        knightDmg.style.color = "#A2C6F5";
        knightDmg.style.marginTop = "-2em";
        knightDmg.style.float = "left";
        clawimg.style.visibility = "visible";
        clawimg2.style.visibility = "visible";
        console.log("claw");
      }
      //shows sword
      if (weapons[currentWeapon].name === "sword") {
        knightImg.style.backgroundImage = "url('https://raw.githubusercontent.com/Edgrrrcia/jsRPG.github.io/main/knight3.png')";
        knightDmg.innerText = "+Edgar's Sword";
        knightDmg.style.display = "block";
        knightDmg.style.color = "#A2C6F5";
        knightDmg.style.marginTop = "-2em";
        knightDmg.style.float = "left";
        swordimg.style.visibility = "visible";
        swordimg2.style.visibility = "visible";
        console.log("sword");
      }
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";

    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon (15 gold)";
    button2.onclick = sellWeapon;
  }
}

//Sell weapon starting with stick
function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
    //removes stick
    if (currentWeapon === "stick") {
      knightDmg.innerText = "-Stick from Jordan";
      knightDmg.style.display = "block";
      knightDmg.style.color = "#A2C6F5";
      knightDmg.style.marginTop = "-2em";
      knightDmg.style.float = "left";
      stickimg.style.visibility = "hidden";
      stickimg2.style.visibility = "hidden";
      console.log("sell stick")
    }
    //removes dagger
    if (currentWeapon === "dagger") {
      knightDmg.innerText = "-David's Dagger";
      knightDmg.style.display = "block";
      knightDmg.style.color = "#A2C6F5";
      knightDmg.style.marginTop = "-2em";
      knightDmg.style.float = "left";
      daggerimg.style.visibility = "hidden";
      daggerimg2.style.visibility = "hidden";
      console.log("sell dagger")
    }
    //removes hammer
    if (currentWeapon === "claw hammer") {
      knightDmg.innerText = "-Arthurian Claw Hammer";
      knightDmg.style.display = "block";
      knightDmg.style.color = "#A2C6F5";
      knightDmg.style.marginTop = "-2em";
      knightDmg.style.float = "left";
      clawimg.style.visibility = "hidden";
      clawimg2.style.visibility = "hidden";
      console.log("sell claw hammer")
    }
  }
  else {
    text.innerText = "Don't sell your only weapon!";
  }
}

//Starts fight with slime
function fightSlime() {
  fighting = 0;
  goFight();
  refreshKnight();
  refreshOther();
  knightImg.style.marginLeft = "5em";
  knightImg.style.marginTop = "6.3em";
  otherImg.style.backgroundImage = "url('https://raw.githubusercontent.com/Edgrrrcia/jsRPG.github.io/main/slime.png')";
  otherImg.style.display = "block";
  otherImg.style.marginTop = "-24em";
  otherImg.style.marginRight = "5.5em";
}

//Starts fight with beast
function fightBeast() {
  fighting = 1;
  goFight();
  refreshKnight();
  refreshOther();
  backgroundImg.style.backgroundImage = "url('https://raw.githubusercontent.com/Edgrrrcia/jsRPG.github.io/main/cave2.png')";
  knightImg.style.marginTop = "2em";
  knightImg.style.marginLeft = "3em";
  otherImg.style.backgroundImage = "url('https://raw.githubusercontent.com/Edgrrrcia/jsRPG.github.io/main/fangedbeast.png')";
  otherImg.style.display = "block";
  otherImg.style.marginTop = "-31.5em";
  otherImg.style.marginRight = "2.5em";
  otherImg.style.padding = "3em";
}

//Starts fight with dragon
function fightDragon() {
  fighting = 2;
  goFight();
  clearDodge();
  refreshKnight();
  refreshOther();
  backgroundImg.style.backgroundImage = "url('https://raw.githubusercontent.com/Edgrrrcia/jsRPG.github.io/main/cave3.png')";
  knightImg.style.marginTop = "7em";
  knightImg.style.marginLeft = "2em";
  otherImg.style.backgroundImage = "url('https://raw.githubusercontent.com/Edgrrrcia/jsRPG.github.io/main/dragon.png')"
  otherImg.style.display = "block";
  otherImg.style.padding = "5em";
  otherImg.style.marginTop =  "-35em";
  otherImg.style.marginLeft = "9em";
}

//Updates location
function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

//Fight mechanic
function attack() {
  clearDmg();
  clearDodge();
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  let val = getMonsterAttackValue(monsters[fighting].level);
  health -= val;
  knightDmg.innerText = "-" + val;
  knightDmg.style.display = "block";
  //checks if there is a enemy hit
  if (isMonsterHit()) {
    let val = weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    monsterHealth -= val;
    otherDmg.innerText = "-" + val;
    otherDmg.style.display = "block";
  } else {
    miss();
    text.innerText += " You miss.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    fighting === 2 ? winGame() : defeatMonster();
  }
  //broken weapon mechanic
  if (Math.random() <= .1 && inventory.length !== 1) {
    let brokenWeapon = inventory.pop();
    text.innerText += " Your " + brokenWeapon + " breaks.";
    currentWeapon--;
    //broken dagger
    if (brokenWeapon === "dagger") {
      daggerimg.style.visibility = "hidden";
      daggerimg2.style.visibility = "hidden";
      console.log("broken dagger")
    }
    //broken hammer
    if (brokenWeapon === "claw hammer") {
      clawimg.style.visibility = "hidden";
      clawimg2.style.visibility = "hidden";
      console.log("broken dagger")
    }
    //borken sword
    if (brokenWeapon === "sword") {
      swordimg.style.visibility = "hidden";
      swordimg2.style.visibility = "hidden";
      console.log("broken sword")
    }
  }
}

//resets characters
function clearDmg() {
  knightDmg.style.marginTop = "2em";
  knightDmg.style.float = "none";
  knightDmg.style.display = "none";
  otherDmg.style.display = "none";
  knightDmg.style.color = "#F50D37";
  otherDmg.style.color = "#F50D37";
  otherDmg.style.marginLeft = "5em";
  otherDmg.style.fontSize = "18px";
}

//Calculates enemy damage
function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

//Calculates chance of enemy hit
function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

//Dodge function
function dodge() {
  clearDmg()
  dodgeMiss.style.marginLeft = "5em";
  miss();
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

//Reset dodge
function clearDodge() {
  dodgeMiss.style.display = "none";
  dodgeMiss.style.marginLeft = "10em";
  dodgeMiss.style.marginTop = "8em";
}

//Miss mechanic
const dodgeMiss = document.querySelector("#miss");
const dodgeInterval = 0.25;
for(let i = 1; i < dodgeMiss.length; i++){
  dodgeMiss[i].style.animationDelay = i * dodgeInterval + "s";
}

//display miss text
function miss() {
  otherDmg.style.display = "none";
  dodgeMiss.style.display = "block";
}

// Function to fade image of enemy
function fadeOther() {
  otherImg.style.opacity = 0;
  setInterval(fadeBackground, 3000);
}

// Function to fade image of enemy
function fadeKnight() {
  knightImg.style.opacity = 0;
  setInterval(fadeBackground, 7000);
}

//Defeated enemy
function defeatMonster() {
  let goldIncome = Math.floor(monsters[fighting].level * 6.7);
  gold += goldIncome;
  let xpIncome = monsters[fighting].level;
  xp += xpIncome;
  //shows text
  goldText.innerText = gold;
  xpText.innerText = xp;
  knightDmg.style.color = "#F2D83D";
  knightDmg.innerText = "+" + goldIncome + " gold";
  otherDmg.style.color = "#A2C6F5";
  otherDmg.innerText = "+" + xpIncome + " xp";
  update(locations[4]);
}

//Darken screen
function lose() {
  clearDodge();
  update(locations[5]);
  backgroundImg.style.opacity = 0.7;
  fadeKnight();
}

//You won!
function winGame() {
  clearDodge();
  update(locations[6]);
  clearDmg();
  endGame();
  fadeOther();
}

//Restart mechanic to everything back to the beginning
function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  backgroundImg.style.opacity = 1;
  refreshOther();
  clearDmg();
  goTown();
  knightImg.style.backgroundImage = "url('https://raw.githubusercontent.com/Edgrrrcia/jsRPG.github.io/main/knight1.png')";
    daggerimg.style.visibility = "hidden";
    daggerimg2.style.visibility = "hidden";
    clawimg.style.visibility = "hidden";
    clawimg2.style.visibility = "hidden";
    swordimg.style.visibility = "hidden";
    swordimg2.style.visibility = "hidden";
    stickimg.style.visibility = "visible";
    stickimg2.style.visibility = "visible";
  endGame(false);
  firework.style.display = "none";
}

//Hidden room
function easterEgg() {
  update(locations[7]);
  backgroundImg.style.backgroundImage = "url('https://raw.githubusercontent.com/Edgrrrcia/jsRPG.github.io/main/easterEgg.png')";
  clearDmg();
  refreshKnight();
  refreshOther();
  knightImg.style.marginTop = "13em";
  knightImg.style.marginRight = "15em";
  otherImg.style.backgroundImage = "url('https://raw.githubusercontent.com/Edgrrrcia/jsRPG.github.io/main/ghost.png')";
  otherImg.style.marginRight = "1em";
  otherImg.style.marginTop = "-27em";
  otherImg.style.display = "block";
  otherDmg.style.fontSize = "10px";
  otherDmg.style.lineHeight = "10px";
  otherDmg.style.color = "#FFFFFF";

  let textArray = [
    'Want to play?',
    'Choose wisely',
    'If you die, you take my place',
    'Feeling lucky?',
    'They used to call me Sir Jaivard the Valiant',
    'What day is it?'
  ];
  let randomNumber = Math.floor(Math.random()*textArray.length);

  otherDmg.innerText = textArray[randomNumber];
  otherDmg.style.display = "block";
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

//easter egg game
function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Right! You win 20 gold! Want to risk it again?";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! You lose 10 health! Want to risk it again?";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}

//Canvas fireworks
function endGame(){
const ctx = canvas.getContext('2d');
firework.style.display = "block";
canvas.width = window.innerWidth * window.devicePixelRatio;
canvas.height = window.innerHeight * window.devicePixelRatio;
canvas.style.width = `${window.innerWidth}px`;
canvas.style.height = `${window.innerHeight}px`;

ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

const colors = [
  {r: 255, g: 0, b: 0},
  {r: 0, g: 0, b: 255},
  {r: 255, g: 255, b: 255},
  {r: 138,g: 43,b: 226 },
  {r:210,g: 105,b: 30},
  {r:100,g: 149,b: 237},
];

class Firework {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.counter = 0;
        this.sparks = [];
        this.trail = [];
    }
    draw() {
        this.counter++;

        // Draw the rocket
        if (this.counter < 80) {
            ctx.beginPath();
            ctx.arc(this.x, canvas.height/window.devicePixelRatio - this.counter * 2, 0, 0, 2);
            ctx.fillStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`;
            ctx.fill();

            this.trail.push({x: this.x, y: canvas.height/window.devicePixelRatio - this.counter * 5});

            // Draw the trail
            ctx.beginPath();
            ctx.moveTo(this.trail[0].x, this.trail[0].y);
            for (let i = 1; i < this.trail.length; i++) {
                ctx.lineTo(this.trail[i].x, this.trail[i].y);
                ctx.strokeStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`;
                ctx.lineWidth = 2.5;
                ctx.stroke();
            }

            // Remove older parts of the trail
            if (this.trail.length > 8) {
                this.trail.shift();
            }
        }

        // Explode the firework
        else if (this.sparks.length === 0) {
            for (let i = 0; i < 70; i++) { // increase the number of sparks
                this.sparks.push(new Spark(this.x, canvas.height/window.devicePixelRatio - this.counter * 5, this.color));
            }
        }

        // Draw the explosion
        else {
            for (let i = 0; i < this.sparks.length; i++) {
                let spark = this.sparks[i];
                spark.draw();
                spark.update();
                if (spark.opacity <= 0) {
                    this.sparks.splice(i, 1);
                    i--;
                }
            }
        }
    }
}


class Spark {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.speed = Math.random() * 5 + 1;
        this.angle = Math.random() * Math.PI * 2;
        this.color = color;
        this.opacity = 1;
        this.lightRadius = 1;
        this.lightOpacity = 1;
    }

    draw() {
        // Draw the light effect
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.lightRadius, 0.03, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
        ctx.fill();
        this.lightRadius += 0.09;
        this.lightOpacity *= 2;

        // Update the opacity for flickering effect
        this.opacity = this.opacity <= 0.8 ? Math.random() * 0.8 : this.opacity - 0.5;

        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
        ctx.fillRect(this.x, this.y, 0.2, 0.2);
    }

    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.opacity -= 0.008;
    }
}

let fireworks = [];

function animate() {
    ctx.clearRect(0, 0, canvas.width/window.devicePixelRatio, canvas.height/window.devicePixelRatio);

    for (let i = 0; i < fireworks.length; i++) {
        fireworks[i].draw();
    }

    requestAnimationFrame(animate);


    //Add text in the middle of screen
    let fontSize = 30;
    ctx.font = `30px Pixelify Sans`;
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("You Won!", canvas.width/2/window.devicePixelRatio, canvas.height/2/window.devicePixelRatio);
}


animate();

setInterval(function () {
    let x = Math.random() * canvas.width/window.devicePixelRatio;
    let color = colors[Math.floor(Math.random() * colors.length)];
    fireworks.push(new Firework(x, canvas.height/window.devicePixelRatio, color));
}, 1000);
}
