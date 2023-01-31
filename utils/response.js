const response = ({ res, data = null, error = null, errorCode = 422 }) => {
    if (error) {
        return res.status(errorCode).json({
            error,
            message: "There has been an Error",
        });
    }

    if (!data) {
        return res.status(errorCode).json({
            error: "Sorry No Data found",
        });
    }

    return res.json({
        data,
        message: "Success",
    });
};

module.exports = response;