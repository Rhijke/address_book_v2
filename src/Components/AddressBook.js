import React, { Component } from 'react';
import ReactModal from 'react-modal';
import {
  getContacts,
  deleteContact,
  updateContact,
  getContact,
} from '../actions/contactActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../css/sass/App.scss';
import UpdateContactForm from './UpdateContactForm';
import { Redirect, Link } from 'react-router-dom';

class AddressBook extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     showModal: false,
  //   };

  //   this.handleOpenModal = this.handleOpenModal.bind(this);
  //   this.handleCloseModal = this.handleCloseModal.bind(this);
  // }

  // handleOpenModal() {
  //   this.setState({ showModal: true });
  // }

  // handleCloseModal() {
  //   this.setState({ showModal: false });
  // }
  // GET contacts from DB
  componentDidMount() {
    this.props.getContacts();
  }

  componentDidUpdate() {
    console.log('updating...');
    // this.props.getContacts();
  }
  render() {
    let contactList = this.props.contacts.map((contact) => {
      return (
        <tr className='table-row' key={contact._id}>
          <td>{contact._id}</td>
          <td>{contact.firstname}</td>
          <td>{contact.lastname}</td>
          <td>{contact.phone}</td>
          <td>{contact.email}</td>
          <td>{contact.street}</td>
          <td>{contact.city}</td>
          <td>{contact.state}</td>
          <td>{contact.zip_code}</td>
          <td>
            <Link to='/updatecontact'>
              <i
                className='fa fa-pencil-square-o action-btn'
                aria-hidden='true'
                onClick={() => {
                  this.props.getContact(contact);
                }}
              ></i>
            </Link>

            <i
              className='fa fa-trash action-btn'
              onClick={() => {
                this.props.deleteContact(contact._id);
                this.props.getContacts();
              }}
              aria-hidden='true'
            ></i>
          </td>
        </tr>
      );
    });
    return (
      <div id='address-book'>
        <table id='address-book-table'>
          <thead id='table-heading'>
            <tr>
              <th>Customer ID</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Street</th>
              <th>City</th>
              <th>State</th>
              <th>Zip code</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id='table-body'>{contactList}</tbody>
        </table>
      </div>
    );
  }
}
AddressBook.propTypes = {
  getContacts: PropTypes.func.isRequired,
  contacts: PropTypes.array.isRequired,
  newContact: PropTypes.object,
};
// map state to props to get state from redux and map it to props of a component
const mapStateToProps = (state) => ({
  contacts: state.contacts.items,
  newContact: state.contacts.newItem,
  updateContact: state.contacts.updateItem,
  deleteContact: state.contacts.deleteItem,
  contact: state.contacts.contact,
});
export default connect(mapStateToProps, {
  getContacts,
  updateContact,
  deleteContact,
  getContact,
})(AddressBook);
