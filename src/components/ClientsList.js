import React, { Component } from 'react';
import ClientActions from '../actions/ClientActions';
import ClientStore from '../stores/ClientStore';
import FormModal from './FormModal';


export default class ClientsList extends Component {
  constructor() {
    super();
    this.state = {
      clients: ClientStore.getAllClients(),
      id: ''
    }
  }

  componentWillMount() {
    ClientActions.getAllClients();
    ClientStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    ClientStore.stopListening(this._onChange);
  }

  _onChange = () => {
    this.setState({ clients: ClientStore.getAllClients() });
  }

  getClientId = (id) => {
    this.setState({id});
  }

  _submitForm = (newInfo) => {
    let { id } = this.state;
    let {phoneNumber} = newInfo;
    newInfo.phoneNumber = Number(phoneNumber);
    // ClientActions.updateClientInfo(id, newInfo);
  }

  removeClient = (id) => {
    ClientActions.removeClient(id);
  }

  render() {
    let { clients } = this.state;
    console.log('clients:', clients);
    let modalId = 'EditClientModal';
    let schema = {
      clientName: {type: 'text', label: 'Name', required:true},
      clientGender:{type:'text', label: 'Gender', required: true},
      phoneNumber: {type: 'number', label: 'Phone Number: ', required: true},
      clientImg: {type: 'text', label: 'Image URL:', required: true},
      address: {type: 'text', label: 'Address', required: true}
    }
    let clientBlock;
    if (clients) {
        clientBlock = clients.map(client => {
        let {clientName, clientGender, clientImg, address, phoneNumber, id} = client;
        return (
          <div className="col s12 m3 clientBl" key={id}>
            <div className="card small">
              <div className="card">
                <div className="card-image">
                  <img src={clientImg} width="200" height="160"/>
                </div>
                <div className="card-content clientsContent">
                  <p className="name">{ clientGender === 'male' ? <img src="http://findicons.com/files/icons/438/dating/256/male.png" width="30" height="30"/> : <img src="http://findicons.com/files/icons/438/dating/256/female.png" width="30" height="30"/>} {clientName} </p>
                  <br/>
                  <p>CellPhone :{phoneNumber}</p>
                  <p>{address}</p>
                </div>
                <div className="card-action text-center">
                  <a >EDIT</a>
                  <a onClick={() => this.removeClient(id)}>DELETE</a>
                </div>
              </div>
            </div>
          </div>
        )
      })
    } else {
      clientBlock = <div></div>
    }
    return (
      <div className="container">
        <h2 className="header text-center">Clients Information</h2>
        <div className="row">
          {clientBlock}
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
};
