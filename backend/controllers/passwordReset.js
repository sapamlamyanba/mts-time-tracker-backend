const User = require('../models/userModels')
const  Token = require('../models/token');
const sendEmail = require('../config/sendEmail')
const Joi = require('joi')
const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto');


router.post("/", async (req, res) => {
    try {      
        
        const schema = Joi.object({ email: Joi.string().email().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findOne({ email: req.body.email });
        if (!user){
            console.log("User not found");
            return res.status(400).send("given user email doesn't exist");
        }
        // console.log('user found');
        
        let resetToken = await Token.findOne({ userId: user._id });
        if (!resetToken) {
            const hashedToken = await bcrypt.hash(crypto.randomBytes(32).toString("hex"), 10);
            const encodedToken = encodeURIComponent(hashedToken);           
            resetToken = await new Token({
                userId: user._id,
                token: encodedToken ,
            }).save();
        }

        const link = `http://localhost:8000/api/password-reset/${resetToken.token}`;
        // console.log('checkk Link',`${resetToken.token}`);        

        await sendEmail(user.email, "Password reset", link);
        res.status(500).send({
            message:"password reset link sent to your email",
            resetToken:resetToken.token});
      
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});

router.post("/:token", async (req, res) => {
    try {
        const schema = Joi.object({ password: Joi.string().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        console.log('req.params.token.....',req.params.token);
        const encodedToken = encodeURIComponent(req.params.token);

        const token = await Token.findOne({
            token: encodedToken,
        });

        if (!token) return res.status(400).send("invalid link or expired");
        console.log('token.....',token);

        const user = await User.findById(token.userId);
        console.log('users.....',user);
        
        if (!user) return res.status(400).send("invalid user");

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        user.password = hashedPassword;
        await user.save();
        console.log('userUpdated',user);
        
        await token.deleteOne();

        res.send("password reset sucessfully.");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
}

);



module.exports = router;