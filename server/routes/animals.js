const express = require('express');
const router = new express.Router();

const Animal = require('../models/animal');

router.route('/')
  .get((req, res) => {
    Animal.getAllPets()
      .then(animals => res.send(animals))
      .catch(err => res.status(400).send(err))
 })
  .post((req, res) => {
    Animal.createOnePet(req.body)
      .then(Animal.getAll)
      .then(animals => res.send(animals))
      .catch(err => res.status(400).send(err))
  })

router.route('/hasOwner')
  .get((req, res) => {
    Animal.getAllHasOwnerPets()
      .then(animals => res.send(animals))
      .catch(err => res.status(400).send(err))
  })

router.route('/someOwnerPets')
  .get((req, res) => {
    Animal.getSomeOwnerPets()
      .then(animals => res.send(animals))
      .catch(err => res.status(400).send(err))
  })

router.route('/:id')
  .get((req, res) => {
    Animal.getOnePet(req.params.id)
      .then(animal => res.send(animal))
      .catch(err => res.status(400).send(err))
  })
  .delete((req, res) => {
    Animal.deleteOnePet(req.params.id)
      .then(Animal.getAll)
      .then(animals => res.send(animals))
      .catch(err => res.status(400).send(err))
  })
  .put((req, res) => {
    Animal.updateOnePet(req.params.id, req.body)
      .then(Animal.getAll)
      .then(animals => res.send(animals))
      .catch(err => res.status(400).send(err))
  })



module.exports = router;
