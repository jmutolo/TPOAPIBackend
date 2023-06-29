const RecruitersService = require("../services/recruiters.service");
let instance = null;

class RecruitersController {
    static getInstance() {
        if(!instance) {
            return new RecruitersController();
        }
        return instance;
    }

    async getRecruiters(req, res) {
        try {
            const recruiters = await RecruitersService.getRecruiters();
            return res.status(200).json(recruiters);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                method: "getRecruiters",
                message: err,
            });
        }
    }

    async createRecruiter(req, res) {
        try {
            const {recruiters} = req.body;
            let isEmailRegistered = await RecruitersService.isRecruiterRegistered(
                recruiters.email
            );
            if(!isEmailRegistered) {
                let newRecruiter = await RecruitersService.createRecruiter(recruiters);

                return res.status(201).json ({
                    message: "Recruiter Created!",
                    recruiters: newRecruiter,
                });
            }
            return res.status(400).json({
                message: "El email ya esta registrado",
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                method: "createRecruiter",
                message: err.message,
            });
        }
    }
}

module.exports = new RecruitersController();
