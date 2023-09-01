const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.post('/', userController.create);

module.exports = router;
