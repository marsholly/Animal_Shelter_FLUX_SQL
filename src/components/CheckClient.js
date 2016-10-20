import React, { Component } from 'react';
import ClientActions from '../actions/ClientActions';
import ClientStore from '../stores/ClientStore';
import FormModal from './FormModal';


export default class CheckClient extends Component {
  constructor() {
    super();
    this.state = {
      client: ClientStore.getOneClient(),
      id: ''
    }
  }

  componentWillMount() {
    let id = this.props.location.query.clientId;
    ClientActions.getOneClient(id);
    ClientStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    ClientStore.stopListening(this._onChange);
  }

  _onChange = () => {
    this.setState({ client: ClientStore.getOneClient() });
  }

  getClientId = (id) => {
    this.setState({id});
  }

  _submitForm = (newInfo) => {
    let { id } = this.state;
    let {phoneNumber} = newInfo;
    newInfo.phoneNumber = Number(phoneNumber);
    ClientActions.updateClientInfo(id, newInfo);
  }

  render() {
    let { client } = this.state;
    if (client) {
      let {clientName, clientGender, clientImg, address, phoneNumber, id} = client;
      let modalId = 'EditClientModal';
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
                  <a data-toggle='modal' data-target={'#'+ modalId} onClick={() => this.getClientId(id)}>EDIT</a>
                </div>
              </div>
            </div>
          </div>
          <FormModal
            modalId={modalId}
            title={'Update ClientInfo'}
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
