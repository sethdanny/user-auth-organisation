const register = (req, res, next) => {
    res.status(201).json({
        status: 'sucess',
        message: 'registered successfully'
    })
}

module.exports = {register}