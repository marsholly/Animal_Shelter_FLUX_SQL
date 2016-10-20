const db = require('../config/db');
const squel = require('squel');

db.query(`CREATE TABLE IF NOT EXISTS CLIENTS(
  id varchar(50),
  clientName varchar(100),
  clientGender varchar(50),
  clientImg varchar(500),
  address varchar(500),
  phoneNumber int,
  primary key (id)
)`, err => {
  if(err) throw new Error(err);
})

exports.getAllClients = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM CLIENTS', (err, clients) => {
      if (err) return reject(err);
      resolve(clients);
    })
  })
}

exports.createOneClient = (client) => {
  return new Promise((resolve, reject) => {
    let sql = squel.insert().into('CLIENTS').setFields(client).toString();
    db.query(sql, (err, clients) => {
      if (err) return reject(err);
      resolve('success');
    })
  })
}

exports.getOneClient = (id) => {
  return new Promise((resolve, reject) => {
    let sql = squel.select().from('CLIENTS').where('id = ?', id).toString();
    db.query(sql, (err, clients) => {
      let client = clients[0];
      if (err) return reject(err);
      else if (!client) return reject({error: 'client not found.'});
      resolve(client);
    })
  })
}

exports.deleteOneClient = (id) => {
  return new Promise((resolve, reject) => {
    let sql = squel.delete().from('CLIENTS').where('id = ?', id).toString();
    db.query(sql, (err, result) => {
      if (result.affectedRows === 0) reject({error: 'The client not found.'});
      else if (err) reject(err);
      resolve('done');
    })
  })
}

exports.updateOneClient = (id, updateObj) => {
  return new Promise((resolve, reject) => {
    let sql = squel.update().table('CLIENTS').setFields(updateObj).where('id = ?', id).toString();
    db.query(sql, (err, result) => {
      if (err) return reject(err);
      resolve('ok');
    })
  })
}
