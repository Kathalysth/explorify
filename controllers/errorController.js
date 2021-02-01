const AppError = require("../utils/appError");

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}.`
    return new AppError(message, 400)
}

const handleDuplicateFieldsDB = err => {
    const value = err.keyValue.name
    // console.log(value)
    const message = `Duplicate fields value: ${value}. Please use another value `
    return new AppError(message, 400)
}

const handelValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(el => el.message)

    const message = `Invalid input data. ${errors.join('. ')}`
    return new AppError(message, 400)
}

const handleJwtError = () => new AppError('Invalid token. Please login again!', 401)

const handleJwtExpired = () => new AppError('Your token has expired, please log in again!', 401)
 

const sendErrorDev = (err, req, res) => {
    // API
    if(req.originalUrl.startsWith('/api')) {
        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
          });
    } else {
        // RENDERED WEBSITE
        res.status(err.statusCode).render('error', {
            title: 'Something went wrong!',
            msg: err.message
        })
    }
    
}

const sendErrorProd = (err, req, res) => {
    // API
    if(req.originalUrl.startsWith('/api')) {
        // Operational, trusted error: send message to client
        if(err.isOperational) {
                res.status(err.statusCode).json({
                status: err.status,
                message: err.message
            });

        // Programming error or other unknown error: don't leak error details
        } else {
            // 1) Log error
            console.error('ERROR', err)

            // 2) Send generic error

                res.status(500).json({
                status: 'error',
                message: 'Something went very wrong'
            })
        }
    } else {
        // RENDERED WEBSITE
         // Operational, trusted error: send message to client
         if(err.isOperational) {
            // console.log(err)
            res.status(err.statusCode).render('error', {
                title: 'Something went wrong!',
                msg: err.message
            })

        // Programming error or other unknown error: don't leak error details
        } else {
            // 1) Log error
            console.error('ERROR', err)

            // 2) Send generic error

            res.status(err.statusCode).render('error', {
                title: 'Something went wrong!',
                msg: 'Please try again later.'
            })
        }
    }
    
    
}

module.exports = (err, req, res, next) => {
    /* console.log(err.stack) */
  
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if(process.env.NODE_ENV === 'development') {
        sendErrorDev(err, req, res)
    } else if (process.env.NODE_ENV === 'production') {
        let error = {...err};
        error.message = err.message

        if(err.name === 'CastError') error = handleCastErrorDB(error)
        if(err.code === 11000) error = handleDuplicateFieldsDB(error)
        if(err.name === 'ValidationError') error = handelValidationErrorDB(error);
        if (error.name === 'JsonWebTokenError') error = handleJwtError()
        if (error.name === 'TokenExpiredError') error = handleJwtExpired()

        sendErrorProd(error, req, res)
    }
  }