var mysql      = require('mysql');
const logger = require('../services/logger/logger');
// var db = mysql.createConnection({
//   host     : 'localhost',
//   user     : process.env.MYSQL_USER,
//   password : process.env.MYSQL_PASSWORD,
//   database : 'agreementwall'
// });
const dbConfig = {
  host     : 'localhost',
  user     : process.env.MYSQL_USER,
  password : process.env.MYSQL_PASSWORD,
  database : 'agreementwall'
};
var db = mysql.createPool(dbConfig);


//-
//- Establish a new connection
//-
db.getConnection(function(err){
    if(err) {
        logger.log('error',"Database Error:  *** Cannot establish a connection with the database. ***")

        db = reconnect(db);
    }else {
        logger.log('info',"Database Info:  *** New connection established with the database.***")
    }
});


//-
//- Reconnection function
//-
function reconnect(db){
  logger.log('info',"Database Info:  *** New connection tentative...")
    //- Create a new one
    db = mysql_npm.createPool(db_config);

    //- Try to reconnect
    db.getConnection(function(err){
        if(err) {
            //- Try to connect every 2 seconds.
            setTimeout(reconnect(db), 2000);
        }else {
            logger.log('info',"Database Info:  *** New connection established with the database.***")
            return db;
        }
    });
}

//-
//- Error listener
//-
db.on('error', function(err) {

    //-
    //- The server close the connection.
    //-
    if(err.code === "PROTOCOL_CONNECTION_LOST"){    

        logger.log('error',"Database Error:  *** Cannot establish a connection with the database.("+err.code+") ***");
        return reconnect(db);
    }

    else if(err.code === "PROTOCOL_ENQUEUE_AFTER_QUIT"){
        logger.log('error',"Database Error:  *** Cannot establish a connection with the database.("+err.code+") ***");
        return reconnect(db);
    }

    else if(err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR"){
        logger.log('error',"Database Error:  *** Cannot establish a connection with the database.("+err.code+") ***");
        return reconnect(db);
    }

    else if(err.code === "PROTOCOL_ENQUEUE_HANDSHAKE_TWICE"){
        logger.log('error',"Database Error:  *** Cannot establish a connection with the database.("+err.code+") ***");
    }

    else{
        logger.log('error',"Database Error:  *** Cannot establish a connection with the database.("+err.code+") ***");
        return reconnect(db);
    }

});

module.exports = db;
