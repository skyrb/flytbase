const express = require('express');
const router = express.Router();
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const siteRouter = require('./siteRouter');
const droneRouter = require('./droneRouter');
const categoryRouter = require('./categoryRouter');
const missionRouter = require('./missionRouter');


router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/site', siteRouter);
router.use('/drone', droneRouter);
router.use('/category', categoryRouter);
router.use('/mission', missionRouter);

module.exports = router;