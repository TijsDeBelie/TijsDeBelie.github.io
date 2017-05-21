/*global Audio, gameOver, kongregate, Points, openDatabase, db:true*/

var db = openDatabase('Highscores', '1.0', 'Highscores of the Dungeon Runner game', 3 * 1024 * 1024); 
var G_naam;
var G_points = Points;
var G_tijd;

function createDatabase() {
db.transaction(function (tx) { 
	tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (naam TEXT UNIQUE, punten INTEGER, tijd TEXT)');
	

});
}



function storeData() {
db.transaction(function (tx) { 
	tx.executeSql('INSERT INTO LOGS (naam,punten,tijd) VALUES (?, ?, ?)', 
		[G_naam, G_points, G_tijd]); 
	
	

});
}







