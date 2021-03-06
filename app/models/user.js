﻿  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  var bcrypt = require('bcrypt-nodejs');

  var UsersSchema = new Schema({
    //firstName: { type: String, lowercase: true, required: true },
    username: { type: String, lowercase: true, required: true, unique: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true }
  });

  UsersSchema.pre('save', function(next) {
    var user = this;
    bcrypt.hash(user.password, null, null, function(err, hash) {
      if(err) return next(err);
      user.password = hash;
      next();
    });
  });

  UsersSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

module.exports = mongoose.model('User', UsersSchema);