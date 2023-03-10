const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim:true
  },
  created: { 
    type: Date,
    default: Date.now
  },
  updatedat: { 
    type: Date,
    default: Date.now
  },
});

UserSchema.methods.validatePassword = function(pwd) {
  return (pwd === this.password)? true : false;
}

UserSchema.methods.getFullName = function () {
  return `${this.firstName} ${this.lastName}`
}

// Pre-save chain
UserSchema.pre('save', (next) => {
    let now = Date.now()

    // set updatedat value after save
    this.updatedat = now

    // set created value only if it is being created.
    if (!this.created) {
        this.created = now
    }
    next()
});

UserSchema.pre('findOneAndUpdate', (next) => {
    // set updateat after updating
    this.updatedat = now
    next()
});

const User = mongoose.model("User", UserSchema);
module.exports = User;