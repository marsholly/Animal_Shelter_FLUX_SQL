import React, { Component } from 'react';


export default class NewClient extends Component {

  render() {
    return (
      <div className="container">
        <div className="text-center">
          <div className="clientForm">
            <h4>New Client Info</h4>
            <div className="row">
              <form onSubmit=''>
                <div className="input-field col s6">
                  <i className="material-icons prefix">account_box</i>
                  <input type="text" className="validate" />
                  <label>First Name</label>
                </div>
                <div className="input-field col s6">
                  <input type="text" className="validate" />
                  <label>Last Name</label>
                </div>
                <div className="input-field col s8">
                  <i className="material-icons prefix">phone</i>
                  <input type="number" className="validate"/>
                  <label>Phone</label>
                </div>
                <div className="switch input-field col s4">
                  <label className="gender">
                    Male
                    <input type="checkbox" />
                    <span className="lever"></span>
                    Female
                  </label>
                </div>
                <div className="input-field col s12">
                  <i className="material-icons prefix">face</i>
                  <input type="text" className="validate"/>
                  <label>Photo</label>
                </div>
                <div className="input-field col s12">
                  <i className="material-icons prefix">add_location</i>
                  <input type="text" className="validate"/>
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
