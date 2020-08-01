import {
  ADD_CONTACT,
  GET_CONTACTS,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  GET_CONTACT,
} from '../actions/types';

const initialState = {
  items: [],
  contact: {},
  newItem: {},
  updateItem: {},
  deleteItem: {},
};

// if action has data, then it has a 'payload'
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        items: action.contacts,
      };
    case ADD_CONTACT:
      return {
        ...state,
        newItem: action.contacts,
      };
    case DELETE_CONTACT:
      return {
        ...state,
        deleteItem: action.contacts,
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        updateItem: action.contacts,
      };
    case GET_CONTACT:
      return {
        ...state,
        contact: action.contact,
      };
    default:
      return state;
  }
}
