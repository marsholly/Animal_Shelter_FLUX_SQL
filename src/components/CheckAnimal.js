import React, { Component } from 'react';
import AnimalActions from '../actions/AnimalActions';
import AnimalStore from '../stores/AnimalStore';
import FormModal from './FormModal';


export default class CheckAnimal extends Component {
  constructor() {
    super();
    this.state = {
      animal: AnimalStore.getOneAnimal(),
      id: ''
    }
  }

  componentWillMount() {
    let id = this.props.location.query.animalId;
    AnimalActions.getOneAnimal(id);
    AnimalStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    AnimalStore.stopListening(this._onChange);
  }

  _onChange = () => {
    this.setState({ animal: AnimalStore.getOneAnimal() });
  }

  getAnimalId = (id) => {
    this.setState({id});
  }

  _submitForm = (newInfo) => {
    let { id } = this.state;
    AnimalActions.updateAnimalInfo(id, newInfo);
  }

  render() {
    let { animal } = this.state;
    if (animal) {
      let {petName, petGender, petImg, petAge, breed, size, color, id} = animal;
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
      return (
        <div className="container">
          <div className="col s12 m7">
            <h2 className="header text-center">Animal Information Card</h2>
            <div className="card horizontal personalCard">
              <div className="card-image">
                <img src={petImg} width='100' height='360' />
              </div>
              <div className="card-stacked">
                <div className="card-content">
                  <h2>NAME :  {petName}</h2>
                  <hr/>
                  <h4>GENDER : { petGender === 'male' ? <img src="http://findicons.com/files/icons/438/dating/256/male.png" width="30" height="30"/> : <img src="http://findicons.com/files/icons/438/dating/256/female.png" width="30" height="30"/>}</h4>
                  <h4>AGE :  {petAge}</h4>
                  <h4>BREED :  {breed}</h4>
                  <h4>SIZE :  {size}</h4>
                  <h4>COLOR :  {color}</h4>
                </div>
                <div className="card-action text-center">
                  <a data-toggle='modal' data-target={'#'+ modalId} onClick={() => this.getAnimalId(id)}>EDIT</a>
                </div>
              </div>
            </div>
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
    else {
      return <div></div>
    }
  }
};
