const {Router} = require('express');
const recruitersController = require('../controllers/recruiters.controller');
const jwtValidator = require('../middlewares/jwtValidator');
const checkFields = require('../middlewares/validateFields');
const { check } = require("express-validator");

const router = Router();

router.get('/', [
    check('jwt').not().isEmpty(),
    checkFields
],
jwtValidator, recruitersController.getRecruiters); //GET RECRUITERS

router.post('/', [
    
    check('recruiters.name').not().isEmpty(),
    check('recruiters.email').not().isEmpty(),
    check('recruiters.phone').not().isEmpty(),
    checkFields,
], recruitersController.createRecruiter); //POST RECRUITER

module.exports = router;