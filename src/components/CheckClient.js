import React, { Component } from 'react';
import ClientActions from '../actions/ClientActions';
import ClientStore from '../stores/ClientStore';


export default class CheckClient extends Component {
  constructor() {
    super();
    this.state = {
      client: ClientStore.getOneClient()
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

  render() {
    let { client } = this.state;
    console.log('client:', client);
    return (
      <div className="container">

      </div>
    )
  }
};
