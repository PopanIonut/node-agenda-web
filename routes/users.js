var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/add', function(req, res, next) {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var phone = req.body.phone;

  console.warn('add', phone, lastName, firstName);
  res.json({
    success: true,
    message: 'TO DO'
  });
});

module.exports = router;
