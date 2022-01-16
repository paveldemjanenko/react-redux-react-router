import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Prompt } from 'react-router-dom';
import * as courseActions from '../../redux/actions/courseActions';
// import { loadCourses, saveCourse } from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
// import { loadAuthors } from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import CourseForm from './CourseForm';
import { newCourse } from '../../../tools/mockData';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';

export function ManageCoursePage({
  authors,
  courses,
  loadAuthors,
  loadCourses,
  saveCourse,
  history,
  ...props
}) {
  const [course, setCourse] = useState({...props.course});
  const [errors, setErrors] = useState({});
  const [saving, setSvaing] = useState(false);
  const [notify, setNotify] = useState(true);

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch(error => {
        alert("Loading courses failed" + error);
      });
    } else {
      setCourse({ ...props.course });
    }

    if (authors.length === 0) {
      loadAuthors().catch(error => {
        alert("Loading authors failed" + error);
      });
    }
  }, [props.course])

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value
    }))
  }

  function formIsValid() {
    const { title, authorId, category } = course;
    const errors = {};

    if (!title) errors.title = "Title is required.";
    if (!authorId) errors.author = "Author is reguired.";
    if (!category) errors.category = "Category is required.";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSvaing(true);
    saveCourse(course)
      .then(() => setNotify(false))
      .then(() => {
        toast.success("Course saved.");
        history.push("/courses");
      })
      .catch(error => {
        setSvaing(false);
        setErrors({ onSave: error.message });
      });
  }

  return authors.length === 0 || course.length === 0 ? (
    <Spinner />
  ) : (
    <>
      <Prompt
        when={notify}
        message='You have unsaved changes, are you sure you want to leave?'
      />
      <CourseForm
        course={course}
        errors={errors}
        authors={authors}
        onChange={handleChange}
        onSave={handleSave}
        saving={saving}
      />
    </>
  );
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

function getCourseBySlug(courses, slug) {
  return courses.find(course => course.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const course = slug && state.courses.length > 0
    ? getCourseBySlug(state.courses, slug)
    : newCourse;
  if (state.courses.length > 0 && course?.slug !== slug) toast.error('404 - slug does not exist.');
  return {
    course: course,
    courses: state.courses,
    authors: state.authors
  };
}

const mapDispatchToProps = {
  loadCourses: courseActions.loadCourses,
  loadAuthors: authorActions.loadAuthors,
  saveCourse: courseActions.saveCourse
}

// const mapDispatchToProps = {
//   loadCourses,
//   loadAuthors,
//   saveCourse
// }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCoursePage);
