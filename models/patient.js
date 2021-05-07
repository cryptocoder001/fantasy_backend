const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
    team_name: {
      type: String,
      required: true
      },
    money: {
      type: Number,
      default:0
      },
    score: {
      type: Number,
      default:0
        },
    terms_agreed: {
      type: Boolean
    },
    players: {
      type: Array
    },
    favourite_team: {
      type: String
    }
  });
  
  module.exports = Team = mongoose.model("teams", TeamSchema);