const mongose = require("mongoose");

const SkillSchema = new mongose.Schema({
    title:{
        type:String,
        required:[true,'please type skill title'],
        maxlength:[20,'title can not be more than 20']
    },
    rate:{
        type:String,
        required:[true,'please rate to your skill']
    },
    description:{
        type:String,
        required:[true,'Please tell about your skill'],
        maxlength:[50,'description can not be more than 50']
    }
})

const skill = mongose.model("skills",SkillSchema);
module.exports = skill;