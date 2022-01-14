import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const CourseFilter = ({ courses, filterCourses }) => {
  const [courseName, setCourseName] = useState('');

  useEffect(() => {
    filterCourses('');
  }, [])

  function handleChange(event) {
    setCourseName(event.target.value);
    filterCourses(event.target.value);
  }

  return (
    <div className="course-filter">
      <p>Filter by course title:</p>
      <select
        name="select"
        value={courseName}
        onChange={handleChange}
      >
        <option value="">--Please choose a title--</option>
        {courses.map(course => {
          return (
            <option key={course.id}>
              {course.title}
            </option>
          );
        })}
      </select>
    </div>
  );
};

CourseFilter.propTypes = {
  courses: PropTypes.array.isRequired,
  filterCourses: PropTypes.func.isRequired
};

export default CourseFilter;
