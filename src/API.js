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
      .then(ServerActions.receiveAllClients)
      .catch(console.error)
  },
  getOneClient(id) {
    axios.get(`/api/clients/${id}`)
      .then(res =>  res.data)
      .then(ServerActions.receiveOneClient)
      .catch(console.error)
  }
}

export default API;
