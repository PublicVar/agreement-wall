const winston = require('winston');
var morgan = require('morgan');
//Add winston log to a file and disable the default console outpu
const logger = new (winston.Logger)({
    transports: [
      //log : error, warn, info
      new winston.transports.File({ 
        level: 'info',
        filename: './logs/all.log' ,
        json: true,
        maxsize: 5242880, //5MB
        maxFiles: 5,
        colorize: false
      }),
      //log debug
      new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true,
            filename: './logs/debug.log',
        })
    ],
    exitOnError: false
});
logger.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};

module.exports = logger;