const User = require("../model/userModel");
const sendToken = require("../utils/sendToken");



const userRegistration = async (req, res, next) => {
    try {

        const {
            email,
            password
        } = req.body;

        const user = await User.create({
            email,
            password,
        });
        sendToken(user, 201, res);
    } catch (err) {
        return res.send({
            message: err.message
        });
    }
};


const userLogin = async (req, res, next) => {
   try{
    const {
        email,
        password
    } = req.body;

 
    if (!email || !password) {
        return next(
           res.status(400).send("Please Enter valid email and password")
        );
    }


    const user = await User.findOne({
        email
    }).select("+password");
    
    if (!user) {
        return next(res.status(401).send("please enter valid email or password"));
    }
   
    const passwordCheck = user.comparePassword(password);

    if (!passwordCheck) {
        next(res.status(401).send("please enter valid email or password"));
    }
   
    sendToken(user, 200, res);
   }
   catch(err){
    return res.send({
        message: err.message
    });
   }
};


module.exports = {
    userRegistration,userLogin
}