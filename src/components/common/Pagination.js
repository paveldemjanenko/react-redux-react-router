import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ coursesPerPage, totalCourses, paginate }) => {
  const pageNumbers = [];

  // Math.ceil will round up to next largest number
  for (let i = 1; i <= Math.ceil(totalCourses / coursesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  coursesPerPage: PropTypes.number.isRequired,
  totalCourses: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired
};

export default Pagination;
