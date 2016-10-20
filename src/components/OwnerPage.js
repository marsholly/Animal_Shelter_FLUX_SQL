import React, { Component } from 'react';
import AnimalActions from '../actions/AnimalActions';
import AnimalStore from '../stores/AnimalStore';
import FormModal from './FormModal';
import {browserHistory} from 'react-router';

export default class OwnerPage extends Component {
  constructor() {
    super();
    this.state = {
      owners: AnimalStore.getAllOwner()
    }
  }

  componentWillMount() {
    AnimalActions.getAllOwnerPets();
    AnimalStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    AnimalStore.stopListening(this._onChange);
  }

  _onChange = () => {
    this.setState({
      owners: AnimalStore.getAllOwner()
     });
  }

  viewPets = (ownerId) => {
    browserHistory.push({pathname: '/pets', query:{ownerId: ownerId}})
  }

  render() {
    let { owners } = this.state;
    let ownerBlock;
    if (owners) {
      ownerBlock = owners.map( owner => {
        let {clientName, clientGender, clientImg, address, phoneNumber, ownerId} = owner;
        return (
          <div className="col s12 m3 clientBl" key={ownerId}>
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
                  <a onClick={() => this.viewPets(ownerId)}>PETS</a>
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
        <h2 className="header text-center">Owner Information</h2>
        <div className="row">
          {ownerBlock}
        </div>
      </div>
    )
  }
};
