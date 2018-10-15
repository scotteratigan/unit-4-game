// Create the mobs now in order to lock in their random names.
var femaleDruid = new Mob("Druid", "female", 30, 2, 5, "crescent blade", "female-druid.png"); // fight fourth
var femaleMage = new Mob("Mage", "female", 38, 2, 3, "fire magic", "female-mage.png"); // fight second
var maleWarrior = new Mob("Warrior", "male", 21, 3, 4, "double-bladed sword", "male-warrior.png"); // fight third
var maleZombie = new Mob("Zombie", "male", 25, 3, 2, "wretched fingers", "male-zombie.png"); // fight first
var mobList = [femaleDruid, femaleMage, maleWarrior, maleZombie];
var playerMob, enemyMob;

function Mob(mobType, sex, healthPoints, attackPower, counterAttackPower, weapon, imageLocation) { // Constructor function for mobs.
	// Note: all mobs have a random name. This name is selected on page load, so multiple playthroughs aren't confusing. The random name selection depends on the sex of the mob entity.
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
	this.weapon = weapon;
	this.uniqueId = sex + mobType;
	this.sex = sex;
	switch (sex) {
		case "male":
			this.name = maleNamesList[Math.floor(Math.random() * maleNamesList.length)];
			this.posessivePronoun = "his";
			break;
		case "female":
			this.name = femaleNamesList[Math.floor(Math.random() * femaleNamesList.length)];
			this.posessivePronoun = "her";
			break;
	}
	this.createLargeImageElement = function() {
        return `<img src="assets/images/${this.imageLocation}" alt="${this.sex} ${this.mobType}" style="width: 300px; height: 620px;">`;
    };
    this.createSmallImageElement = function() {
        return `<img src="assets/images/${this.imageLocation}" alt="${this.sex} ${this.mobType}" style="width: 150px; height: 310px;">`;
    };
    this.createPlayerMobElement = function() {
    	return `<div id='${this.uniqueId}' class='col-2 select-character text-center'>${this.createSmallImageElement()}</div>`;
    };
    this.createEnemySelectionElement = function() {
    	return `<div id='${this.uniqueId}' class='col-2 select-enemy text-center'>${this.createSmallImageElement()}</div>`;
    };
}

function startNewGame() { // Begins a new game.
	$("#start-game").empty(); // Remove the start game button.
	$("#graveyard").html("<h3>Graveyard</h3>");
	$("#graveyard").css("visibility", "hidden");
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
	setupEnemySelection();
}

function setupEnemySelection() {
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
	displayHitPoints();
	$("#player-attacks").click(playerAttacks);
}

function getRandomBodyLocation() {
	let bodyLocations = ["head", "neck", "arm", "chest", "leg"];
	return bodyLocations[Math.floor(Math.random() * bodyLocations.length)];
}

function getDamageDescription(damageAmount) {
	let damageText = ["a harmless", "an insignificant", "a negligible", "a light", "a good", "a harmful", "a very harmful", "a damaging", "a very damaging", "a severe", "a very severe", "a massive", "a devastating", "a very devastating", "an apocalyptic"];
	if (damageAmount > damageText.length) {
		return damageText[damageText.length - 1];
	}
	else {
		return damageText[damageAmount];
	}
}

function playerAttacks() {
	let attackText = `<p>You attack ${enemyMob.name} with your ${playerMob.weapon}, landing ${getDamageDescription(playerMob.currentAttackPower)} hit to ${enemyMob.posessivePronoun} ${getRandomBodyLocation()} for ${playerMob.currentAttackPower} damage.</p>`;
	enemyMob.currentHealthPoints -= playerMob.currentAttackPower;
	if (enemyMob.currentHealthPoints < 0) {
		enemyMob.currentHealthPoints = 0;
	}
	displayHitPoints();
	if (enemyMob.currentHealthPoints > 0) {
		attackText += `<p>${enemyMob.name} attacks back with ${enemyMob.posessivePronoun} ${enemyMob.weapon}, landing landing ${getDamageDescription(enemyMob.currentAttackPower)}  hit to your ${getRandomBodyLocation()} for ${enemyMob.counterAttackPower} damage.</p>`;
		playerMob.currentHealthPoints -= enemyMob.counterAttackPower;
		if (playerMob.currentHealthPoints < 0) {
			playerMob.currentHealthPoints = 0;
		}
		displayHitPoints();
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
		gameLost();
		return;
	}
}

function displayHitPoints() {
	$("#enemy-hp").text("HP: " + enemyMob.currentHealthPoints + " / " + enemyMob.baseHealthPoints);
	$("#player-hp").text("HP: " + playerMob.currentHealthPoints + " / " + playerMob.baseHealthPoints);
}

function playerDefeatsEnemy() {
	emptyFightArea();
	$("#alert-modal-title").text("Victory.");
	$("#alert-modal-text").text(`You have defeated ${enemyMob.name}.`);
	$("#alert-button").click();
	$("#graveyard").css("visibility", "visible");
	$("#graveyard").append(enemyMob.createSmallImageElement());
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
	$("#alert-modal-title").text("You are the champion!");
	$("#alert-modal-text").html(`<p>${playerMob.name} the ${playerMob.mobType} has successfully defeated all challengers, and stands victorious. Legends of this victory will be passed on for generations to come!</p>`);
	$("#alert-modal-text").append(playerMob.createLargeImageElement());
	$("#alert-button").click();
	showStartButton();
}

function gameLost() {
	emptyFightArea();
	$("#alert-modal-title").text("You were defeated.");
	$("#alert-modal-text").html(`<p>${playerMob.name} was struck down by ${enemyMob.name} the ${enemyMob.mobType}, and your battles will soon be forgotten. ${enemyMob.name} gloats over your lifeless corpse.<p>`);
	$("#alert-modal-text").append(enemyMob.createLargeImageElement());
	$("#alert-button").click();
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
	$("#start-game").html('<button id="start game" class="btn-primary">START GAME</button>');
}

$("#start-game").click(startNewGame);

$(window).ready(function () {
	showStartButton();
});