import React, { Component } from 'react';
import {Input, Row} from 'react-materialize';
import AnimalActions from '../actions/AnimalActions';
import uuid from 'uuid';
import {browserHistory} from 'react-router';

export default class NewAnimal extends Component {
  constructor() {
    super();
    this.state = {
      petGender: '',
      size: ''
    }
  }

  pickGender = (e) => {
    let petGender = e.target.value;
    this.setState({petGender});
  }

  selectSize = (e) => {
    let size = e.target.value;
    this.setState({size});
  }

  selectColor = (e) => {
    let color = e.target.value;
    this.setState({color});
  }

  _onSubmit = (e) => {
    e.preventDefault();
    let petName = this.refs.name.value;
    let breed = this.refs.breed.value;
    let petAge = this.refs.age.value;
    let petImg = this.refs.pic.value;
    let { petGender, size, color } = this.state;

    let newAnimal = {
      petName,
      petAge,
      petGender,
      petImg,
      breed,
      size,
      color,
      id: uuid()
    }

    AnimalActions.createNewAnimal(newAnimal);
    browserHistory.push({pathname: '/newAnimalInfo', query:{animalId: newAnimal.id}})
  }

  render() {
    return (
      <div className="container">
        <div className="text-center">
          <div className="clientForm">
            <h4>New Animal Info</h4>
            <div className="row">
              <form onSubmit={this._onSubmit}>
                <div className="input-field col s6">
                  <i className="material-icons prefix">pets</i>
                  <input type="text" className="validate" ref="name"/>
                  <label>Name</label>
                </div>
                <div className="input-field col s6">
                  <i className="material-icons prefix">fingerprint</i>
                  <input type="text" className="validate" ref="breed"/>
                  <label>Breed</label>
                </div>
                <div className="input-field col s8">
                  <i className="material-icons prefix">timer</i>
                  <input type="text" className="validate" ref="age"/>
                  <label>Age</label>
                </div>
                <div className="col s4">
                  <div className="genderRadio">
                    <Input name='gender' type='radio' value='male' label='Male' onClick={this.pickGender}/>
                    <Input name='gender' type='radio' value='female' label='Female' onClick={this.pickGender}/>
                  </div>
                </div>
                <div className="input-field col s12">
                  <i className="material-icons prefix">wallpaper</i>
                  <input type="text" className="validate" ref="pic"/>
                  <label>Photo</label>
                </div>
                <Row className="size">
                  <Input s={6} type='select' label="Size Select" onChange={this.selectSize}>
                    <option value='small'>Small</option>
                    <option value='medium'>Medium</option>
                    <option value='large'>Large</option>
                    <option value='x-large'>X-Large</option>
                  </Input>
                  <Input s={6} type='select' label="Color Select" onChange={this.selectColor}>
                    <option value='black'>Black</option>
                    <option value='brindle'>Brindle</option>
                    <option value='brown'>Brown</option>
                    <option value='gray'>Gray</option>
                    <option value='merle'>Merle</option>
                    <option value='red'>Red</option>
                    <option value='yellow'>Yellow</option>
                    <option value='tricolor'>Tricolor</option>
                  </Input>
                </Row>
                <div className="col s12">
                  <button className="btn waves-effect amber darken-1 waves-light" type="submit" name="action">Submit
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
