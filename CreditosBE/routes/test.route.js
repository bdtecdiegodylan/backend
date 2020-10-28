// require others
const { Router } = require('express');
const router = Router();

// require class
const TestController = require('../controller/test.controller');
const testController = new TestController();

router.get('/', testController.getMsj);

module.exports = router;