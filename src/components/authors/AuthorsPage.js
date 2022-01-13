import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authorActions from '../../redux/actions/authorActions';
import * as coursesActions from '../../redux/actions/courseActions';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthorList from './AuthorList';

const AuthorsPage = ({
  courses,
  authors,
  loading,
  actions 
}) => {
  const [redirectToAddAuthorsPage, setRedirectToAddAuthorsPage] = useState(false);

  useEffect(() => {
    if (authors.length === 0) {
      actions.loadAuthors().catch(error => {
        alert('Loading authors failed ' + error);
      });
    }

    if (courses.length === 0) {
      actions.loadCourses().catch(error => {
        alert('Loading courses failed ' + error);
      });
    }
  }, [])

  function handleDeleteAuthor(author) {
    const authorHasCourse = courses.find(course => course.authorId === author.id);
    if (authorHasCourse) {
      toast.error('Author can not be deleted. Author has courses.');
      return;
    }
    actions.deleteAuthor(author)
      .then(() => toast.success('Author deleted.'))
      .then(() => actions.loadAuthors())
      .catch(error => {
        toast.error('Delete failed. ' + error.message, { autoClose: false })
      })
  }

  return (
    <>
      {redirectToAddAuthorsPage && <Redirect to="/author" />}
      <h2>Authors</h2>
      {loading ? (
        <Spinner />
        ) : (
        <>
          <button
            style={{ marginBottom: 20 }}
            className="btn btn-primary add-course"
            onClick={() => setRedirectToAddAuthorsPage(true)}
          >
            Add Author
          </button>

          <AuthorList 
            onDeleteClick={handleDeleteAuthor}
            authors={authors}
          />
        </>
      )}
    </>
  );
}

AuthorsPage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    courses: state.courses,
    authors: state.authors,
    loading: state.apiCallsInProgress > 0
  } 
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      loadCourses: bindActionCreators(coursesActions.loadCourses, dispatch),
      deleteAuthor: bindActionCreators(authorActions.deleteAuthor, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorsPage);
