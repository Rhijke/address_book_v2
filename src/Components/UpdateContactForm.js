import React, { Component } from 'react';
import { Formik, Form, useField, useFormikContext } from 'formik';
import Modal from 'react-modal';
import * as Yup from 'yup';
import { updateContact, getContacts } from '../actions/contactActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../css/sass/AddContactForm.scss';
import { Redirect } from 'react-router-dom';

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <div className='form-item'>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className='text-input' {...field} {...props} />
      <div className={meta.touched && meta.error ? 'error' : 'error-sub'}>
        Required
      </div>
    </div>
  );
};

const initialValues = {
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  street: '',
  city: '',
  state: '',
  zip_code: '',
};

const validationSchema = Yup.object({
  firstname: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  lastname: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
  email: Yup.string().email('Invalid email addresss`').required('Required'),
  phone: Yup.string().required('Required'),
  street: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
  zip_code: Yup.number().required('Required'),
});

class UpdateContactForm extends Component {
  componentDidMount() {}
  render() {
    return (
      <div id='form-content'>
        {!this.props.contact['_id'] ? <Redirect to='/' /> : null}
        <h1 id='form-heading'>Update Contact</h1>
        <Formik
          initialValues={this.props.contact}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            // Call store
            console.log(values);
            this.props.updateContact(values);
            this.props.getContacts();
            resetForm({ values });
            setSubmitting(false);
          }}
        >
          <Form>
            <MyTextInput
              label='First Name'
              name='firstname'
              type='text'
              placeholder='First name'
            />
            <MyTextInput
              label='Last Name'
              name='lastname'
              type='text'
              placeholder='Last name'
            />
            <MyTextInput
              label='Email Address'
              name='email'
              type='email'
              placeholder='Email'
            />

            <MyTextInput
              label='Phone number'
              name='phone'
              type='text'
              placeholder='Phone number'
            />
            <MyTextInput
              label='Street Address'
              name='street'
              type='text'
              placeholder='Street Address'
            />
            <MyTextInput
              label='City'
              name='city'
              type='text'
              placeholder='City'
            />
            <MyTextInput
              label='State'
              name='state'
              type='text'
              placeholder='State'
            />
            <MyTextInput
              label='Zip code'
              name='zip_code'
              type='text'
              placeholder='Zip code'
            />

            <div className='form-submit'>
              <button type='submit'>Submit</button>
            </div>
          </Form>
        </Formik>
      </div>
    );
  }
}
UpdateContactForm.propTypes = {
  updateContact: PropTypes.func.isRequired,
  getContacts: PropTypes.func.isRequired,
  contact: PropTypes.object.isRequired,
};
// map state to props to get state from redux and map it to props of a component
const mapStateToProps = (state) => ({
  contacts: state.contacts.items,
  updateContact: state.contacts.updateItem,
  contact: state.contacts.contact,
});
export default connect(mapStateToProps, { updateContact, getContacts })(
  UpdateContactForm
);
