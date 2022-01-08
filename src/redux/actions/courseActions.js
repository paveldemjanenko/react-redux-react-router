import * as types from './actionTypes';
import * as courseApi from '../../api/courseApi';

export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses: courses };
}

export function createCourseSuccess(course) {
  return { type: types.CREATE_COURSE_SUCCESS, course: course };
}

export function updateCourseSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, course: course };
}

//thunks
export function loadCourses() {
  return function(dispatch) {
    return courseApi
      .getCourses()
      .then(courses => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function saveCourse(course) {
  //seconf prop allows to access redux store directly
  // return function(dispatch, getState) {
  return function(dispatch) {
    return courseApi
      .saveCourse(course)
      .then(saveCourse => {
        course.id
        ? dispatch(updateCourseSuccess(saveCourse))
        : dispatch(createCourseSuccess(saveCourse));
      })
      .catch(error => {
        throw error;
      });
  };
}
