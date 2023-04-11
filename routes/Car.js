var express = require('express');

const car_controlers= require('../controllers/car');
var router = express.Router();

router.get('/', car_controlers.car_view_all_Page );
module.exports = router;