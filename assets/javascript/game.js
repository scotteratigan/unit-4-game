// Create the mobs now in order to lock in their random names.
var femaleDruid = new Mob("druid", "female", 30, 2, 5, "female-druid.png");
var femaleMage = new Mob("mage", "female", 38, 1, 3, "female-mage.png");
var maleWarrior = new Mob("warrior", "male", 23, 3, 4, "male-warrior.png");
var maleZombie = new Mob("zombie", "male", 25, 3, 2, "male-zombie.png");
var mobList = [femaleDruid, femaleMage, maleWarrior, maleZombie];

function Mob(mobType, sex, healthPoints, attackPower, counterAttackPower, imageLocation) { // Constructor function for mobs.
	// Uppercase function name is the convention for constructor functions.
	// Note: all mobs have a random name. This name is selected on page load, so multiple playthroughs aren't confusing
	// The mob.type is specified when the mob is constructed.
	let maleNamesList = ["Sewell the Rat", "Chase the Punk", "Stanwick Shades", "Chevy Angel Eyes", "Grady the Greedy", "Pegleg Vance", "Greedy Felix", "Phantom Harv", "Wilfred the Pillager", "Terrance the Heister", "Miller the Mad", "Cleve Greed", "Dwite Black Eyes", "Blue Eyed Brayden", "Mad Hat Emmerson", "Brute Brayton", "Nightmare Catcher", "Greedy Bray", "Gavin Mad Eye", "Denton the Rogue", "Duncan the Knuckles", "Marden Mad Dog", "Jean the Lucky", "Smirking Studs", "Whispering Reinwald", "Pegleg Sullivan", "Toothless Warren", "Eccentric Scot", "Kevin the Thug", "Speck the Mumbler", "Ossie the Punk", "Waverly the Con", "Grayson the Greedy", "Two Face Bran", "Five Fingered Frankie", "Toothless Riobard", "Numbers Noel"];
	let femaleNamesList = ["Sydnie Blackjack", "Vala the Menace", "Dorothy Three Toes", "Christa the Ravager", "Shirl Black Eyes", "Lunatic Allyson", "Toothless Abagail", "Whispering Jasmyn", "Eyepatch Maegan", "Four Fingered Simone", "Izabella the Eccentric", "Nia Shades", "Anita the Ravager", "Dasia Toothless", "Brittney the Danger", "Diamond Callie", "Brute Lydia", "Wild Cristal", "Spider Mariam", "Amy Crazy Eyes", "Bryanna Coins", "Holly the Phantom", "Madelynn the Bandit", "Aubrey Blue Eyes", "Mad Eyed Loella", "Greedy Jaylynn", "Eyepatch Charlotte", "Dangerous Locke", "Serpent Piper", "Esther Phantom", "Alison the Wild", "Reese the Fang", "Alisa Phantom", "Destini the Cheat", "Dangerous Abbie", "Smirking Colleen", "Sly Kya", "Rusty Bobbie", "Cheating Alicia"]
	// Names courtesy of https://www.fantasynamegenerators.com/bandit-names.php
	this.baseAttackPower = attackPower; // this will also be the increment quantity.
	this.baseHealthPoints = healthPoints;
	this.counterAttackPower = counterAttackPower;
	this.currentAttackPower = attackPower;
	this.currentHealthPoints = healthPoints;
	this.imageLocation = imageLocation;
	this.mobType = mobType;
	this.sex = sex;
	switch (sex) {
		case "male":
			this.name = maleNamesList[Math.floor(Math.random() * maleNamesList.length)];
			break;
		case "female":
			this.name = femaleNamesList[Math.floor(Math.random() * femaleNamesList.length)];
			break;
	}
	this.showPictureLarge = function () {
        return "<img src='assets/images/" + this.imageLocation + "' alt='" + this.sex + " " + this.mobType + "'>";
    };
}

function startNewGame() { // Begins a new game.
	//$(this).css("visibility", "hidden"); // z-index didn't work for me, even when I made the position relative.
	mobList.forEach(function(thisMob) { // Reset attack power and health points at beginning of game.
		thisMob.currentHealthPoints = thisMob.baseHealthPoints;
		thisMob.currentAttackPower = thisMob.baseAttackPower;
	});
	$("#initial-character-selection").append(femaleDruid.showPictureLarge());
	$("#initial-character-selection").append(femaleMage.showPictureLarge());
	$("#initial-character-selection").append(maleWarrior.showPictureLarge());
	$("#initial-character-selection").append(maleZombie.showPictureLarge());

}

$("#start-game").click(startNewGame);



