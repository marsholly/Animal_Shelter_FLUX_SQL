import ServerActions from './actions/ServerActions';
import axios from 'axios';

const API = {
  getAllClients() {
    axios.get('/api/clients/')
      .then(res =>  res.data)
      .then(ServerActions.receiveAllClients)
      .catch(console.error)
  },
  createNewClient(newClient) {
    axios.post('/api/clients/', newClient)
      .then(res =>  res.data)
      .then(this.getAllClients())
      .catch(console.error)
  },
  getOneClient(id) {
    axios.get(`/api/clients/${id}`)
      .then(res =>  res.data)
      .then(ServerActions.receiveOneClient)
      .catch(console.error)
  },
  updateClientInfo(id, newInfo) {
    axios.put(`/api/clients/${id}`, newInfo)
      .then(res =>  res.data)
      .then(this.getOneClient(id))
      .catch(console.error)
  },
  removeClient(id) {
    axios.delete(`/api/clients/${id}`)
      .then(res =>  res.data)
      .then(this.getAllClients())
      .catch(console.error)
  },
  updateClient(id, newInfo) {
    axios.put(`/api/clients/${id}`, newInfo)
      .then(res =>  res.data)
      .then(this.getAllClients())
      .catch(console.error)
  },

  getAllAnimals() {
    axios.get('/api/animals/')
      .then(res =>  res.data)
      .then(ServerActions.receiveAllAnimals)
      .catch(console.error)
  },
  createNewAnimal(newAnimal) {
    axios.post('/api/animals/', newAnimal)
      .then(res =>  res.data)
      .then(this.getAllAnimals())
      .catch(console.error)
  },
  getOneAnimal(id) {
    axios.get(`/api/animals/${id}`)
      .then(res =>res.data)
      .then(ServerActions.receiveOneAnimal)
      .catch(console.error)
  },
  updateAnimalInfo(id, newInfo) {
    axios.put(`/api/animals/${id}`, newInfo)
      .then(res =>  res.data)
      .then(this.getOneAnimal(id))
      .catch(console.error)
  },
  removeAnimal(id) {
    axios.delete(`/api/animals/${id}`)
      .then(res =>  res.data)
      .then(this.getAllAnimals())
      .catch(console.error)
  },
  updateAnimal(id, newInfo) {
    axios.put(`/api/animals/${id}`, newInfo)
      .then(res =>  res.data)
      .then(this.getAllAnimals())
      .catch(console.error)
  },
  getAllHasOwnerPets() {
    axios.get('/api/animals/hasOwner')
      .then(res =>  res.data)
      .then(ServerActions.receivehasOwnerAnimals)
      .catch(console.error)
  },
  getAllOwnerPets() {
    axios.get('/api/animals/someOwnerPets')
      .then(res =>  res.data)
      .then(ServerActions.receiveSomeOwnerAnimals)
      .catch(console.error)
  }
}

export default API;
