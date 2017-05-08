var hero;
var Health;
var level;
var X = 0;
var Y = 0;
var PosX = 100;
var PosY = 100;
var PPosX;
var PPosY;
var Soort;
var tijd;
var kogels = [];
var links = 0;
var Bottom = 0;
var Angle = 0;
var Richting = "links";
var numberH = Math.floor(window.innerHeight / 50);
var numberW = Math.floor(window.innerWidth / 50);
var offsetPlayerW = ((window.innerWidth) - (numberW * 50)) / 2;
var offsetPlayerH = ((window.innerHeight) - (numberH * 50)) / 2;
var MaxEnemy = 500;
var highscores;



var moveB;
var moveE;
var checkH;
var alive;
var power;
var vijanden = [];
var outer;
var inner;
new Vijand(10, 100, 250);
//sounds
var pain = new Audio('pain.mp3');
var fire = new Audio('fire.mp3');
fire.volume = 0.5;
var hurt = new Audio('hurt.mp3');
var background = new Audio('background.mp3');
background.volume = 0.5;
var heal = new Audio('heal.mp3');

function Hero(Health, PosX, PosY) {
	"use strict";
	/*global $ */
	this.Health = Health;
	this.element = $('<div />', {
		class: "cube"
	});
	this.element.css('left', PosX);
	this.element.css('bottom', PosY);
	this.element.css('z-index', 1);
	this.element.appendTo(level);
	this.X = X;
	this.Y = Y;
}

function Kogel(PosX, PosY, Angle, Richting) {
	"use strict";
	/*global $ */
	this.element = $('<div />', {
		class: "kogel"
	});
	this.X = Math.floor(PosX / 50);
	this.Y = Math.floor(PosY / 50);
	this.Richting = Richting;
	this.element.css('left', PosX);
	this.element.css('bottom', PosY);
	this.element.css('transform', 'rotate(' + Angle + 'deg)');
	this.element.css('z-index', 0);
	this.element.appendTo(level);
}

function PowerUp(PPosX, PPosY, Soort, tijd) {
	"use strict;";
	/*global $ */
	this.element = $('<div />', {
		class: "Powerup"
	});
	this.X = Math.floor(PPosX / 50);
	this.Y = Math.floor(PPosY / 50);
	this.element.css('left', Math.floor(PPosX / 50) * 50 + offsetPlayerW);
	this.element.css('bottom', Math.floor(PPosY / 50) * 50 + offsetPlayerH);
	this.Soort = Soort;
	this.tijd = tijd;
	this.element.appendTo(level);
}
//create enemy and append to level
//give health and X and Y position
function Vijand(Health, PosX, PosY) {
	"use strict;";
	this.Health = Health;
	this.element = $('<div />', {
		class: "enemy"
	});
	this.X = Math.floor(PosX / 50);
	this.Y = Math.floor(PosY / 50);
	this.element.css('left', Math.floor(PosX / 50) * 50);
	this.element.css('bottom', Math.floor(PosY / 50) * 50);
	this.element.appendTo(level);
	this.Richting = 'rechts';
}
Vijand.prototype.beweeg = function () {
	"use strict;";
	if (this.Richting === "links") {
		if (this.X > 0) {
			this.links();
		} else {
			this.Richting = "rechts";
			this.rechts();
		}
	}
	if (this.Richting === "rechts") {
		if (this.X < (Math.floor((window.innerWidth - 50) / 50))) {
			this.rechts();
		} else {
			this.Richting = "links";
			this.links();
		}
	}
};
Vijand.prototype.links = function () {
	"use strict;";
	this.element.animate({
		left: "-=2"
	}, 1);
	this.X -= 0.04;
};
Vijand.prototype.rechts = function () {
	"use strict;";
	this.element.animate({
		left: "+=2"
	}, 1);
	this.X += 0.04;
};


