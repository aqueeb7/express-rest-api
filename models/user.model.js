const { Schema, default: mongoose } = require('mongoose');
const bcrypt = require('bcrypt');

const schema = new Schema({
  first_name: { type: String, default: '' },
  last_name: { type: String, default: '' },
  email: { type: String, default: null },
  password: { type: String, default: null },
}, {
  timestamps: true,
});

schema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

const User = mongoose.model('User', schema);
module.exports = User;