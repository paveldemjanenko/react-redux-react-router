import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authorActions from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthorList from './AuthorList';

const AuthorsPage = ({
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
  }, [])

  async function handleDeleteAuthor(author) {
    await actions.deleteAuthor(author)
      .then(() => toast.success('Author deleted.'))
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
  authors: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    authors: state.authors,
    loading: state.apiCallsInProgress > 0
  } 
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteAuthor: bindActionCreators(authorActions.deleteAuthor, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorsPage);
