const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const Team = require('../../models/Team');
const Eval = require('../../models/Eval');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const config = require('config');
const TotalPoints = require('../../models/TotalPoints');

router.get('/', auth, async (req, res) => {
  try {
    console.log(req.team.id);
    const name = await Team.findById(req.team.id);
    const eval = await Eval.find({ teamName: name.teamName });
    res.json(eval);
    console.log('Result of eval');
    console.log(eval);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/leaderboard', auth, async (req, res) => {
  try {
    console.log('sdfasd');
    const result = await Eval.aggregate([
      { $group: { _id: '$teamName', total: { $sum: '$points' } } },
      { $sort: { total: -1 } },
    ]);
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
