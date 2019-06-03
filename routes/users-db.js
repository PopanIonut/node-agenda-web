var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var pool = mysql.createPool({
  host : 'localhost',
  user : 'root',
  password : '',
  database : 'agenda'
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  pool.getConnection((err, connection) =>  {
    const sql =  `SELECT * FROM contacts`;
    connection.query(sql, (err, results) => {
      res.json(results);
      connection.release();
    });
  });
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

  pool.getConnection((err, connection) =>  {
    const sql = `DELETE FROM contacts WHERE contacts.id = ${id}`;
    console.log(sql);

    connection.query(sql, (err, results) => {
      res.json({
        success: true,
        id,
        message: 'Done!'
      });
      connection.release();
    });
  });
});


router.put('/update', function(req, res, next) {
  const id = req.body.id;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const phone = req.body.phone;
console.warn('update', id, firstName, lastName, phone);

pool.getConnection((err, connection) =>  {
  //TO DO
  const sql = `UPDATE contacts SET firstName = '${firstName}', lastName = '${lastName}', phone = '${phone}' WHERE id = ${id}`;
  console.log(sql);

  connection.query(sql, (err, results) => {
    res.json({
      success: true,
      id,
      message: 'TO DO'
    });
    });
    connection.release();
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
