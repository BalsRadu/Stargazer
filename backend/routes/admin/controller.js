const model = require("./model");
const postModel = require("../post/model");
const jwt = require("jsonwebtoken")
const config = require("../../config")

module.exports = {
    login: (req, res) => {
        model.findOne({email: req.body.email }, (err,admin) =>{
            if(err) {
                res.status(500).send({auth: false, msg: err});
                return
            }

            if(!admin){
                res.send({auth: false, emailError: true ,msg: "Email not found"});
                return
            }
            if(admin.token !== req.body.token){
                res.send({auth: false, tokenError: true ,msg: "The send token was invalid"});
                return
            }

            admin.comparePassword(req.body.password, (err,isMatch) => {
                if(err) throw err;
                if(isMatch) {
                    let jwtToken = jwt.sign({id :admin._id}, config.secret, {expiresIn: 86400});
                    res.status(200).send({auth: true, jwtToken});
                    return
                }else{
                    res.send({auth: false, passError: true,msg: "Password is incorrect"});
                }
            });
        });
    },
    register: (req, res) => {
        let newAdmin = new model({
            adminName: req.body.adminName,
            email: req.body.email,
            password: req.body.password,
            token: req.body.token,
            account_created: Date.now()
        })
        newAdmin.save()
        .then(result => {
            let jwtToken = jwt.sign({id :result._id}, config.secret, {expiresIn: 86400});
            res.status(200).send({auth: true, jwtToken});
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
    deletePost: (req, res) => {
        postModel.deleteOne({_id: req.body.postId})
                .then(nrPosts =>  {
                    if(nrPosts.deletedCount > 0)
                        res.send({
                            success: true,
                        })
                    else{
                        res.send({
                            success: false,
                        })
                    }
                })
    }
}