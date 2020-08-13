import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

// Adding Comment To Server

export const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment,
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
  const newComment = { dishId, rating, author, comment };
  newComment.date = new Date().toISOString();

  return fetch(baseUrl + 'comments', {
    method: 'POST',
    body: JSON.stringify(newComment),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          let error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      (error) => {
        let errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      return dispatch(addComment(response));
    })
    .catch((error) => {
      console.log('Post Comments', error.message);
      alert('Your Commnet Could Not Be Posted \nError:' + error.message);
    });
};

// Adding Feedback to Server

export const postFeedback = ({ firstname, lastname, telnum, email, agree, contactType, message }) => (
  dispatch
) => {
  const newFeed = { firstname, lastname, telnum, email, agree, contactType, message };
  newFeed.date = new Date().toISOString();

  return fetch(baseUrl + 'feedback', {
    method: 'POST',
    body: JSON.stringify(newFeed),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          let error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      (error) => {
        let errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      alert('Thank You For Feedback! \n' + JSON.stringify(response));
    })
    .catch((error) => {
      console.log('Post Feedback', error.message);
      alert('Your Feedback Could Not Be Posted \nError:' + error.message);
    });
};

// Dishes Action Creators::

export const fetchDishes = () => {
  return (dispatch) => {
    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'dishes')
      .then(
        (response) => {
          if (response.ok) {
            return response;
          } else {
            let error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
          }
        },
        (error) => {
          let errmess = new Error(error.message);
          throw errmess;
        }
      )
      .then((response) => {
        return response.json();
      })
      .then((dishes) => {
        dispatch(addDishes(dishes));
      })
      .catch((error) => {
        dispatch(dishesFailed(error.message));
      });
  };
};

export const dishesLoading = () => {
  return {
    type: ActionTypes.DISHES_LOADING,
  };
};

export const dishesFailed = (errmess) => {
  return {
    type: ActionTypes.DISHES_FAILED,
    payload: errmess,
  };
};

export const addDishes = (dishes) => {
  return {
    type: ActionTypes.ADD_DISHES,
    payload: dishes,
  };
};

// Comments Action Creators::

export const fetchComments = () => (dispatch) => {
  return fetch(baseUrl + 'comments')
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          let error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      (error) => {
        let errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => {
      return response.json();
    })
    .then((comments) => {
      dispatch(addComments(comments));
    })
    .catch((error) => {
      dispatch(commentsFailed(error.message));
    });
};

export const commentsFailed = (errmess) => {
  return {
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess,
  };
};

export const addComments = (comments) => {
  return {
    type: ActionTypes.ADD_COMMENTS,
    payload: comments,
  };
};

// Promos Action Creators::

export const fetchPromos = () => {
  return (dispatch) => {
    dispatch(promosLoading(true));

    return fetch(baseUrl + 'promotions')
      .then(
        (response) => {
          if (response.ok) {
            return response;
          } else {
            let error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
          }
        },
        (error) => {
          let errmess = new Error(error.message);
          throw errmess;
        }
      )
      .then((response) => {
        return response.json();
      })
      .then((promos) => {
        dispatch(addPromos(promos));
      })
      .catch((error) => {
        dispatch(promosFailed(error.message));
      });
  };
};

export const promosLoading = () => {
  return {
    type: ActionTypes.PROMOS_LOADING,
  };
};

export const promosFailed = (errmess) => {
  return {
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess,
  };
};

export const addPromos = (promos) => {
  return {
    type: ActionTypes.ADD_PROMOS,
    payload: promos,
  };
};

// Leaders Action Creators::

export const fetchLeaders = () => {
  return (dispatch) => {
    dispatch(leadersLoading(true));

    return fetch(baseUrl + 'leaders')
      .then(
        (response) => {
          if (response.ok) {
            return response;
          } else {
            let error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
          }
        },
        (error) => {
          let errmess = new Error(error.message);
          throw errmess;
        }
      )
      .then((response) => {
        return response.json();
      })
      .then((leaders) => {
        dispatch(addLeaders(leaders));
      })
      .catch((error) => {
        dispatch(leadersFailed(error.message));
      });
  };
};

export const leadersLoading = () => {
  return {
    type: ActionTypes.LEADERS_LOADING,
  };
};

export const leadersFailed = (errmess) => {
  return {
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess,
  };
};

export const addLeaders = (leaders) => {
  return {
    type: ActionTypes.ADD_LEADERS,
    payload: leaders,
  };
};
