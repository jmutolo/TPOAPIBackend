const RecruitersModel = require("../models/Recruiters");

class RecruitersService {

    async getRecruiters () {
        try {
            const recruiters = await RecruitersModel.find();
            return recruiters;
        } catch (err) {
            console.error(err);
            throw new Error("Error in getRecruiters service");
        }
    }

    async createRecruiter (recruiter) {
        try {
            let savedRecruiter = await RecruitersModel.create(recruiter);
            return savedRecruiter;
        } catch (err) {
            console.error(err);
            throw new Error("Error en createRecruiter");
        }
    }

    async isRecruiterRegistered (email) {
        try {
            let isEmailRegistered = await RecruitersModel.exists({email});
            if(isEmailRegistered) {
                return true;
            }
            return false;
        } catch (err) {
            console.error(err);
            throw new Error("Error en isRecruiterRegistered - Email existente");

        }
    }

}

module.exports = new RecruitersService();