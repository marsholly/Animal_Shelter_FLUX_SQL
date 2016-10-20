import React, { Component } from 'react'

export default class FormGroup extends Component {
  render() {
    let { value, label, type = 'text', required = false, onInputChange } = this.props;

    let Label = label && <label>{label}</label>;

    return (
      <div className="form-group">
        { Label }
        <input type={type}
               className="form-control"
               value={value}
               required={required}
               onChange={onInputChange}
               />
      </div>
    )
  }
}
