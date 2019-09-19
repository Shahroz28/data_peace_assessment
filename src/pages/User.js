import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../styles/user.css'

const COLS = {
  "first_name": "First Name",
  "last_name": "Last Name",
  "company_name": "Company Name",
  "city": "City",
  "state": "State",
  "zip": "Zip",
  "email": "Email",
  "web": "Web",
  "age": "Age"
}

const InfoComponent = ({identity, value}) =>
  <div className="User__info-wrapper">
    <span className="User__info User__info--left">{COLS[identity]}</span>
    {
      identity === "web"
      ?
      <div className="User__info User__info--right">
        <a href={value}>{value}</a>
      </div>
      :
      <span className="User__info User__info--right">{value}</span>
    }
  </div> 

class User extends Component {
  render() {
    const state = this.props.location && this.props.location.state;
    const user = state ? state.user : {}
    return (
        <div>
          <div className="User__wrapper">
            <Link to="/" className="User__back-link">Back</Link>
            <h2 className="User__heading">{user.first_name} {user.last_name}</h2>
          </div>
          {
            Object.keys(user).map( (_key, index) =>
              COLS[_key] &&
              <InfoComponent key={'user'+index} identity={_key} value={user[_key]} />  
            )
          }
        </div>
    );
  }
}

export default User;
