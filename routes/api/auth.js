const express = require('express');
const router = express.Router();

const authController = require('../../controllers/api/authControllerAPI');
const passport = require('passport');

router.post('/authenticate', authController.authenticate);
router.post('/forgotPassword', authController.forgotPassword);

module.exports = router;