const mongose = require("mongoose");
const Schema = mongose.Schema;

const SocietySchema = new Schema(
  {
    name: { type: String, required: true },
    logo: {
      data: Buffer,
      contentType: String,
    },
    email: { type: String, required: true },
    gensec1: { type: String, required: true },
    gensec2: { type: String, required: true },
    desc: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Society = mongose.model("Society", SocietySchema);

module.exports = Society;
