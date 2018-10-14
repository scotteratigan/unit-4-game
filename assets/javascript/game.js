// Create the mobs now in order to lock in their random names.
var femaleDruid = new Mob("Druid", "female", 30, 2, 5, "female-druid.png");
var femaleMage = new Mob("Mage", "female", 38, 1, 3, "female-mage.png");
var maleWarrior = new Mob("Warrior", "male", 23, 3, 4, "male-warrior.png");
var maleZombie = new Mob("Zombie", "male", 25, 3, 2, "male-zombie.png");
var mobList = [femaleDruid, femaleMage, maleWarrior, maleZombie];
var playerMob, enemyMob;

// Not in use yet.
var bodyLocations = ["head", "neck", "arm", "chest", "leg"];

function Mob(mobType, sex, healthPoints, attackPower, counterAttackPower, imageLocation) { // Constructor function for mobs.
	// Uppercase function name is the convention for constructor functions.
	// Note: all mobs have a random name. This name is selected on page load, so multiple playthroughs aren't confusing
	// The mob.type is specified when the mob is constructed.
	let maleNamesList = ["Sewell the Rat", "Chase the Punk", "Stanwick Shades", "Chevy Angel Eyes", "Grady the Greedy", "Pegleg Vance", "Greedy Felix", "Phantom Harv", "Wilfred the Pillager", "Terrance the Heister", "Miller the Mad", "Cleve Greed", "Dwite Black Eyes", "Blue Eyed Brayden", "Mad Hat Emmerson", "Brute Brayton", "Nightmare Catcher", "Greedy Bray", "Gavin Mad Eye", "Denton the Rogue", "Duncan the Knuckles", "Marden Mad Dog", "Jean the Lucky", "Smirking Studs", "Whispering Reinwald", "Pegleg Sullivan", "Toothless Warren", "Eccentric Scot", "Kevin the Thug", "Speck the Mumbler", "Ossie the Punk", "Waverly the Con", "Grayson the Greedy", "Two Face Bran", "Five Fingered Frankie", "Toothless Riobard", "Numbers Noel"];
	let femaleNamesList = ["Sydnie Blackjack", "Vala the Menace", "Dorothy Three Toes", "Christa the Ravager", "Shirl Black Eyes", "Lunatic Allyson", "Toothless Abagail", "Whispering Jasmyn", "Eyepatch Maegan", "Four Fingered Simone", "Izabella the Eccentric", "Nia Shades", "Anita the Ravager", "Dasia Toothless", "Brittney the Danger", "Diamond Callie", "Brute Lydia", "Wild Cristal", "Spider Mariam", "Amy Crazy Eyes", "Bryanna Coins", "Holly the Phantom", "Madelynn the Bandit", "Aubrey Blue Eyes", "Mad Eyed Loella", "Greedy Jaylynn", "Eyepatch Charlotte", "Dangerous Locke", "Serpent Piper", "Esther Phantom", "Alison the Wild", "Reese the Fang", "Alisa Phantom", "Destini the Cheat", "Dangerous Abbie", "Smirking Colleen", "Sly Kya", "Rusty Bobbie", "Cheating Alicia"]
	// Names courtesy of https://www.fantasynamegenerators.com/bandit-names.php
	this.baseAttackPower = attackPower; // this doubles as the increment quantity.
	this.baseHealthPoints = healthPoints;
	this.counterAttackPower = counterAttackPower;
	this.currentAttackPower = attackPower;
	this.currentHealthPoints = healthPoints;
	this.imageLocation = imageLocation;
	this.mobType = mobType;
	this.isPlayerMob = false;
	this.uniqueId = sex + mobType;
	this.sex = sex;
	switch (sex) {
		case "male":
			this.name = maleNamesList[Math.floor(Math.random() * maleNamesList.length)];
			break;
		case "female":
			this.name = femaleNamesList[Math.floor(Math.random() * femaleNamesList.length)];
			break;
	}
	this.createLargeImageElement = function() {
        return `<img src="assets/images/${this.imageLocation}" alt="${this.sex} ${this.mobType}" style="width: 300px; height: 620px;">`;
    };
    this.createSmallImageElement = function() {
        return `<img src="assets/images/${this.imageLocation}" alt="${this.sex} ${this.mobType}" style="width: 150px; height: 310px;">`;
    };
    this.createPlayerMobElement = function() {
    	// todo: figure out why these aren't centered
    	return `<div id='${this.uniqueId}' class='col-2 select-character text-center'>${this.createSmallImageElement()}</div>`;
    };
    	// todo: figure out why these aren't centered
    this.createEnemySelectionElement = function() {
    	return `<div id='${this.uniqueId}' class='col-2 select-enemy text-center'>${this.createSmallImageElement()}</div>`;
    };
}

function startNewGame() { // Begins a new game.
	//$(this).css("visibility", "hidden"); // z-index didn't work for me, even when I made the position of the element relative. Maybe can't go under body?
	$("#start-game").empty(); // remove the start game button
	$("#character-selection-header").html("<h2>Select your character:</h2>");
	mobList.forEach(function(thisMob) { // Reset attack power and health points at beginning of game.
		thisMob.currentHealthPoints = thisMob.baseHealthPoints;
		thisMob.currentAttackPower = thisMob.baseAttackPower;
		thisMob.isPlayerMob = false;
		thisMob.isEnemyMob = false;
		$("#character-selection").append(thisMob.createPlayerMobElement());
	});
	$(".select-character").click(playerSelectsCharacter); // Can't load this until after the divs are created.
}

