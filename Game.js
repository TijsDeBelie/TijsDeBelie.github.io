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
var gameovr = true;
var Points = 0;
var direction;
var totalSeconds = 0;
var timerVar;
var hour;
var minute;
var seconds;
var container;
var Powerups = [];
var RND;
var time;

var heroHealth = document.getElementById("health");
var execute = true;

/*global Audio, gameOver, kongregate, Points, storeData, G_points:true, time:true, checkHeroCollide, resetvuren, createDatabase, G_naam:true, gameovr, G_tijd:true, alert*/

//sounds 

var pain = new Audio('sounds/pain.mp3');
var fire = new Audio('sounds/fire.mp3');
fire.volume = 0.5;
var hurt = new Audio('sounds/hurt.mp3');
var background = new Audio('sounds/background.mp3');
background.volume = 0.5;
var heal = new Audio('sounds/heal.mp3');





/**********************************************************





CONSTUCTORS VOOR ALLE ELEMENTEN DIE MOETEN KUNENN SPAWNEN




**************************************************************/



/* JE MANNETJE DAT JE KUNT BEWEGEN MET PIJLTJES OF SLEPEN MET DE MUIS/VINGER */
function Hero(Health, PosX, PosY) {
	"use strict";
	/*global $ */
	this.Health = Health;
	this.element = $('<div />', {
		"class": "cube"
	});
	this.element.css('left', PosX);
	this.element.css('bottom', PosY);
	this.element.css('z-index', 1);
	this.element.appendTo(level);
	this.X = X;
	this.Y = Y;
}

/* KOGEL DIE WORDT AFGEVUURD IN DE RICHTING WAAR JE KIJKT EN OP DE POSITIE DAT JE STAAT, ACTIEKNOP: SPATIE*/

