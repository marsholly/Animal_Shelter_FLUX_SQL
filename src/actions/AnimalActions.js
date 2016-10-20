import API from '../API';

const AnimalActions = {
  getAllAnimals() {
    API.getAllAnimals();
  },
  createNewAnimal(newAnimal) {
    API.createNewAnimal(newAnimal);
  },
  getOneAnimal(id) {
    API.getOneAnimal(id);
  },
  updateAnimalInfo(id, newInfo) {
    API.updateAnimalInfo(id, newInfo);
  },
  removeAnimal(id) {
    API.removeAnimal(id);
  },
  updateAnimal(id, newInfo) {
    API.updateAnimal(id, newInfo);
  }
}

export default AnimalActions;
