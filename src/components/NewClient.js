import React, { Component } from 'react';
import {Input} from 'react-materialize';
import ClientActions from '../actions/ClientActions';
import uuid from 'uuid';
import {browserHistory} from 'react-router';

export default class NewClient extends Component {
  constructor() {
    super();
    this.state = {
      gender: ''
    }
  }

  pickGender = (e) => {
    let gender = e.target.value
    this.setState({gender});
  }

  _onSubmit = (e) => {
    e.preventDefault();
    let firstName = this.refs.firstName.value;
    let lastName = this.refs.lastName.value;
    let clientName = firstName + ',' + lastName;
    let phoneNumber = Number(this.refs.phone.value);
    let clientImg = this.refs.pic.value;
    let address = this.refs.address.value;
    let clientGender = this.state.gender;

    let newClient = {
      clientName,
      phoneNumber,
      clientImg,
      address,
      clientGender,
      id: uuid()
    }
    ClientActions.createNewClient(newClient);
    browserHistory.push({pathname: '/oneClientInfo', query:{clientId: newClient.id}})
  }

  render() {
    return (
      <div className="container">
        <div className="text-center">
          <div className="clientForm">
            <h4>New Client Info</h4>
            <div className="row">
              <form onSubmit={this._onSubmit}>
                <div className="input-field col s6">
                  <i className="material-icons prefix">account_box</i>
                  <input type="text" className="validate" ref="firstName"/>
                  <label>First Name</label>
                </div>
                <div className="input-field col s6">
                  <input type="text" className="validate" ref="lastName"/>
                  <label>Last Name</label>
                </div>
                <div className="input-field col s8">
                  <i className="material-icons prefix">phone</i>
                  <input type="number" className="validate" ref="phone"/>
                  <label>Phone</label>
                </div>
                <div className="col s4">
                  <div className="genderRadio">
                    <Input name='gender' type='radio' value='male' label='Male' onClick={this.pickGender}/>
                    <Input name='gender' type='radio' value='female' label='Female' onClick={this.pickGender}/>
                  </div>
                </div>
                <div className="input-field col s12">
                  <i className="material-icons prefix">face</i>
                  <input type="text" className="validate" ref="pic"/>
                  <label>Photo</label>
                </div>
                <div className="input-field col s12">
                  <i className="material-icons prefix">add_location</i>
                  <input type="text" className="validate" ref="address"/>
                  <label>Address</label>
                </div>
                <div className="col s12">
                  <button className="btn waves-effect orange waves-light" type="submit" name="action">Submit
                    <i className="material-icons right">send</i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
};