function updateHealth() {
	"use strict";
	outer.css('width', window.innerWidth / 2);
	outer.css('background-color', 'black');
	inner.css('width', window.innerWidth / 10 * hero.Health / 100);
}
var heroHealth = document.getElementById("health");
var execute = true;

function checkAlive() {
	"use strict;";
	if (execute = true) {
		if (hero.Health <= 0) {
			document.body.innerHTML = "<br>GAME OVER <br>" + Points + ' punten' + '<br><button class="startknop" onclick="Home();">Restart game</button>';
			pain.volume = 0;
            fire.volume = 0;
            hurt.volume = 0;
            heal.volume = 0;
			gameOver();
			execute = false;
			kongregate.stats.submit('Score', Points);
		}
	}
}


function gameOver() {
	
clearInterval(moveB);
clearInterval(moveE);
clearInterval(checkH);
clearInterval(alive); 
clearInterval(power);
clearInterval(time);
	
	
	
	$('h1').remove();
	$('h3').remove();
	$('#ToonSpelregels').remove();
	$('#ToonControls').remove();


	container.remove();
	outer.remove();
	inner.remove();
	
	
}

function beweeg() {
	"use strict";
	//console.log('loopt door');
	var i;
	for (i = 0; i < vijanden.length; i += 1) {
		vijanden[i].beweeg();
	}
}
var Points = 0;
/*function storePoints() {
	"use strict";
	if (typeof (Storage) !== "undefined") {
		if (localStorage.Points) {
			
			//localStorage.highscores.push(Points += 1);
		} else {
			//localStorage.Points += 1;
		}
		alert(' Punten: ' + localStorage.Points);
	}
}*/
function increasePoints() {
	"use strict";
	Points += 1;
	document.getElementById('points').innerHTML = Points;
	//storePoints();
}
var time;

function createEnemy() {
	////console.log(time)
	"use strict";
	if (vijanden.length <= MaxEnemy) {
		clearTimeout(time);
		PosX = Math.floor(Math.random() * window.innerWidth) + offsetPlayerW;
		PosY = Math.floor(Math.random() * window.innerHeight - 100) + offsetPlayerH;
		if (PosX < window.innerWidth && PosX > (50 + offsetPlayerW) && PosY > offsetPlayerH && PosY < window.innerHeight - 100 && PosX !== hero.X && PosY !== hero.Y) {
			vijanden.push(new Vijand(100, PosX, PosY));
		} else {
			PosX = Math.floor(Math.random() * window.innerWidth) + offsetPlayerW;
			PosY = Math.floor(Math.random() * window.innerHeight - 100) + offsetPlayerH;
			if (PosX < window.innerWidth && PosX > (50 + offsetPlayerW) && PosY > (0 + offsetPlayerH) && PosY < window.innerHeight - 100 && PosX !== hero.X && PosY !== hero.Y) {
				vijanden.push(new Vijand(100, PosX, PosY));
			}
		}
		time = setTimeout(createEnemy, 10000 / ((Points / 10) + 1));
	}
}
var Powerups = [];
var RND;

function createPowerUp() {
	RND = Math.floor(Math.random() * 10);
	if (RND < 2) {
		PPosX = Math.floor(Math.random() * window.innerWidth - 50) + offsetPlayerW;
		PPosY = Math.floor(Math.random() * window.innerHeight) + offsetPlayerH;
		if (PPosX < (window.innerWidth - 50) && PPosX > (0 + offsetPlayerW) && PPosY > (50 + offsetPlayerH) && PPosY < (window.innerHeight - 50)) {
			Powerups.push(new PowerUp(PPosX, PPosY, "health", 10));
		}
	}
}
/*





BEWEEGFUNCTIES






*/
function left() {
	hero.element.rotate(0);
	Richting = 'links';
	if ((hero.X - 1) >= 0) {
		hero.element.animate({
			left: "-=50"
		}, 50);
		hero.X -= 1;
	}
	checkHeroCollide();
}

