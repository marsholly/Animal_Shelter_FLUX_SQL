import React, { Component } from 'react';
import { Link } from 'react-router';


export default class Layout extends Component {
  render() {
    return (
      <div>
        <div className='row banner'>
          <p className="mainTitle">ADOPT ME !!!</p>
        </div>
        <nav>
          <div className="nav-wrapper orange darken-4 z-depth-2">
            <Link to="/" className="brand-logo"><i className="material-icons leftpetsIcon">pets</i>ASA</Link>
            <ul className="right hide-on-med-and-down">
              <li><Link to="/" className="dropdown-button" data-activates="dropdown1"><i className="larger material-icons">people</i></Link></li>
              <li><Link to="/" className="dropdown-button" data-activates="dropdown2"><i className="material-icons">pets</i></Link></li>
              <li><Link to="/"><i className="material-icons searchIcon">search</i></Link></li>
            </ul>
          </div>
        </nav>
        <ul id="dropdown1" className="dropdown-content">
          <li><Link to="/newClient"><i className="material-icons">person add</i></Link></li>
          <li><Link to="/allClient"><i className="material-icons">account_circle</i></Link></li>
          <li className="divider"></li>
          <li><Link to="/"><i className="material-icons">favorite</i></Link></li>
        </ul>
        <ul id="dropdown2" className="dropdown-content">
          <li><Link to="/newAnimal"><i className="material-icons">add_circle</i></Link></li>
          <li><Link to="/"><i className="material-icons">content_paste</i></Link></li>
          <li className="divider"></li>
          <li><Link to="/"><i className="material-icons">favorite_border</i></Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
};
