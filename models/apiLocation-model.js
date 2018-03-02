const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const ApiLocationSchema = new Schema ({
  spotName      : { type: String },
  street_number : { type: String, required: true },
  route         : { type: String, required: true },
  city          : { type: String, required: true },
  state         : { type: String },
  postal_code   : {type: Number, required: true },
  country       : {type: Number, required: true },
  description   : { type: String },
  _creator      : { type: Schema.Types.ObjectId, ref: 'User', required: true },
});
const DPSpot = mongoose.model('DPSpot', ApiLocationSchema);
module.exports = DPSpot;