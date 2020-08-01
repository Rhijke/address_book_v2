import {
  ADD_CONTACT,
  GET_CONTACTS,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  GET_CONTACT,
} from './types';
const domain = 'https://enigmatic-coast-01092.herokuapp.com/';
export function getContacts() {
  return function (dispatch) {
    const uri = `${domain}getcontacts`;
    fetch(uri)
      .then((res) => res.json())
      .then((contacts) =>
        dispatch({
          type: GET_CONTACTS,
          contacts: contacts,
        })
      )
      .catch((err) => console.log(err));
  };
}
export function addContact(values) {
  return function (dispatch) {
    fetch(`${domain}addcontact`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((res) => {
        if (res.status === 200) alert('Contact created!');
        else alert('Error occurred while creating contact');
        return res.json();
      })
      .then((data) =>
        dispatch({
          type: ADD_CONTACT,
          contacts: data,
        })
      )
      .catch((err) => alert(err));
  };
}
export function updateContact(values) {
  return function (dispatch) {
    fetch(`${domain}update`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // Check that the contact was updated
        if (data.nModified === 1) {
          alert('Successful contact update');
          dispatch({
            type: UPDATE_CONTACT,
            contacts: data,
          });
        } else {
          alert('Could not update the contact');
        }
      })
      .catch((err) => console.log(err));
  };
}
export function deleteContact(_id) {
  return function (dispatch) {
    // DELETE request
    fetch(`${domain}delete?_id=${_id}`, {
      method: 'DELETE',
      mode: 'cors',
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.deletedCount === 1) {
          data['_id'] = _id;
          dispatch({
            type: DELETE_CONTACT,
            contacts: data,
          });
        } else alert('Error deleting the contact');
      })
      .catch((err) => console.error(err));
  };
}
export function getContact(values) {
  return function (dispatch) {
    dispatch({
      type: GET_CONTACT,
      contact: values,
    });
  };
}
