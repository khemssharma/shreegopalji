const winston = require('winston');

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(
            ({ timestamp, level, message, ...meta }) =>
                `${timestamp} [${level.toUpperCase()}]: ${message} ${
                    Object.keys(meta).length ? JSON.stringify(meta) : ''
                }`
        )
    ),
    transports: [
        new winston.transports.Console(),
        // Uncomment below to log to a file
        // new winston.transports.File({ filename: 'app.log' })
    ],
});

module.exports = logger;