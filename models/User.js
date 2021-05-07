const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({

first_name: {
    type: String,
    required: true,
},
last_name: {
    type: String,
    required: true,
},
email: {
    type: String,
    required: true,
},
password: {
    type: String,
    index: true,
    trim: true
},
// phone: {
//     type: String,
//     required: true,
//     unique: true,
// },
// email_verify: {
//     type: Boolean,
//     default: false
// },
// role: {
//     type: String,
//     enum: ['free', 'cashier', 'manager', 'admin'],
//     default: 'free',
// },
// gender: {
//     type: Number,
//     required: true,
// },
// birthday: {
//     type: Date,
//     required: true,
// },
// country: {
//     type: String,
//     required: true
// },
// post_code: {
//     type: String,
//     required: true
// },
favourite_club: {
    type: Object,
    required: true
},
// other_club: {
//     type: Object
// },
// club_email_communication: [
//     {
//         club: String,
//         email_communication: Number
//     }
// ],
premier_email_communication: {
    type: Number,
    required: true
},
partner_email_communication: {
    type: Number,
    required: true
}
});

module.exports = User = mongoose.model("users", UserSchema);
