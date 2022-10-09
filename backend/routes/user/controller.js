const model = require("./model");
const jwt = require("jsonwebtoken")
const config = require("../../config")

module.exports = {
    login: (req, res) => {
        model.findOne({email: req.body.email }, (err,user) =>{
            if(err) throw err;
            console.log(user)
            user.comparePassword(req.body.password, (err,isMatch) => {
                if(err) throw err;
                if(isMatch) {
                    let token = jwt.sign({id :user._id}, config.secret, {expiresIn: 86400});
                    res.status(200).send({msg: "Login Successful", token});
                }else{
                    res.status(500).send({msg: "Passwords did not match"});
                }
            });
        });
    },
    register: (req, res) => {
        let newUser = new model({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            account_created: Date.now()
        })

        newUser.save()
        .then(result => {
            console.log(result);
            res.status(200).send({msg: "Register Successful",user_id: result._id});

        })
        .catch(err => {
            console.log(err);
            res.status(500).send({msg: "Register Unsuccessful"});

        })

    }
}