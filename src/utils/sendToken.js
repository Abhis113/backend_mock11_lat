// create send token function

const sendToken = (user, statusCode,res) => {
    const token = user.getJWTToken();

    // store token in cookie
    const options = {
        expire: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
        ),
        httpOnly:true
    }

    res.status(statusCode).cookie("token", token, options).json({
        succsess: true,
        user,
        token,
    })
}

module.exports = sendToken;
// export in user controllers 