const db = require('../config/db');
const squel = require('squel');

db.query(`CREATE TABLE IF NOT EXISTS ANIMALS(
  id varchar(50),
  petName varchar(100),
  petAge varchar(50),
  petGender varchar(50),
  petImg varchar(500),
  breed varchar(50),
  size varchar(50),
  color varchar(50),
  ownerId varchar(50),
  primary key (id)
)`, err => {
  if(err) throw new Error(err);
})

exports.getAllPets = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM ANIMALS', (err, animals) => {
      if (err) return reject(err);
      resolve(animals);
    })
  })
}

exports.createOnePet = (animal) => {
  return new Promise((resolve, reject) => {
    let sql = squel.insert().into('ANIMALS').setFields(animal).toString();
    db.query(sql, (err, animals) => {
      if (err) return reject(err);
      resolve('success');
    })
  })
}

exports.getOnePet = (id) => {
  return new Promise((resolve, reject) => {
    let sql = squel.select().from('ANIMALS').where('id = ?', id).toString();
    db.query(sql, (err, animals) => {
      let animal = animals[0];
      if (err) return reject(err);
      else if (!animal) return reject({error: 'animal not found.'});
      resolve(animal);
    })
  })
}

exports.deleteOnePet = (id) => {
  return new Promise((resolve, reject) => {
    let sql = squel.delete().from('ANIMALS').where('id = ?', id).toString();
    db.query(sql, (err, result) => {
      if (result.affectedRows === 0) reject({error: 'The animal not found.'});
      else if (err) reject(err);
      resolve('done');
    })
  })
}

exports.updateOnePet = (id, updateObj) => {
  return new Promise((resolve, reject) => {
    let sql = squel.update().table('ANIMALS').setFields(updateObj).where('id = ?', id).toString();
    db.query(sql, (err, result) => {
      if (err) return reject(err);
      resolve('ok');
    })
  })
}

exports.getAllHasOwnerPets = () => {
  return new Promise((resolve, reject) => {
    let sql = squel.select()
                   .from('ANIMALS')
                   .field('petName')
                   .field('petImg')
                   .field('clientName')
                   .field('clientImg')
                   .join('CLIENTS', null, 'ANIMALS.ownerId = CLIENTS.id')
                   .toString();
    db.query(sql, (err, animals) => {
      if(err) return reject(err);
      resolve(animals);
    })
  })
}
