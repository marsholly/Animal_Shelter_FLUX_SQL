import React, { Component } from 'react';
import AnimalActions from '../actions/AnimalActions';
import AnimalStore from '../stores/AnimalStore';
import FormModal from './FormModal';


export default class AnimalsList extends Component {
  constructor() {
    super();
    this.state = {
      animals: AnimalStore.getAllAnimals(),
      id: ''
    }
  }

  componentWillMount() {
    AnimalActions.getAllAnimals();
    AnimalStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    AnimalStore.stopListening(this._onChange);
  }

  _onChange = () => {
    this.setState({ animals: AnimalStore.getAllAnimals() });
  }

  getAnimalId = (id) => {
    this.setState({id});
  }

  _submitForm = (newInfo) => {
    let { id } = this.state;
    AnimalActions.updateAnimal(id, newInfo);
  }

  removeAnimal = (id) => {
    AnimalActions.removeAnimal(id);
  }

  render() {
    let { animals } = this.state;
    let modalId = 'EditAnimalModal';
    let schema = {
      petName: {type: 'text', label: 'Name', required:true},
      petGender:{type:'text', label: 'Gender', required: true},
      petImg: {type: 'text', label: 'Image URL:', required: true},
      petAge: {type: 'text', label: 'Age:', required: true},
      breed: {type: 'text', label: 'Breed:', required: true},
      size: {type: 'text', label: 'Size:', required: true},
      color: {type: 'text', label: 'Color', required: true}
    }
    let animalBlock;
    if (animals) {
        animalBlock = animals.map(animal => {
        let {petName, petGender, petImg, petAge, breed, size, color, id} = animal;
        return (
          <div className="col s12 m3 clientBl" key={id}>
            <div className="card small">
              <div className="card">
                <div className="card-image">
                  <img src={petImg} width="200" height="160"/>
                </div>
                <div className="card-content animalContent">
                  <p className="name">{ petGender === 'male' ? <img src="http://findicons.com/files/icons/438/dating/256/male.png" width="30" height="30"/> : <img src="http://findicons.com/files/icons/438/dating/256/female.png" width="30" height="30"/>} {petName} </p>
                  <br/>
                  <p>Age: {petAge}</p>
                  <p>Breed: {breed}</p>
                  <p>Size: {size}</p>
                  <p>Color: {color}</p>
                </div>
                <div className="card-action text-center">
                  <a data-toggle='modal' data-target={'#'+ modalId} onClick={() => this.getAnimalId(id)}>EDIT</a>
                  <a onClick={() => this.removeAnimal(id)}>DELETE</a>
                  <a onClick={() => this.adopt(id)}><i className="material-icons">child_friendly</i></a>
                </div>
              </div>
            </div>
          </div>
        )
      })
    } else {
      animalBlock = <div></div>
    }
    return (
      <div className="container">
        <h2 className="header text-center">Animals Information</h2>
        <div className="row">
          {animalBlock}
        </div>
        <FormModal
          modalId={modalId}
          title={'Update AnimalInfo'}
          submitForm={this._submitForm}
          schema = {schema}
        />
      </div>
    )
  }
};
