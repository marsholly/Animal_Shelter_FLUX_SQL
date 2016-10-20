import React, { Component } from 'react';
import AnimalActions from '../actions/AnimalActions';
import AnimalStore from '../stores/AnimalStore';

export default class PetsPage extends Component {
  constructor() {
    super();
    this.state = {
      animals: AnimalStore.getAllAdoptAnimal(),
      id: ''
    }
  }

  componentDidUpdate(preProps, prevState) {
    AnimalActions.getAllHasOwnerPets();
    return true
  }

  componentWillMount() {
    AnimalActions.getAllHasOwnerPets();
    AnimalStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    AnimalStore.stopListening(this._onChange);
  }

  _onChange = () => {
    this.setState({
      animals: AnimalStore.getAllAdoptAnimal()
     });
  }

  abandonPet = (pet) => {
    let updateAnimal = {
      petName: pet.petName,
      petAge: pet.petAge,
      petGender: pet.petGender,
      petImg: pet.petImg,
      breed: pet.breed,
      size: pet.size,
      id: pet.petId,
      color: pet.color,
      ownerId: null
    }
    let id = pet.petId;
    AnimalActions.updateAnimalInfo(id, updateAnimal);
  }

  render() {
    let { animals } = this.state;
    let id = this.props.location.query.ownerId;
    let pets, petsRow;
    if(animals) {
      pets = animals.filter(animal => {
        return animal.ownerId === id;
      })

      petsRow = pets.map((pet, index) => {
        let {petName, petGender, petImg, petAge, breed, size, color, petId} = pet;
        return (
          <tr key={index}>
            <td><img src={petImg} width="120" height="100"/></td>
            <td>{petName}</td>
            <td>{ petGender === 'male' ? <img src="http://findicons.com/files/icons/438/dating/256/male.png" width="30" height="30"/> : <img src="http://findicons.com/files/icons/438/dating/256/female.png" width="30" height="30"/>}</td>
            <td>{petAge}</td>
            <td>{breed}</td>
            <td>{size}</td>
            <td>{color}</td>
            <td><a onClick={() => this.abandonPet(pet)}><i className="material-icons">remove_shopping_cart</i></a></td>
          </tr>
        )
      })
    } else {
      petsRow = <tr></tr>
    }
    return (
      <div className="container">
        <h2 className="header text-center">Animals Adopted</h2>
        <div className="row">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Age</th>
                <th>breed</th>
                <th>size</th>
                <th>color</th>
                <th>abandon</th>
              </tr>
            </thead>
            <tbody>
              {petsRow}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
};
