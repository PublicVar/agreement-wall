const mysql = require('mysql');
const db = require('./db');

class PeopleDB {
    constructor(database){
        this.db = database;
    }
    save(people, callback) {
        let sql = 'INSERT INTO `people` SET ?';
        this.db.query(sql, people, callback);
    }

    getIdByHash(hash, callback) {
        let sql = 'SELECT ?? FROM people WHERE ?? = ?';
        const inserts = ['id', 'hash', hash];
        sql = mysql.format(sql, inserts);
        this.db.query(sql, callback);
    }

    setOptedIn(id,ip, callback){
        let sql = "UPDATE people SET agreedAt = CURRENT_TIMESTAMP(), ip = ? WHERE ?? = ?";
        const inserts = [ip,'id',id];
        sql = mysql.format(sql, inserts);
        this.db.query(sql, callback);
    }
}

module.exports = new PeopleDB(db);