const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  account_created: {
    type: String,
    dafault: true,
  },
  followers_count: {
    type: Number,
    default: 0,
  },
  following_count: {
    type: Number,
    default: 0,
  },
});

userSchema.pre("save", function (next) {
  let user = this;

  if (!user.isModified("password")) return next;

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
