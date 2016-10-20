import React, { Component } from 'react'
import $ from 'jquery'

import FormGroup from './FormGroup'

export default class FormModal extends Component {
  constructor() {
    super();

    this.state = {};

    this._submit = this._submit.bind(this);
    this._onInputChange = this._onInputChange.bind(this);
  }

  componentWillMount() {
    let { schema } = this.props;

    let formData = {};

    for(let key in schema) {
      formData[key] = '';
    }

    this.setState({formData});
  }

  _submit(e) {
    e.preventDefault();
    let { formData } = this.state;
    let { modalId } = this.props;
    this.props.submitForm(formData);
    $(`#${modalId}`).modal('hide');
  }

  _onInputChange(key, { target }) {
    let { value } = target;
    let formData = Object.assign({}, this.state.formData, { [key]: value })
    this.setState({ formData })
  }

  render() {
    let { title, schema, modalId } = this.props;

    let FormGroups = Object.keys(schema).map(key => {
      return (
        <FormGroup key={key}
                   value={this.state.formData[key]}
                   onInputChange={this._onInputChange.bind(null, key)}
                   {...schema[key]} />
      )
    })

    return (
      <div className="modal fade" id={modalId} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog" role="document">
          <form onSubmit={this._submit}>
            
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title">{title}</h4>
              </div>
              <div className="modal-body">

                {FormGroups}
                  
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary">Save</button>
              </div>
            </div>

          </form>
        </div>
      </div>
    )
  }
}
