import React, { Component } from 'react';
import '../../styles/components/core/pagination.css'

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.showPages = 5;
  }
  
  render() {
    const { current, total, perPage} = this.props;
    const pages = Math.ceil(total / perPage);
    let pageList = []
    const fill = (start, end) => {
      for(let i=start; i<= end; i++) {
        pageList.push(i);
      }
    }

    if(pages < this.showPages) {
      fill(1, pages);
    } else if (current <=2   && pages >= this.showPages ) {
      fill(1, this.showPages);
    } else if (current > 2 && pages >= current + 2 ) {
      fill(current - 2, current + 2)
    } else {
      fill(current - 2, pages)
    }
    return (
      <div className="Pagination__wrapper">
          <ul className="Pagination__list">
            {
              current > 1 && 
              <li onClick={() => this.props.handlePageChange(current-1)}
                className="Pagination__page-number Pagination__page-number--prev">
                Prev
              </li>
            }
              {
                pageList.map( (page, index) =>
                  <li onClick={() => this.props.handlePageChange(page)}
                    className={
                      'Pagination__page-number ' +
                      ((current === page) ? 'Pagination__page-number--active' : '')
                    }
                    key={'page'+index}
                  >
                    {page}
                  </li>
                )
              }
            {
              current < pages &&
              <li onClick={() => this.props.handlePageChange(current+1)}
                className="Pagination__page-number Pagination__page-number--next">
                Next
              </li>
            }
            <li className="Pagination__page-number Pagination__pages-info">Page {current}/{pages}</li>
          </ul>
      </div>
    );
  }
}

Pagination.defaultProps = {
  total: 0,
  perPage: 5
}

export default Pagination;