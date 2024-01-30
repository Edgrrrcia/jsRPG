let xp = 0;
let health = 100;
let gold = 20;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

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
const weapons = [
  { name: 'stick', power: 5 },
  { name: 'dagger', power: 30 },
  { name: 'claw hammer', power: 50 },
  { name: 'sword', power: 100 }
];
const monsters = [
  {
    name: "Slime",
    level: 2,
    health: 15
  },
  {
    name: "Fanged Beast",
    level: 8,
    health: 60
  },
  {
    name: "Dragon",
    level: 20,
    health: 300
  }
]
const stickimg = document.querySelector(".menu-item:nth-child(6)");
const stickimg2 = document.querySelector(".purple");

const daggerimg = document.querySelector(".menu-item:nth-child(7)");
const daggerimg2 = document.querySelector(".orange");

const clawimg = document.querySelector(".menu-item:nth-child(8)");
const clawimg2 = document.querySelector(".lightblue");

const swordimg = document.querySelector(".menu-item:nth-child(3)");
const swordimg2 = document.querySelector(".blue");

const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the town square. You see a sign that says \"Store\". On the side, you see the pathway outside the city walls."
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store."
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters."
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
    text: "You find a secret room and stumble upon a game on the table. You feel a sudden urge to pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
  }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

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

function refreshKnight() {
  knightImg.style.margin = "15em auto";
  knightImg.style.backgroundPosition = "top 0 bottom 0 left 0 right 0";
  knightImg.style.padding = "0";
}

function refreshOther() {
  otherImg.style.margin = "-25em auto";
  otherImg.style.backgroundPosition = "top 0 bottom 0 left 0 right 0";
  otherImg.style.padding = "0";
}

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

function goStore() {
  update(locations[1]);
  refreshKnight()
  refreshOther();
  shopKeeper();

  backgroundImg.style.backgroundImage = "url('https://raw.githubusercontent.com/Edgrrrcia/jsRPG.github.io/main/shop.jpg')";
  knightImg.style.marginLeft = "7.5em";
  knightImg.style.marginTop = "18em";
}

function shopKeeper() {
  otherImg.style.backgroundImage = "url('https://raw.githubusercontent.com/Edgrrrcia/jsRPG.github.io/main/shopekeeper.png')";
  otherImg.style.display = "block";
  otherImg.style.marginRight = "5.5em";
}

function goCave() {
  update(locations[2]);
  refreshKnight()
  refreshOther();
  backgroundImg.style.backgroundImage = "url('https://raw.githubusercontent.com/Edgrrrcia/jsRPG.github.io/main/cave1.png')";
  knightImg.style.marginLeft = "100px";
  knightImg.style.marginTop = "17em";
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}

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
      if (weapons[currentWeapon].name === "dagger") {
        daggerimg.style.visibility = "visible";
        daggerimg2.style.visibility = "visible";
        console.log("dagger")
      }
      if (weapons[currentWeapon].name === "claw hammer") {
        knightImg.style.backgroundImage = "url('https://raw.githubusercontent.com/Edgrrrcia/jsRPG.github.io/main/knight2.png')";
        clawimg.style.visibility = "visible";
        clawimg2.style.visibility = "visible";
        console.log("claw");
      }
      if (weapons[currentWeapon].name === "sword") {
        knightImg.style.backgroundImage = "url('https://raw.githubusercontent.com/Edgrrrcia/jsRPG.github.io/main/knight3.png')";
        swordimg.style.visibility = "visible";
        swordimg2.style.visibility = "visible";
        console.log("sword");
      }
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";

    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}


function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
    if (currentWeapon === "stick") {
      stickimg.style.visibility = "hidden";
      stickimg2.style.visibility = "hidden";
      console.log("sell stick")
    }
    if (currentWeapon === "dagger") {
      daggerimg.style.visibility = "hidden";
      daggerimg2.style.visibility = "hidden";
      console.log("sell dagger")
    }

    if (currentWeapon === "claw hammer") {
      clawimg.style.visibility = "hidden";
      clawimg2.style.visibility = "hidden";
      console.log("sell dagger")
    }

  }
  else {
    text.innerText = "Don't sell your only weapon!";
  }
}

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

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  clearDodge();
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  let val = getMonsterAttackValue(monsters[fighting].level);
  health -= val;
  knightDmg.innerText = "-" + val;
  knightDmg.style.display = "block";
  if (isMonsterHit()) {
    let val = weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    monsterHealth -= val;
    otherDmg.innerText = "-" + val;
    otherDmg.style.display = "block";
  } else {
    miss();
    dodgeMiss.style.marginLeft = "50px";
    text.innerText += " You miss.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    fighting === 2 ? winGame() : defeatMonster();
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    let brokenWeapon = inventory.pop();
    text.innerText += " Your " + brokenWeapon + " breaks.";
    currentWeapon--;
    if (brokenWeapon === "dagger") {
      daggerimg.style.visibility = "hidden";
      daggerimg2.style.visibility = "hidden";
      console.log("broken dagger")
    }
    if (brokenWeapon === "claw hammer") {
      clawimg.style.visibility = "hidden";
      clawimg2.style.visibility = "hidden";
      console.log("broken dagger")
    }
    if (brokenWeapon === "sword") {
      swordimg.style.visibility = "hidden";
      swordimg2.style.visibility = "hidden";
      console.log("broken sword")
    }
  }
}

function clearDmg() {
  knightDmg.style.display = "none";
  otherDmg.style.display = "none";
  knightDmg.style.color = "#F50D37";
  otherDmg.style.color = "#F50D37";
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  clearDmg()
  dodgeMiss.style.marginLeft = "-100px";
  miss();
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

function clearDodge() {
  dodgeMiss.style.display = "none";
}

//Miss mechanic
const dodgeMiss = document.querySelector("#miss");
const dodgeInterval = 0.25;

for(let i = 1; i < dodgeMiss.length; i++){
  dodgeMiss[i].style.animationDelay = i * dodgeInterval + "s";
}

function miss() {
  otherDmg.style.display = "none";
  dodgeMiss.style.display = "block";
}

function defeatMonster() {
  let goldIncome = Math.floor(monsters[fighting].level * 6.7);
  gold += goldIncome;
  let xpIncome = monsters[fighting].level;
  xp += xpIncome;
  goldText.innerText = gold;
  xpText.innerText = xp;
  knightDmg.style.color = "#A2C6F5";
  knightDmg.innerText = "+" + goldIncome + " xp";
  otherDmg.style.color = "#F2D83D";
  otherDmg.innerText = "+" + xpIncome + " gold";
  update(locations[4]);
}

function lose() {
  clearDodge();
  update(locations[5]);
  backgroundImg.style.opacity = 0.7;
}

function winGame() {
  clearDodge();
  update(locations[6]);
  clearDmg();
}

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
}

function easterEgg() {
  update(locations[7]);
  backgroundImg.style.backgroundImage = "url('https://raw.githubusercontent.com/Edgrrrcia/jsRPG.github.io/main/easterEgg.png')";
  clearDmg();
  refreshKnight();
  refreshOther();
  knightImg.style.marginTop = "13em";
  knightImg.style.marginRight = "15em";
  otherImg.style.display = "none";
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

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
    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}
