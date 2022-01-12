import * as types from './actionTypes';
import * as authorApi from '../../api/authorApi';
import { beginApiCall, apiCallError } from './apiStatusActions';


export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors: authors };
}

export function createAuthorSuccess(author) {
  return { type: types.CREATE_AUTHOR_SUCCESS, author };
}

export function updateAuthorSuccess(author) {
  return { type: types.UPDATE_AUTHOR_SUCCESS, author };
}

export function deleteAuthorSuccess(author) {
  return { type: types.DELETE_AUTHOR_SUCCESS, author: author };
}

//thunks
export function loadAuthors() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return authorApi
      .getAuthors()
      .then(authors => {
        dispatch(loadAuthorsSuccess(authors));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveAuthor(author) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return authorApi
      .saveAuthor(author)
      .then(saveAuthor => {
        author.id
        ? dispatch(updateAuthorSuccess(saveAuthor))
        : dispatch(createAuthorSuccess(saveAuthor));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteAuthor(author) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return authorApi
      .deleteAuthor(author.id)
      .then(deleteAuthor => {
        dispatch(deleteAuthorSuccess(deleteAuthor));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      })
  }
}

// export function deleteAuthorIptimistic(author) {
//   return { type: types.DELETE_AUTHOR_OPTIMISTIC, author };
// }

// export function deleteAuthor(author) {
//   return function (dispatch) {
//     dispatch(deleteAuthorIptimistic(author));
//     return authorApi.deleteAuthor(author.id);
//   }
// }
