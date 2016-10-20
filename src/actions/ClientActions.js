import API from '../API';

const ClientActions = {
  getAllClients() {
    API.getAllClients();
  },
  createNewClient(newClient) {
    API.createNewClient(newClient);
  },
  getOneClient(id) {
    API.getOneClient(id);
  }

}

export default ClientActions;
