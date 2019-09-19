import React, { Component, Fragment } from 'react';
import Pagination from './Pagination'

import '../../styles/components/core/table.css'

class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData: [],
      pagination: {
        current: 1,
        perPage: 5
      },
      sort: {
        column: null,
        order: null
      }
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.data !== prevState.data && nextProps.search === '') {
      if(nextProps.data.length > 0) {
        const from = (prevState.pagination.current - 1) * prevState.pagination.perPage;
        const to = from + prevState.pagination.perPage;
        const tableData = nextProps.data.slice(from, to)
        const pagination = {
          ...prevState.pagination,
          total: nextProps.data.length
        }
        return {
          ...prevState,
          pagination,
          tableData,
          data: nextProps.data
        }
      }
    }
    if(nextProps.search !== prevState.search && nextProps.search !== '') {
      const searchText = nextProps.search.toLowerCase();
      let filteredData = nextProps.data.filter( user => 
        user.first_name.toLowerCase().match(new RegExp(searchText, "g")));

      const from = 0;
      const to = from + prevState.pagination.perPage;
      const tableData = filteredData.slice(from, to)
      const pagination = {
        ...prevState.pagination,
        current: 1,
        total: filteredData.length
      }
      return {
        ...prevState,
        pagination,
        tableData,
        data: filteredData
      }
    }

    return prevState
  }

  updateData = () => {
    const from = (this.state.pagination.current - 1) * this.state.pagination.perPage;
    const to = from + this.state.pagination.perPage;
    const tableData = this.props.data.slice(from, to)
    this.setState({ tableData });
  }

  handlePageChange = (page) => {
    const pagination = {...this.state.pagination}
    pagination.current = page;
    this.setState({
      pagination
    }, () => this.updateData())
  }

  handleColumnSort = (key) => {
    const direction = this.state.sort.column === key ? (this.state.sort.order === 1 ? 0 : 1) : 0;
    console.log("p",direction, this.state.sort, this.state.tableData)
    let tableData = [...this.state.tableData]
    tableData.sort((a, b) => {
      let firstKey = a[key];
      let secondKey = b[key];

      typeof firstKey === 'string' && (firstKey = firstKey.toLowerCase());
      typeof secondKey === 'string' && (secondKey = secondKey.toLowerCase());

      if (firstKey < secondKey) {
        return -1;
      }
      if (firstKey > secondKey) {
        return 1;
      }
      return 0;
    });
    if (direction === 0) {
      tableData.reverse();
    }

    this.setState({
      tableData,
      sort: {
        column: key,
        order: direction,
      }
    });
  }
  
  render() {
    console.log(this.state.tableData);
    return (
      <Fragment>
        <div class="Table__wrapper">
        <table className="Table">
          <thead className="Table__head">
            {
              <tr className="Table__header">
                {
                  this.props.columns.map( column =>
                    <th key={'column'+column.id}
                      onClick={() => this.handleColumnSort(column.key)}
                      className="Table__column"
                    >{column.title}</th>
                  )
                  }
              </tr>
            }
          </thead>
          <tbody>
            {
              this.state.tableData.map( data =>
                <tr key={'row'+data.id}
                  onClick={() => this.props.onRowClick(data)}
                  className="Table__row"
                >
                  {
                    this.props.columns.map( column =>
                      column.key === 'web' 
                      ?
                      <td key={'cell'+column.id} className="Table__cell">
                        <a href={data[column.key]} target="_blank">{data[column.key]}</a>
                      </td>
                      :
                      <td key={'cell'+column.id} className="Table__cell">{data[column.key]}</td>
                    )
                  }
                </tr>
              )
            } 
          </tbody>
        </table>
        </div>
        <Pagination {...this.state.pagination} handlePageChange={this.handlePageChange} />
      </Fragment>
    );
  }
}

export default Table;