const express = require('express');

const router = new express.Router();

const Client = require('../models/client');

router.route('/')
  .get((req, res) => {
    Client.getAllClients()
      .then(clients => res.send(clients))
      .catch(err => res.status(400).send(err))
 })
  .post((req, res) => {
    Client.createOneClient(req.body)
      .then(Client.getAll)
      .then(clients => res.send(clients))
      .catch(err => res.status(400).send(err))
  })

router.route('/:id')
  .get((req, res) => {
    Client.getOneClient(req.params.id)
      .then(client => res.send(client))
      .catch(err => res.status(400).send(err))
  })
  .delete((req, res) => {
    Client.deleteOneClient(req.params.id)
      .then(Client.getAll)
      .then(clients => res.send(clients))
      .catch(err => res.status(400).send(err))
  })
  .put((req, res) => {
    Client.updateOneClient(req.params.id, req.body)
      .then(Client.getAll)
      .then(clients => res.send(clients))
      .catch(err => res.status(400).send(err))
  })

module.exports = router;
