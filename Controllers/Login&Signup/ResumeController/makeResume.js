const jwt = require("jsonwebtoken");
const User = require("../../../Schemas/UserSchema");
const personalinfosch = require("../../../Schemas/PersonalInfoSchema");
const education = require("../../../Schemas/educationSchema");
const experience = require("../../../Schemas/experience");
const skill = require("../../../Schemas/SkillSchema");
const key = process.env.SECURITY_KEY;

const makeResume = {
    verifyUser: async (req, res, next) => {
        try {
            const token = req.header("Authorization");
            const jwttoken = await token.replace("Bearer ", "").trim();
            const verify = await jwt.verify(jwttoken, key);
            req.user = verify
            next()

        } catch (er) { throw er }
    },
    home: async (req, res) => {
        try {
            res.status(201).send({ user: req.user })
        } catch (er) { throw er }
    },
    setTemplate: async (req, res) => {

        try {
            const id = await req.params.userid;
            const update = await User.updateOne({ _id: id }, {
                $set: { "template": req.body.template }
            })
            res.status(200).send(update)



        } catch (er) { throw er }
    },
    addpersonalinfo: async (req, res) => {
        try {
            const id = await req.params.userid;
            const data = await req.body;
            const newinstant = await new personalinfosch(data)
            const validationError = await newinstant.validateSync();
            if (validationError) {
                return res.status(400).json({ message: 'Validation failed', errors: validationError.errors });
            } else {

                await User.updateOne({ _id: id }, {
                    $set: { "personalinfo": data }
                });
                res.status(201).send({ message: "Added" })

            }


        } catch (err) {
            if (err.name === 'ValidationError') {
                return res.status(400).send({ message: 'Validation failed', errors: err.errors });
            }
            res.status(500).send({ message: 'Internal server error', error: err.message });
        }
    },
    addeducation: async (req, res) => {
        try {
            const id = req.params.userid;
            const data = await req.body;
            const newinstant = await new education(data);
            const eror = await newinstant.validateSync();
            if (eror) {
                res.status(400).send({ message: 'validation eror', eror })
            } else {
                const user = await User.findOne({ _id: id });
                console.log(user.education.length);

                if (user.education.length == 4) {
                    res.status(200).send({ message: 'only 4 education can be added' })
                } else {

                    const present = user.education.some((val) => val.name == req.body.name);
                    if (present) {
                        res.status(400).send({ message: 'this degree is already added' })
                    }
                    else {

                        await User.updateOne({ _id: id }, {
                            $push: { "education": data }
                        })
                        res.status(201).send({ message: 'added' })
                    }
                }
            }


        } catch (er) {
            if (er.name == 'ValidationError') {
                return res.status(400).send({ message: 'validation eror', er })
            }
            res.status(500).send({ message: 'Internal server error', error: err.message });
        }
    },

    AddExperience: async (req, res) => {
        try {
            const id = req.params.userid;
            const data = await req.body;
            const userExist = await User.findById({ _id: id });

            if (userExist) {
                if (userExist.experience == 4) {
                    res.status(400).send({ message: 'data can not be exc,eed more than 4' })
                } else {
                    const newinstant = await new experience(data);
                    const eror = await newinstant.validateSync();
                    if (eror) {
                        res.status(400).send({ message: 'validation eror', eror })
                    } else {
                        await User.updateOne({ _id: id }, {
                            $push: { "experience": data }
                        })
                        res.status(201).send({ message: 'added' })
                    }
                }
            }

        } catch (er) { throw er }
    },


    AddSkill: async (req, res) => {
        try {
            const id = req.params.userid;
            const data = await req.body;
            const userExist = await User.findById({ _id: id });

            if (userExist) {
                if (userExist.skills.length == 5) {
                    res.status(400).send({ message: 'data can not be exceed more than 5' })
                } else {
                    const newinstant = await new skill(data);
                    const eror = await newinstant.validateSync();
                    if (eror) {
                        res.status(400).send({ message: 'validation eror', eror })
                    } else {
                        await User.updateOne({ _id: id }, {
                            $push: { "skills": data }
                        })
                        res.status(201).send({ message: 'added' })
                    }
                }
            }

        } catch (er) { throw er }
    },

    getAllData: async (req, res) => {
        try {
            const id = req.params.userid;
            const userdata = await User.findOne({ _id: id });
            if (userdata) {
                res.status(201).send({ userdata });
            }

        } catch (er) { throw er }
    },

    editeducation: async (req, res) => {
        try {
            const userid = req.params.userid;
            const objectid = req.params.objectid;
            const dat = await req.body;
            console.log(dat);

            const newinstant = await new education(dat);
            const eror = await newinstant.validateSync();
            if (eror) {
                res.status(400).send({ message: 'validation eror', eror })
            } else {
                const data = await User.findById({
                    _id: userid
                });
                const education = data.education[objectid] = req.body
                await data.save();
                res.status(201).send({ message: 'edited' })
            }

        } catch (er) { res.status(501).send({ er }) }
    },

    deleteeducation: async (req, res) => {
        try {
            const id = req.params.userid;
            const objectid = req.params.objectid;

            const data = await User.findById({ _id: id });
            if (data) {
                const education = await data.education;
                education.splice(objectid, 1);
                await data.save();
                res.status(201).send({message:'education is deleted'})
            }

        } catch (er) { throw er }
    },


    editexperience: async (req, res) => {
        try {
            const userid = req.params.userid;
            const objectid = req.params.objectid;
            const dat = await req.body;
            const newinstant = await new experience(dat);
            const eror = await newinstant.validateSync();
            if (eror) {
                res.status(400).send({ message: 'validation eror', eror })
            } else {
                const data = await User.findById({
                    _id: userid
                });
                const experience = data.experience[objectid] = req.body
                await data.save();
                res.status(201).send({ message: 'edited' })
            }

        } catch (er) { res.status(501).send({ er }) }
    },


    deletexperience: async (req, res) => {
        try {
            const id = req.params.userid;
            const objectid = req.params.objectid;

            const data = await User.findById({ _id: id });
            if (data) {
                const experience = await data.experience;
                experience.splice(objectid, 1);
                await data.save();
                res.status(201).send({message:'experience is deleted'})
            }

        } catch (er) { throw er }
    },


    editskill: async (req, res) => {
        try {
            const userid = req.params.userid;
            const objectid = req.params.objectid;
            const dat = await req.body;
            const newinstant = await new skill(dat);
            const eror = await newinstant.validateSync();
            if (eror) {
                res.status(400).send({ message: 'validation eror', eror })
            } else {
                const data = await User.findById({
                    _id: userid
                });
                 data.skills[objectid] = req.body
                await data.save();
                res.status(201).send({ message: 'edited' })
            }

        } catch (er) { res.status(501).send({ er }) }
    },


    deleteskill: async (req, res) => {
        try {
            const id = req.params.userid;
            const objectid = req.params.objectid;

            const data = await User.findById({ _id: id });
            if (data) {
                const skil = await data.skills;
                skil.splice(objectid, 1);
                await data.save();
                res.status(201).send({message:'skill is deleted'})
            }

        } catch (er) { throw er }
    },

}

module.exports = makeResume;