function up() {
	hero.element.rotate(90);
	Richting = 'omhoog';
	if (hero.Y + 1 < Math.floor(window.innerHeight / 50) - 1) {
		hero.element.animate({
			bottom: "+=50"
		}, 50);
		hero.Y += 1;
	}
	checkHeroCollide();
}

function down() {
	hero.element.rotate(-90);
	Richting = 'omlaag';
	if (hero.Y - 1 >= 0) {
		hero.element.animate({
			bottom: "-=50"
		}, 50);
		hero.Y -= 1;
	}
	checkHeroCollide();
}

function right() {
	hero.element.rotate(180);
	Richting = 'rechts';
	if (hero.X + 1 <= Math.floor(window.innerWidth / 50) - 1) {
		hero.element.animate({
			left: "+=50"
		}, 50);
		hero.X += 1;
	}
	checkHeroCollide();
}
var vurenmogelijk = false;

function attack() {
	
	if (vurenmogelijk) {
		
		fire.currentTime = 0;
		fire.play();
		
		if (Richting === 'rechts') {
			Angle = 90;
		}
		else if (Richting === 'links') {
			Angle = -90;
		}
		else if (Richting === 'omhoog') {
			Angle = 0;
		}
		else if (Richting === 'omlaag') {
			Angle = 180;
		}
		vurenmogelijk = false;
		kogels.push(new Kogel(hero.X * 50 + offsetPlayerW, hero.Y * 50 + offsetPlayerH, Angle, Richting));
		setTimeout(resetvuren, 300);
	}
}

function resetvuren() {
	vurenmogelijk = true;
}
document.onkeyup = function (e) {
	switch (e.keyCode) {
	case 37:
		left();
		break;
	case 38:
		up();
		break;
	case 39:
		right();
		break;
	case 40:
		down();
		break;
	case 32:
		attack();
		break;
	}
};


function checkHeroCollide() {
	"use strict";
	var i;
	for (i = 0; i < vijanden.length; i += 1) {
		
		
		if (vijanden[i].X - 0.7 <= hero.X && hero.X <= vijanden[i].X + 0.7 && vijanden[i].Y === hero.Y) {
			hurt.currentTime = 0;
		hurt.play();
			vijanden[i].element.detach();
			vijanden.splice(i, 1);
			hero.Health -= 100;
			createEnemy();
			////console.log(hero.Health)
		}
	}
	for (i = 0; i < Powerups.length; i += 1) {
		if (Powerups[i].X === hero.X && Powerups[i].Y === hero.Y) {
			heal.play();
			Powerups[i].element.detach();
			Powerups.splice(i, 1);
			if (hero.Health <= 480) {
				hero.Health += 50;
			}
		}
	}
	updateHealth();
}

function checkCollide() {
	"use strict";
	checkHeroCollide();
	var j, i;
	lus: for (i = 0; i < vijanden.length; i += 1) {
		for (j = 0; j < kogels.length; j += 1) {
			var kogelX = kogels[j].X
				, kogelY = kogels[j].Y;
			if (vijanden[i].Health === 0) {
				////console.log(vijanden[i].Health)
				vijanden[i].element.detach();
				vijanden.splice(i, 1);
			}
			if (vijanden[i].X - 0.5 <= kogelX && kogelX <= (vijanden[i].X + 0.5) && vijanden[i].Y - 0.5 <= kogelY && kogelY <= (vijanden[i].Y + 0.5)) {
				////console.log('ja');
				pain.currentTime = 0;
				pain.play();
				
				
				vijanden[i].Health -= 100;
				kogels[j].element.detach();
				kogels.splice(j, 1);
				if (vijanden[i].Health === 0) {
					vijanden[i].element.detach();
					vijanden.splice(i, 1);
					createEnemy();
					increasePoints();
				}
				continue lus;
			}
		}
	}
}

