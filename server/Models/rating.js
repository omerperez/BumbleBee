const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
  client: { type: Schema.Types.ObjectId, ref: "users" },
  dealer: { type: Schema.Types.ObjectId, ref: "users" },
  count: Number,
});

module.exports = new mongoose.model("Rating", ratingSchema);