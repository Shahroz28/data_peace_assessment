import React, { Component } from 'react';

import Input from '../components/core/Input'
import Table from '../components/core/Table'
import COLUMNS from '../constants/tables/Home_User_Column'

import '../styles/home.css'

import { getUsers } from '../services/user'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      userData: []
    }
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = async () => {
    let users = await getUsers();
    if(!users) {
      users = [];
    }
    this.setState({
      userData: users
    })
  }

  handleRowClick = (user) => {
    this.props.history.push('user/'+user.id, {user});
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div className="Home__wrapper">
        <div className="Home__header">
          <Input type="text"
            onChange={this.handleChange}
            value={this.state.search}
            name="search"
            placeholder="Search By First Name"
            className="Home__search-input"
          />
        </div>

        <Table data={this.state.userData}
          columns={COLUMNS}
          onRowClick={this.handleRowClick}
          search={this.state.search}
        />
      </div>
    );
  }
}

export default Home;
