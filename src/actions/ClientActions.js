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
  },
  updateClientInfo(id, newInfo) {
    API.updateClientInfo(id, newInfo);
  },
  removeClient(id) {
    API.removeClient(id);
  },
  updateClient(id, newInfo) {
    API.updateClient(id, newInfo);
  }
}

export default ClientActions;
