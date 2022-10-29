const jwt = require("jsonwebtoken");
const userModel = require("../user/model");

module.exports = {
    searchuser: (req, res) => {
        let reg = new RegExp(`^${req.body.username}`);
        userModel.find({ username: { $regex: reg } })
        .then(users => {
            if (!users || users.length === 0) {
                res.send({success: false, msg: "No user was found"}); 
            }else{
                let user_id = jwt.decode(req.body.auth_token).id;
                res.send({success: true, users: users,currId: user_id});
            }
        }).catch(err =>{
            if (err) res.send({success: false, msg: err}); 
        })
    },
    getusers: (req, res) => {
        userModel.find()
        .then(users => {
            if (!users || users.length === 0) {
                res.send({success: false, msg: "No user was found"}); 
            }else{
                res.send({success: true, users: users});
            }
        }).catch(err =>{
            if (err) res.send({success: false, msg: err}); 
        })
    }
}