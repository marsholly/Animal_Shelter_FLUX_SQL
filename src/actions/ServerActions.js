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
  },

  receiveAllAnimals(animals) {
    AppDispatcher.dispatch ({
      type: 'RECEIVE_ALL_ANIMALS',
      payload: {animals}
    })
  },
  receiveOneAnimal(animal) {
    AppDispatcher.dispatch ({
      type: 'RECEIVE_ONE_ANIMAL',
      payload: {animal}
    })
  },
  receivehasOwnerAnimals(animals) {
    AppDispatcher.dispatch ({
      type: 'RECEIVE_HAS_OWNER_ANIMALS',
      payload: {animals}
    })
  }

}

export default ServerActions;
