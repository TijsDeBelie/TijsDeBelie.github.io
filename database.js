/*global Audio, gameOver, kongregate, Points*/

var db = openDatabase('Highscores', '1.0', 'Highscores of the Dungeon Runner game', 2 * 1024 * 1024); 
var G_naam;
var G_points = Points;


function createDatabase() {
db.transaction(function (tx) { 
	tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (naam TEXT UNIQUE, punten INTEGER)');
	

});
}



function storeData() {
db.transaction(function (tx) { 
	tx.executeSql('INSERT INTO LOGS (naam,punten) VALUES (?, ?)', 
		[G_naam, G_points]); 
	

});
}