function Kogel(PosX, PosY, Angle, Richting) {
	"use strict";
	/*global $ */
	this.element = $('<div />', {
		"class": "kogel"
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


/* POWERUPS, MOGELIJKHEID TOT UITBRIJDING NAAR MEERDERE SOORTEN */
function PowerUp(PPosX, PPosY, Soort, tijd) {
	"use strict";
	/*global $ */
	this.element = $('<div />', {
		"class": "Powerup"
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

function Vijand(Health, PosX, PosY, direction) {
	"use strict";
	this.Health = Health;
	this.element = $('<div />', {
		"class": "enemy"
	});
	this.X = Math.floor(PosX / 50);
	this.Y = Math.floor(PosY / 50);
	this.element.css('left', Math.floor(PosX / 50) * 50);
	this.element.css('bottom', Math.floor(PosY / 50) * 50);
	this.element.appendTo(level);
	this.Richting = direction;
}

/* LAAT DE VIJAND BEWEGEN, NAAR LINKS ALS DE RAND RECHTS VAN DE VIJAND IS EN VICE VERSA */


Vijand.prototype.beweeg = function () {
	"use strict";
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
	"use strict";
	this.element.animate({
		left: "-=2"
	}, 1);
	this.X -= 0.04;
};
Vijand.prototype.rechts = function () {
	"use strict";
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


/*CHeck health van hero, als deze nul is wordt gameover aangeroepen*/

function checkAlive() {
	"use strict";
	if (execute === true) {
		if (hero.Health <= 0) {
			gameovr = true;
			
			execute = false;
			gameOver();
		}
	}
}
/*Stopt all bewegingen en zet volume van muziek op 0, verandert het scherm naar gameover, waar je de herstart knop hebt*/

function gameOver() {
	"use strict";
	pain.volume = 0;
	fire.volume = 0;
	hurt.volume = 0;
	heal.volume = 0;
	G_points = Points;
	G_tijd = hour + ":" + minute + ":" + seconds;
	window.location = "gameover.html";
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
	storeData();
}

/* alle vijanden die in de array zitten worden aangeroepen en de functie beweeg op toegepast */

function beweeg() {
	"use strict";

	var i;
	for (i = 0; i < vijanden.length; i += 1) {
		vijanden[i].beweeg();
	}
}


/* als het scherm kleiner of groter wordt, wordt de positie van je hero terug op 0, 0 gezet(dit om zware berekeningen te moeten voorkomen), en wordt het speelveld dynamisch aangepast */


$(window).on('resize', function () {
	"use strict";
	if (!gameovr) {
		numberH = Math.floor(window.innerHeight / 50);
		numberW = Math.floor(window.innerWidth / 50);
		offsetPlayerW = ((window.innerWidth) - (numberW * 50)) / 2;
		offsetPlayerH = ((window.innerHeight) - (numberH * 50)) / 2;
		container = $('#container');
		container.css('height', (numberH * 50) - 50);
		container.css('width', numberW * 50);
		container.css('top', offsetPlayerH + 50 + 'px');
		$('#outer').css('left', offsetPlayerW);
		$('#outer').css('top', offsetPlayerH);
		$('#points').css('right', offsetPlayerW);
		hero.X = 0;
		hero.Y = 0;
		PosX = offsetPlayerW;
		PosY = offsetPlayerH;
		hero.element.css('left', PosX);
		hero.element.css('bottom', PosY);
	}
});

function increasePoints() {
	"use strict";
	Points += 1;
	document.getElementById('points').innerHTML = Points;
}

var radius = 5;
function createEnemy() {
	"use strict";
	if (vijanden.length <= MaxEnemy) {
		clearTimeout(time);
		RND = Math.floor(Math.random() * 2);
		if (RND === 0) {
			direction = 'links';
		} else if (RND === 1) {
			direction = 'rechts';
		}
		if (vijanden.length <= MaxEnemy) {
			clearTimeout(time);
			PosX = Math.floor(Math.random() * window.innerWidth - 100) + offsetPlayerW;
			PosY = Math.floor(Math.random() * window.innerHeight - 100) + offsetPlayerH;
			if (PosX < window.innerWidth && PosX > (50 + offsetPlayerW) && PosY > offsetPlayerH && PosY < window.innerHeight - 100 && (PosX / 50 - radius >= hero.X || PosX / 50 - radius <= hero.X) && (PosY / 50 - radius >= hero.Y || PosY / 50 - radius <= hero.Y)) {
				vijanden.push(new Vijand(100, PosX, PosY, direction));
			} else {
				PosX = Math.floor(Math.random() * window.innerWidth - 100) + offsetPlayerW;
				PosY = Math.floor(Math.random() * window.innerHeight - 100) + offsetPlayerH;
				if (PosX < window.innerWidth && PosX > (50 + offsetPlayerW) && PosY > offsetPlayerH && PosY < window.innerHeight - 100 && (PosX / 50 - radius >= hero.X || PosX / 50 - radius <= hero.X) && (PosY / 50 - radius >= hero.Y || PosY / 50 - radius <= hero.Y)) {
					vijanden.push(new Vijand(100, PosX, PosY, direction));
				}
			}
			time = setTimeout(createEnemy, 10000 / Math.sqrt((Points + 1) * (numberH * numberW) / 100));
		}
		if (vijanden.length === 0) {
			createEnemy();
			
		}
	}
}


function createPowerUp() {
	"use strict";
	RND = Math.floor(Math.random() * 10);
	if (RND < 2) {
		PPosX = Math.floor(Math.random() * window.innerWidth) + offsetPlayerW;
		PPosY = Math.floor(Math.random() * window.innerHeight) + offsetPlayerH;
		if (PPosX < (window.innerWidth - 50) && PPosX > (offsetPlayerW) && PPosY > (offsetPlayerH) && PPosY < (window.innerHeight - offsetPlayerH - 80)) {
			Powerups.push(new PowerUp(PPosX, PPosY, "health", 10));
		}
	}
}
/*





BEWEEGFUNCTIES






*/
function left() {
	"use strict";
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
	"use strict";
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
	"use strict";
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
	"use strict";
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
	"use strict";
	if (vurenmogelijk) {
		fire.currentTime = 0;
		fire.play();
		if (Richting === 'rechts') {
			Angle = 90;
		} else if (Richting === 'links') {
			Angle = -90;
		} else if (Richting === 'omhoog') {
			Angle = 0;
		} else if (Richting === 'omlaag') {
			Angle = 180;
		}
		vurenmogelijk = false;
		kogels.push(new Kogel(hero.X * 50 + offsetPlayerW, hero.Y * 50 + offsetPlayerH, Angle, Richting));
		setTimeout(resetvuren, 300);
	}
}

function resetvuren() {
	"use strict";
	vurenmogelijk = true;
}
document.onkeyup = function (e) {
	"use strict";
	if (!gameovr) {
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
			if (hero.Health < 500) {
				hero.Health += 100;
			}
		}
	}
	updateHealth();
}

function checkCollide() {
	"use strict";
	checkHeroCollide();
	var j, i, kogelX, kogelY;
	for (i = 0; i < vijanden.length; i += 1) {
		for (j = 0; j < kogels.length; j += 1) {
			kogelX = kogels[j].X;
			kogelY = kogels[j].Y;
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
					increasePoints();
				}
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
		} else if (kogels[j].Richting === 'links') {
			kogels[j].element.animate({
				left: "-=25"
			}, 25);
			kogels[j].X -= 0.5;
		} else if (kogels[j].Richting === 'omhoog') {
			kogels[j].element.animate({
				bottom: "+=25"
			}, 25);
			kogels[j].Y += 0.5;
		} else if (kogels[j].Richting === 'omlaag') {
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
	"use strict";
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

function home() {
	"use strict";
	window.location = "index.html";
}

function highscore() {
	"use strict";
	window.location = "Highscores.html";
}

function startscreen() {
	"use strict";
	$('#ToonSpelregels').css('width', window.innerWidth / 3);
	$('#ToonControls').css('width', window.innerWidth / 3);
}
var name;
var pressed;

function mute() {
	"use strict";
	if (!pressed) {
		$('#Mute span').html("Unmute");
		pain.volume = 0;
		fire.volume = 0;
		hurt.volume = 0;
		background.volume = 0;
		heal.volume = 0;
		pressed = true;
	} else {
		$('#Mute span').html("Mute");
		pain.volume = 1;
		fire.volume = 0.5;
		hurt.volume = 1;
		background.volume = 0.5;
		heal.volume = 1;
		pressed = false;
	}
}


function countTimer() {
	"use strict";
	totalSeconds += 1;
	hour = Math.floor(totalSeconds / 3600);
	minute = Math.floor((totalSeconds - hour * 3600) / 60);
	seconds = totalSeconds - (hour * 3600 + minute * 60);
	document.getElementById("timer").innerHTML = hour + ":" + minute + ":" + seconds;
}
/* startfunctie */



function start() {
	"use strict";
	if (document.getElementById('naam').value !== "" && document.getElementById('naam').value.length <= 6) {
		gameovr = false;
		background.play();
		background.loop = true;
		$('h1').remove();
		$('h3').remove();
		
		G_naam = document.getElementById("naam").value;
		$('input').remove();
		$('#ToonSpelregels').remove();
		$('#ToonControls').remove();
		container = $('#container');
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
		createDatabase();
		timerVar = setInterval(countTimer, 1000);
		totalSeconds = 0;
	} else {
		$("#naam").css("border-color", "red");
		alert("Please fill in a username (max 6 charachters)");
	}
}