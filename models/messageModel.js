const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true,
        trim: true
    },
    room: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true
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

// Query Helpers
MessageSchema.query.sortByCreatedDate = function(flag) {
  let sortOrder = 0
  if (flag === "ASC") sortOrder = 1
  if (flag === "DESC") sortOrder = -1
  return this.sort({'created': sortOrder})
}

// Pre-save chain
MessageSchema.pre('save', (next) => {
    let now = Date.now()

    // set updatedat value after save
    this.updatedat = now

    // set created value only if it is being created.
    if (!this.created) {
        this.created = now
    }
    next()
});

MessageSchema.pre('findOneAndUpdate', (next) => {
    // set updateat after updating
    this.updatedat = now
    next()
});

const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;