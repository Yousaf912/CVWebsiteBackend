const mongose = require("mongoose")


const EducationSchema = new mongose.Schema({
    name:{
        type:String,
        required:[true,'Degree title is required'],
        maxlength:[20,'title is too long']
    },
    instituteName:{
        type:String,
        required:[true,'institute name is required']
    },
    startdate:{
        type:String,
        required:[true,'starting date is required']
    },
    enddate:{
        type:String,
        required:[true,'please select end date']
    }
})

const education = mongose.model('education',EducationSchema);
module.exports = education