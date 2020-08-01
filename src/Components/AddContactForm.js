import React, { Component } from 'react';
import { Formik, Form, useField, useFormikContext } from 'formik';
import Modal from 'react-modal';
import * as Yup from 'yup';
import { addContact } from '../actions/contactActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../css/sass/AddContactForm.scss';

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

class AddContactForm extends Component {
  render() {
    return (
      <div id='form-content'>
        <h1 id='form-heading'>Add Contact</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            // Call store
            this.props.addContact(values);
            resetForm({});
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
AddContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};
export default connect(null, { addContact })(AddContactForm);