function playerSelectsCharacter() {
	$("#character-selection-header").empty();
	$("#character-selection").empty();
	switch (this.id) {
		case "femaleDruid":
			femaleDruid.isPlayerMob = true;
			playerMob = femaleDruid;
			break;
		case "femaleMage":
			femaleMage.isPlayerMob = true;
			playerMob = femaleMage;
			break;
		case "maleWarrior":
			maleWarrior.isPlayerMob = true;
			playerMob = maleWarrior;
			break;
		case "maleZombie":
			maleZombie.isPlayerMob = true;
			playerMob = maleZombie;
			break;
	}
	console.log("You have selected", playerMob.name);
	setupEnemySelection();
}

function setupEnemySelection() {
	console.log("Choose enemy now.");
	$("#enemy-selection-header").html("<h2>Select your opponent:</h2>");
	let enemyMobs = 0;
	mobList.forEach(function(thisMob) { // Reset attack power and health points at beginning of game.
		if (!thisMob.isPlayerMob && thisMob.currentHealthPoints > 0) {
			$("#enemy-selection").append(thisMob.createEnemySelectionElement());
		}
	});
	$(".select-enemy").click(playerSelectsEnemy); // Can't load this until after the divs are created.
}

function playerSelectsEnemy() {
	console.log("You will fight", this.id);
	$("#enemy-selection-header").empty();
	$("#enemy-selection").empty();
	switch (this.id) {
		case "femaleDruid":
			femaleDruid.isEnemyMob = true;
			enemyMob = femaleDruid;
			break;
		case "femaleMage":
			femaleMage.isEnemyMob = true;
			enemyMob = femaleMage;
			break;
		case "maleWarrior":
			maleWarrior.isEnemyMob = true;
			enemyMob = maleWarrior;
			break;
		case "maleZombie":
			maleZombie.isEnemyMob = true;
			enemyMob = maleZombie;
			break;
	}
	$("#fight-button-div").html('<button class="btn-primary" id="player-attacks">ATTACK ENEMY</button>');
	$("#player-area").append(`<h5>You are ${playerMob.name} a ${playerMob.sex} ${playerMob.mobType}.</h5>`);
	$("#player-area").append(playerMob.createSmallImageElement());
	$("#enemy-area").append(`<h5>Your enemy is ${enemyMob.name} a ${enemyMob.sex} ${enemyMob.mobType}.</h5>`);
	$("#enemy-area").append(enemyMob.createSmallImageElement());
	$("#player-attacks").click(playerAttacks);
}

function playerAttacks() {
	//$("#fight-results-area").html("<p>You attack!</p>");
	let attackText = `<p>You attack for ${playerMob.currentAttackPower} damage.</p>`;
	enemyMob.currentHealthPoints -= playerMob.currentAttackPower;
	if (enemyMob.currentHealthPoints < 0) {
		enemyMob.currentHealthPoints = 0;
	}
	$("#enemy-hp").text("HP: " + enemyMob.currentHealthPoints + " / " + enemyMob.baseHealthPoints);
	if (enemyMob.currentHealthPoints > 0) {
		console.log("enemyMob.currentHealthPoints === " + enemyMob.currentHealthPoints);
		attackText += "<p>Your enemy attacks back for " + enemyMob.counterAttackPower + " damage.</p>";
		playerMob.currentHealthPoints -= enemyMob.counterAttackPower;
		if (playerMob.currentHealthPoints < 0) {
			playerMob.currentHealthPoints = 0;
		}
		$("#player-hp").text("HP: " + playerMob.currentHealthPoints + " / " + playerMob.baseHealthPoints);
		$("#fight-results-area").html(attackText);
	}
	else if (playerMob.currentHealthPoints > 0) {
		attackText += "<p>You have slain your enemy.</p>";
		$("#fight-results-area").html(attackText);
		playerDefeatsEnemy();
		return;
	}
	if (playerMob.currentHealthPoints > 0) {
		playerMob.currentAttackPower += playerMob.baseAttackPower;
	}
	else {
		attackText += "<p>Unfortunately, your enemy has also slain you. RIP.</p>";
		$("#fight-results-area").html(attackText);
		gameOver();
		return;
	}
}

function playerDefeatsEnemy() {
	emptyFightArea();
	console.log("You have won!"); // todo: replace with modal here.
	let enemiesRemaining = 0
	mobList.forEach(function(thisMob) {
		if (thisMob.currentHealthPoints > 0 && !thisMob.isPlayerMob)
		enemiesRemaining++;
	});
	if (enemiesRemaining > 0) {
		setupEnemySelection();
	}
	else {
		playerDefeatedAllEnemies();
	}
}

function playerDefeatedAllEnemies() {
	alert("WOW YOU KILLED EVERYBODY");
	showStartButton();
}

function gameOver() {
	emptyFightArea();
	alert("You died. RIP.");
	showStartButton();

}

function emptyFightArea() {
	$("#fight-button-div").empty();
	$("#player-area").empty();
	$("#player-hp").empty();
	$("#enemy-area").empty();
	$("#enemy-hp").empty();
	$("#fight-results-area").empty();
}

function showStartButton() {
	// test
	$("#start-game").html('<button id="start game" class="btn-primary">START GAME</button>');
}

$("#start-game").click(startNewGame);

$(window).ready(function () {
	showStartButton();
});