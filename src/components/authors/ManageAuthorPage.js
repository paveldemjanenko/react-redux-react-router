import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import * as authorActions from '../../redux/actions/authorActions';
import { newAuthor } from '../../../tools/mockData';
import AuthorForm from './AuthorForm';
import { toast } from 'react-toastify';

function ManageAuthorPage({
  authors,
  loadAuthors,
  saveAuthor,
  history,
  ...props
}) {
  const [author, setAuthor] = useState({...props.author});
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // if (authors.lengrh === 0) {
    //   loadAuthors().catch(error => {
    //     alert('Loading authors failed ' + error);
    //   })
    // } else {
    //   setAuthor({ ...props.author });
    // }
    if (authors.length === 0) {
      loadAuthors().catch(error => {
        alert("Loading authors failed" + error);
      });
    }
  }, [props.author])

  function handleChange(event) {
    const { name, value } = event.target;
    setAuthor(prevAuthor => ({
      ...prevAuthor,
      [name]: value
    }));
  }

  function formIsValid() {
    const { name } = author;
    const errors = {};

    if (!name) errors.name = 'Name is required.';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveAuthor(author).then(() => {
      toast.success('Author saved.');
      history.push('/authors');
    })
    .catch(error => {
      setSaving(false);
      setErrors({ onSave: error.message });
    })
  }

  return (
    <AuthorForm 
      author={author}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
      errors={errors}
    />
  );
}

ManageAuthorPage.propTypes = {
  author: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveAuthor: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

// function getAuthorBySlug(authors, slug) {
//   return authors.find(author => author.slug === slug) || null;
// }

function mapStateToProps(state) {
  // const slug = ownProps.match.params.slug;
  // const author = slug && state.authors.length > 0
  //   ? getAuthorBySlug(state.authors, slug)
  //   : newAuthor;
  return {
    author: newAuthor,
    authors: state.authors
  };
}

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: {
//       loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
//       saveAuthor: bindActionCreators(authorActions.saveAuthor, dispatch)
//     }
//   };
// }

const mapDispatchToProps = {
  loadAuthors: authorActions.loadAuthors,
  saveAuthor: authorActions.saveAuthor
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageAuthorPage);
