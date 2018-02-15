const app = require('express').Router();
const db = require('../db');
const { People } = db.models;

// send routes to server file
module.exports = app;

app.get('/', (req, res, next) => {
  People.findAll()
    .then(people => res.render('people', { people } ))
    .catch(next);
});

app.post('/', (req, res, next) => {
  People.create(req.body)
    .then(() => res.redirect('/'))
    .catch(next);
});

app.delete('/:id', (req, res, next) => {
  People.findById(req.params.id)
    .then(person => person.destroy())
    .then(() => res.redirect('/'))
    .catch(next);
});

app.put('/:id', (req, res, next) => {
  People.findById(req.params.id)
    .then(person => {
      Object.assign(person, req.body);
      return person.save();
    })
    .then(() => res.redirect('/'))
    .catch(next);
});
