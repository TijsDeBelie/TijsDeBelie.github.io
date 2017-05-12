var db = openDatabase('Highscores', '1.0', 'Highscores of the Dungeon Runner game', 2 * 1024 * 1024); 
var G_naam;
var G_points = Points;


function CreateDatabase() {
db.transaction(function (tx) { 
	tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique, log)');
	

});
}



function StoreData() {
db.transaction(function (tx) { 
	tx.executeSql('INSERT INTO LOGS (id,log) VALUES (?, ?)', 
		[G_naam, G_points]); 
	

});
}