function MoveBullet() {
	"use strict";
	var j;
	checkCollide();
	for (j = 0; j < kogels.length; j += 1) {
		checkCollide();
		if (kogels[j].Richting === 'rechts') {
			kogels[j].element.animate({
				left: "+=25"
			}, 25);
			kogels[j].X += 0.5;
			
		}
		else if (kogels[j].Richting === 'links') {
			kogels[j].element.animate({
				left: "-=25"
			}, 25);
			kogels[j].X -= 0.5;
			
		}
		else if (kogels[j].Richting === 'omhoog') {
			kogels[j].element.animate({
				bottom: "+=25"
			}, 25);
			kogels[j].Y += 0.5;
			
		}
		else if (kogels[j].Richting === 'omlaag') {
			kogels[j].element.animate({
				bottom: "-=25"
			}, 25);
			kogels[j].Y -= 0.5;
			
		}
		if (kogels[j] !== undefined) {
			if (kogels[j].Y >= (window.innerHeight - offsetPlayerH) / 25 || kogels[j].Y <= -10 || kogels[j].X >= window.innerWidth / 25 || kogels[j].X <= -10) {
				
				kogels[j].element.detach();
				kogels.splice(j, 1);
			}
		}
		checkCollide();
	}
}


/* GELEENDE CODE VAN STACKOVERFLOW */




var arrow_keys_handler = function (e) {
	switch (e.keyCode) {
	case 37:
	case 39:
	case 38:
	case 40: // Arrow keys
	case 32:
		e.preventDefault();
		break; // Space
	default:
		break; // do not block other keys
	}
};





window.addEventListener("keydown", arrow_keys_handler, false);


/* STOP GELEENDE CODE */






function Home() {
	window.location = "index.html"
}

function Highscore() {
	window.location = "Highscores.html"
}

function startscreen() {
	"use strict";
	$('#ToonSpelregels').css('width', window.innerWidth / 3);
	$('#ToonControls').css('width', window.innerWidth / 3);
}
var name;
var pressed;
function mute() {
	
	
if(!pressed) {
pain.volume = 0;
fire.volume = 0;
hurt.volume = 0;
background.volume = 0;
heal.volume = 0;
pressed = true;
}else {
	
pain.volume = 1;
fire.volume = 0.5;
hurt.volume = 1;
background.volume = 0.5;
heal.volume = 1;
pressed = false;
	
}
	
	
	
}
function start() {
	"use strict";
	background.play();
	background.loop = true;
	$('h1').remove();
	$('h3').remove();
	$('#ToonSpelregels').remove();
	$('#ToonControls').remove();
	var container = $('#container');
	level = container;
	container.css('height', (numberH * 50) - 50);
	container.css('width', numberW * 50);
	container.css('top', offsetPlayerH + 50 + 'px');
	container.append('<div id="points"></div>');
	
	
	outer = $('<div id="outer"> </div>').appendTo(document.body);
	inner = $('<div id="inner"> </div>').appendTo(outer);
	$('#outer').css('left', offsetPlayerW);
	$('#outer').css('top', offsetPlayerH);
	$('#points').css('right', offsetPlayerW);
	$('#points').css('top', 0);
	document.getElementById('points').innerHTML = Points;
	hero = new Hero(500, offsetPlayerW, offsetPlayerH);
	
	//setInterval(checkCollide, 10);
	moveB = setInterval(MoveBullet, 50);
moveE = setInterval(beweeg, 50);
checkH = setInterval(checkHeroCollide, 20);
alive = setInterval(checkAlive, 50);
power = setInterval(createPowerUp, 4000);
	
	
	//setInterval(createEnemy, 50);
	//autofire
	//setInterval(attack, 100);
	vurenmogelijk = true;
	createEnemy();
	createEnemy();
	updateHealth();
	
	$('.startknop').css('display', 'none');
	hero.health = 500;
	//setInterval(createPowerUp,10);
	numberH = Math.floor(window.innerHeight / 50);
	numberW = Math.floor(window.innerWidth / 50);
	kongregate.stats.submit('Score', Points);
	
}