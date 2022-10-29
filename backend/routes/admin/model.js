const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = mongoose.Schema({
    adminName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    token: {
        type: String,
        required: true,
        unique: true
    },
    account_created: {
        type: String,
        dafault: true
    }
});

adminSchema.pre("save", function(next) {
    let admin = this

    if(!admin.isModified('password')) return next;

    bcrypt.genSalt(10, function(err, salt) {
        if(err) return next(err);

        bcrypt.hash(admin.password, salt, function(err,hash) {
            if(err) return next(err);

            admin.password = hash;
            next();
        });
    });
});

adminSchema.methods.comparePassword = function (candidatePassword, cb){
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch);
    });
}

const adminModel = mongoose.model('admin', adminSchema);

module.exports = adminModel;
