import React, { Component } from 'react';
import AnimalActions from '../actions/AnimalActions';
import AnimalStore from '../stores/AnimalStore';
import FormModal from './FormModal';
import {Dropdown, NavItem} from 'react-materialize';


export default class HasOwnerAnimals extends Component {
  constructor() {
    super();
    this.state = {
      animals: AnimalStore.getAllAdoptAnimal()
    }
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
                  <img className="imgArea" src={petImg} width="200" height="160"/>
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


// 
// <Card header={<CardTitle reveal image={"assets/office.jpg"} waves='light'/>}
//   title="Card Title"
//   reveal={<p>Here is some more information about this product that is only revealed once clicked on.</p>}>
//   <p><a href="#">This is a link</a></p>
// </Card>
