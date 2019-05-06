var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/add', function(req, res, next) {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var phone = req.body.phone;

  var persons = require('../public/data/persons.json');

  const id = new Date().getTime();

  persons.push({
    id,
    firstName,
    lastName,
    phone
  })


  var str = JSON.stringify(persons, null, 2);
  fs.writeFileSync('./public/data/persons.json', str);

  res.json({
    success: true,
    id,
    message: 'TO DO'
  });
});

router.delete('/delete', function(req, res, next) {
  var id = req.body.id;
  console.warn ('remove person', id)

  var persons = require('../public/data/persons.json');

  var remainingPersons = persons.filter(function(person) {
    return person.id != id;
  });


  var str = JSON.stringify(remainingPersons, null, 2);
  fs.writeFileSync('./public/data/persons.json', str);

  res.json({
    success: true,
    id,
    message: 'Done!'
  });
});




module.exports = router;
