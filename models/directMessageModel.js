const mongoose = require('mongoose');

const DMSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true,
        trim: true
    },
    receiver: {
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
DMSchema.query.sortByCreatedDate = function(flag) {
  let sortOrder = 0
  if (flag === "ASC") sortOrder = 1
  if (flag === "DESC") sortOrder = -1
  return this.sort({'created': sortOrder})
}

// Pre-save chain
DMSchema.pre('save', (next) => {
    let now = Date.now()

    // set updatedat value after save
    this.updatedat = now

    // set created value only if it is being created.
    if (!this.created) {
        this.created = now
    }
    next()
});

DMSchema.pre('findOneAndUpdate', (next) => {
    // set updateat after updating
    this.updatedat = now
    next()
});

const DM = mongoose.model("DM", DMSchema);
module.exports = DM;