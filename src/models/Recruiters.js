const mongoose = require('mongoose');
const { Schema } = mongoose;

const RecruitersSchema = new Schema({
    name:String,
    email:String,
    phone:String
});

const Recruiters = mongoose.model('Recruiters',RecruitersSchema);

module.exports = Recruiters;