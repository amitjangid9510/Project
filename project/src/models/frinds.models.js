const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const frindsSchema = new Schema(
    {
  user: 
  { type: mongoose.Schema.Types.ObjectId,
     ref: 'user', 
     required: true },

  friends: 
  [{ type: mongoose.Schema.Types.ObjectId, 
    ref: 'user' }],

},{
    timestamps :true
});

const frinds = mongoose.model('frinds', frindsSchema);



module.exports = frinds;