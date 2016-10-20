import React, { Component } from 'react';
import AnimalActions from '../actions/AnimalActions';
// import ClientActions from '../actions/ClientActions';
import AnimalStore from '../stores/AnimalStore';
// import ClientStore from '../stores/ClientStore';
import FormModal from './FormModal';
import {Dropdown, NavItem} from 'react-materialize';


export default class HasOwnerAnimals extends Component {
  constructor() {
    super();
    this.state = {
      animals: AnimalStore.getAllAdoptAnimal()
      // clients: ClientStore.getAllClients()
    }
  }

  componentWillMount() {
    AnimalActions.getAllHasOwnerPets();
    // ClientActions.getAllClients();
    AnimalStore.startListening(this._onChange);
    // ClientStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    AnimalStore.stopListening(this._onChange);
    // ClientStore.stopListening(this._onChange);
  }

  _onChange = () => {
    this.setState({
      animals: AnimalStore.getAllAdoptAnimal()
      // clients: ClientStore.getAllClients()
     });
  }

  render() {
    let { animals } = this.state;
    let animalBlock;
    if (animals) {
        animalBlock = animals.map((animal,index) => {
        let {petName, petImg, clientName, clientImg} = animal;
        return (
          <div className="col s12 m3 clientBl" key={index}>
            <div className="card small">
              <div className="card">
                <div className="card-image">
                  <img src={clientImg} width="200" height="160"/>
                </div>
                <div className="card-content animalContent">
                  <p>Client Name: {clientName}</p>
                  <p>Pet Name: {petName}</p>
                  <img src={petImg} width="200" height="160"/>
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
        <h2 className="header text-center">Animals Adopted</h2>
        <div className="row">
          {animalBlock}
        </div>
      </div>
    )
  }
};
