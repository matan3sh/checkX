const mongoose = require('mongoose');

const ChecklistSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'general'
  },
  list: [
    {
      text: {
        type: String
      },
      completed: {
        type: Boolean
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('checklist', ChecklistSchema);
