import AppDispatcher from '../AppDispatcher';
import { EventEmitter } from 'events';

let _animals = [];
let _animal = [];

class AnimalStore extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(action => {
      switch (action.type) {
        case 'RECEIVE_ALL_ANIMALS':
          let { animals } = action.payload;
          _animals = animals.filter(animal => {
            return animal.ownerId === null
          })
          this.emit('CHANGE');
          break;
        case 'RECEIVE_ONE_ANIMAL':
          _animal = action.payload.animal;
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

  getAllAnimals() {
    return _animals;
  }

  getOneAnimal() {
    return _animal;
  }
}

export default new AnimalStore();
