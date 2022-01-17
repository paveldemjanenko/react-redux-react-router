import React from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../common/Spinner';
import CourseList from './CourseList';
import CourseFilter from './CourseFilter';
import Pagination from '../common/Pagination';

class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false,
    coursesCount: 0,
    courses: [],
    currentPage: 1,
    coursesPerPage: 10
  };

  componentDidMount() {
    const { authors, courses, actions } = this.props;

    if (courses.length === 0) {
      actions.loadCourses().catch(error => {
        alert("Loading courses failed " + error);
      });
    }

    if (authors.length === 0) {
      actions.loadAuthors().catch(error => {
        alert("Loading authors failed " + error);
      });
    }
  }

  // handleDeleteCourse = course => {
  //   toast.success("Course deleted");
  //   this.props.actions.deleteCourse(course)
  //   .catch(error => {
  //     toast.error("Delete failed." + error.message, { autoClose: false });
  //   });
  // };

  handleDeleteCourse = async course => {
    try {
      await this.props.actions.deleteCourse(course)
        .then(() => this.setState({ courses: this.props.courses }))
        .then(() => toast.success('Course deleted.'));
    } catch(error) {
      toast.error("Delete failed." + error.message, { autoClose: false });
    }
  };

  filterCourses = (courseName) => {
    if (!courseName) return this.setState({ courses: this.props.courses });
    return this.setState({ courses: this.props.courses.filter(course => course.title === courseName) });
  };

  // Change page
  paginate = pageNumber => this.setState({ currentPage: pageNumber });

  render() {
    // Get curent posts per page
    const indexOfLastCourse = this.state.currentPage * this.state.coursesPerPage;
    const indexOfFirsCourse = indexOfLastCourse - this.state.coursesPerPage;
    const currentCoursesPerPage = this.props.courses.slice(indexOfFirsCourse, indexOfLastCourse);

    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>{`Courses [${this.state.courses.length}]`}</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <CourseFilter
              courses={this.props.courses} 
              filterCourses={this.filterCourses} />
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add Course
            </button>
            {this.props.courses.length === 0 ? (
              <div>No Data</div>
            ) : (
              <>
                <CourseList
                  onDeleteClick={this.handleDeleteCourse}
                  // courses={this.props.courses}
                  // courses={this.state.courses}
                  courses={currentCoursesPerPage}
                />
                <Pagination
                  coursesPerPage={this.state.coursesPerPage}
                  totalCourses={this.props.courses.length}
                  paginate={this.paginate}
                />
              </>
            )}
          </>
        )}
      </>
    );
  }
}

CoursesPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    courses: state.authors.length === 0
      ? []
      : state.courses.map(course => {
        return {
          ...course,
          authorName: state.authors.find(a => a.id === course.authorId).name
        };
      }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // createCourse: course => dispatch(courseActions.createCourse(course))
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch)
    }
  };
}

// fourth variant, connect will wrap each object prop separately
// const mapDispatchToProps = {
//   createCourse: courseActions.createCourse
// };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage);
