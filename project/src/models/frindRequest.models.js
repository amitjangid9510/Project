const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const frindRequestSchema = new Schema(
    {
  fromUser: 
  { type: mongoose.Schema.Types.ObjectId,
     ref: 'user',
      required: true },

  toUser: 
  { type: mongoose.Schema.Types.ObjectId,
     ref: 'user',
      required: true },

  status: 
  { type: String,
     enum: ['pending', 'accepted', 'rejected'], default: 'pending' },

},{
    timestamps :true
});

const frindsRequest = mongoose.model('frindsRequest', frindRequestSchema);



module.exports = frindsRequest;
