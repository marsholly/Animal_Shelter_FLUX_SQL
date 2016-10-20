import AppDispatcher from '../AppDispatcher';

const ServerActions = {
  receiveAllClients(clients) {
    AppDispatcher.dispatch ({
      type: 'RECEIVE_ALL_CLIENTS',
      payload: {clients}
    })
  },
  receiveOneClient(client) {
    AppDispatcher.dispatch ({
      type: 'RECEIVE_ONE_CLIENT',
      payload: {client}
    })
  }
  
}

export default ServerActions;
