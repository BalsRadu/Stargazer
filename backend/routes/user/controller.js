const model = require("./model");
const postModel = require("../post/model");
const jwt = require("jsonwebtoken")
const config = require("../../config")

module.exports = {
    login: (req, res) => {
        model.findOne({email: req.body.email }, (err,user) =>{
            if(err) {
                res.status(500).send({auth: false, msg: err});
                return
            }

            if(!user){
                res.send({auth: false, emailError: true ,msg: "Email not found"});
                return
            }

            user.comparePassword(req.body.password, (err,isMatch) => {
                if(err) throw err;
                if(isMatch) {
                    let jwtToken = jwt.sign({id :user._id}, config.secret, {expiresIn: 86400});
                    console.log(jwtToken)
                    res.status(200).send({auth: true, jwtToken});
                    return
                }else{
                    res.send({auth: false, passError: true,msg: "Password is incorrect"});
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
            let token = jwt.sign({id :result._id}, config.secret, {expiresIn: 86400});
            res.status(200).send({auth: true, token});
            return;

        })
        .catch(err => {
            if(err.code == 11000){
                res.send({auth: false, msg: "Email already exists..."});
                return
            }
            res.send({auth: false, msg: "An internal server error has occured"});
        })

    },
    getProfile: (req, res) => {
        let user_id = jwt.decode(req.body.auth_token).id;
        model.findById(user_id)
        .then(user => {
            if (!user) {
                res.send({success: false, msg: "User not found"}); 
            }

            postModel.find({user_id: user_id})
                .then(posts =>  {
                    res.send({
                        success: true,
                        details: {
                            display_name: user.username,
                            posts: posts
                        }
                    })
                })
        })
    },
    //refactorizeaza functia asta cu functia de mai sus
    getsearchedprofile: (req, res) => {
        user_id = req.body.user_id
        model.findById(user_id)
        .then(user => {
            if (!user) {
                res.send({success: false, msg: "User not found"}); 
            }

            postModel.find({user_id: user_id})
                .then(posts =>  {
                    res.send({
                        success: true,
                        details: {
                            display_name: user.username,
                            posts: posts
                        }
                    })
                })
        })
    },
    editprofile: (req, res) => {
        let user_id = jwt.decode(req.body.auth_token).id;
        model.findByIdAndUpdate(user_id,{ username: req.body.username, email :req.body.email })
        .then(oldUser => {
            if(oldUser){
                postModel.updateMany({display_name: oldUser.username},{display_name: req.body.username})
                res.send({success: true, msg: "User successfully updated"}); 
            }else{
                res.send({success: false, msg: "No user with the send id"}); 
            }
        }).catch( err => {
            res.send({success: false, msg: "Something went wrong durring the updating proccess"}); 
        })
    }
}