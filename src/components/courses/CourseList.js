import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//TODO sorting functionality can be moved out of the component
function sortData({ courses, sortKey, reverse}) {

  const sortedData = courses.sort((a, b) => {
    return a[sortKey] > b[sortKey] ? 1 : -1
  })

  if (reverse) {
    return sortedData.reverse();
  }

 return sortedData;
}

function SortButton({ sortOrder, columnKey, sortKey, onClick }) {
  return (
    <button
      className={`${sortKey === columnKey && sortOrder === 'desc' ? 'sort-button sort-reverse' : 'sort-button' }`}
      // className={`${sortOrder === 'desc' ? 'sort-button sort-reverse' : 'sort-button'}`}
      onClick={onClick}
    >
      &#x25b4;
    </button>
  );
}

const CourseList = ({ onDeleteClick, courses }) => {
  const headers = [
    { key: 'title', label: 'Title' },
    { key: 'author', label: 'Author' },
    { key: 'category', label: 'Category'},
  ];
  const [sortKey, setSortKey] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');

  // using useCallback to memoize sortData call
  const sortedData = useCallback(() => sortData({ courses, sortKey, reverse: sortOrder === 'desc'}), [courses, sortKey, sortOrder ]);

  function changeSort(key) {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setSortKey(key);
  }

  return (
    <table className="table sortable">
      <thead>
        <tr>
          <th />
          {headers.map(header => {
            return (
              <th key={header.key}>
                {header.label}{' '}
                {header.key !== 'author' && 
                  <SortButton
                    columnKey={header.key}
                    onClick={() => changeSort(header.key)}
                    {...{
                      sortOrder,
                      sortKey
                    }}
                  />
                }
              </th>
            );
          })}
          {/* <th>
            Title
            <SortButton
              // columnKey="title"
              onClick={() => changeSort()}
              {...{
                sortOrder,
                sortKey
              }}
              //same as sortOrder={sortOrder} and sortKey={sortKey}
            />
          </th>
          <th>Author</th>
          <th>Category</th> */}
          <th />
        </tr>
      </thead>
      <tbody>
        {sortedData().map(course => {
          return (
            <tr key={course.id}>
              <td>
                <a
                  className="btn btn-light"
                  href={"http://pluralsight.com/courses/" + course.slug}
                >
                  Watch
                </a>
              </td>
              <td>
                <Link to={"/course/" + course.slug}>{course.title}</Link>
              </td>
              <td>{course.authorName}</td>
              <td>{course.category}</td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => onDeleteClick(course)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  )
};

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

SortButton.propTypes = {
  sortOrder: PropTypes.string,
  columnKey: PropTypes.string,
  sortKey: PropTypes.string,
  onClick: PropTypes.func
};

export default CourseList;
