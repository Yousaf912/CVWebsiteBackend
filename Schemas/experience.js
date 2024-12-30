const mongose = require("mongoose");

const ExperienceSchema = new mongose.Schema({
    title: {
        type: String,
        required: [true, 'Job title is required'],
        maxlength: [30, 'title can not be more than 30']
    },
    office: {
        type: String,
        required: [true, 'Please type office name'],
        maxlength: [30, 'office name sould be less than 30']
    },
    address: {
        type: String,
        required: [true, 'Please type office address'],
        maxlength: [30, 'address can be more than 30']
    },
    startingDate: {
        type: String,
        required:[true,'job starting date is required']
    },
    endDate: {
        type: String,
        required:[true,'job ending date is required']
    }
})

const experience = mongose.model("Experience",ExperienceSchema);
module.exports = experience;