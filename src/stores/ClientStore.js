import AppDispatcher from '../AppDispatcher';
import { EventEmitter } from 'events';

let _clients = [];
let _client = [];

class ClientStore extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(action => {
      switch (action.type) {
        case 'RECEIVE_ALL_CLIENTS':
          _clients = action.payload.clients;
          this.emit('CHANGE');
          break;
        case 'RECEIVE_ONE_CLIENT':
          _client = action.payload.client;
          this.emit('CHANGE');
          break;
      }
    })
  }

  startListening(cb) {
    this.on('CHANGE', cb);
  }

  stopListening(cb) {
    this.removeListener('CHANGE', cb);
  }

  getAllClients() {
    return _clients;
  }

  getOneClient() {
    return _client;
  }
}

export default new ClientStore();
