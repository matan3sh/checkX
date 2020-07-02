const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Checklist = require('../models/Checklist');

// @route   GET api/checklist
// @desc    Get all users checklist
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const checklists = await Checklist.find({ user: req.user.id }).sort({
      createdAt: -1
    });
    res.json(checklists);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/checklist
// @desc    Add new checklist
// @access  Private
router.post(
  '/',
  [auth, [check('name', 'Name is Required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, type } = req.body;
    try {
      const newChecklist = new Checklist({
        name,
        type,
        user: req.user.id
      });
      const checklist = await newChecklist.save();
      res.json(checklist);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/checklist/:id
// @desc    Update checklist
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { name, type, list } = req.body;

  // Build checklist object
  const checklistFields = {};
  if (name) checklistFields.name = name;
  if (type) checklistFields.type = type;
  if (list) checklistFields.list = list;

  try {
    let checklist = await Checklist.findById(req.params.id);

    if (!checklist) return res.status(404).json({ msg: 'Checklist not found' });

    // Make sure user owns checklist
    if (checklist.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    checklist = await Checklist.findByIdAndUpdate(
      req.params.id,
      { $set: checklistFields },
      { new: true }
    );

    res.json(checklist);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/checklist/:id
// @desc    Delete checklist
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let checklist = await Checklist.findById(req.params.id);
    if (!checklist) return res.status(404).json({ msg: 'Checklist not found' });

    // Make sure user owns checklist
    if (checklist.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    await Checklist.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Checklist removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
