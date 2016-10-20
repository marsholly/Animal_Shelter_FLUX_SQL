import React, { Component } from 'react';
import AnimalActions from '../actions/AnimalActions';
import AnimalStore from '../stores/AnimalStore';
import FormModal from './FormModal';


export default class CheckAnimal extends Component {
  constructor() {
    super();
    this.state = {
      client: AnimalStore.getOneAnimal(),
      id: ''
    }
  }

  componentWillMount() {
    let id = this.props.location.query.clientId;
    AnimalActions.getOneAnimal(id);
    AnimalStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    AnimalStore.stopListening(this._onChange);
  }

  _onChange = () => {
    this.setState({ client: AnimalStore.getOneAnimal() });
  }

  getAnimalId = (id) => {
    this.setState({id});
  }

  _submitForm = (newInfo) => {
    let { id } = this.state;
    let {phoneNumber} = newInfo;
    newInfo.phoneNumber = Number(phoneNumber);
    AnimalActions.updateAnimalInfo(id, newInfo);
  }

  render() {
    let { client } = this.state;
    if (client) {
      let {clientName, clientGender, clientImg, address, phoneNumber, id} = client;
      let modalId = 'EditAnimalModal';
      let schema = {
        clientName: {type: 'text', label: 'Name', required:true},
        clientGender:{type:'text', label: 'Gender', required: true},
        phoneNumber: {type: 'number', label: 'Phone Number: ', required: true},
        clientImg: {type: 'text', label: 'Image URL:', required: true},
        address: {type: 'text', label: 'Address', required: true}
      }
      return (
        <div className="container">
          <div className="col s12 m7">
            <h2 className="header text-center">Personal Information Card</h2>
            <div className="card horizontal personalCard">
              <div className="card-image">
                <img src={clientImg} width='180' height='300' />
              </div>
              <div className="card-stacked">
                <div className="card-content">
                  <h2>NAME :  {clientName}</h2>
                  <hr/>
                  <h4>GENDER : { clientGender === 'male' ? <img src="http://findicons.com/files/icons/438/dating/256/male.png" width="30" height="30"/> : <img src="http://findicons.com/files/icons/438/dating/256/female.png" width="30" height="30"/>}</h4>
                  <h4>ADDRESS :  {address}</h4>
                  <h4>PHONENO :  {phoneNumber}</h4>
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
