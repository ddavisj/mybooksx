// This comp makes use of a library called React Final Form. It's generalised so it can be
//.. used with StreamEdit and StreamCreate

import React from 'react';
import { Form, Field } from 'react-final-form';

const BookForm = props => {
   // If the field has been touched and an error attached, show the error
   const renderError = ({ error, touched }) => {
      if (touched && error) {
         return (
            <div className="ui error message">
               <div className="header">{error}</div>
            </div>
         );
      }
   };
   const renderInput = ({ input, label, meta }) => {
      // Show the error class if the field was touched and an error attached
      const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
      return (
         <div className={className}>
            <label>{label}</label>
            <input {...input} autoComplete="off" />
            {renderError(meta)}
         </div>
      );
   };

   const onSubmit = formValues => {
      props.onSubmit(formValues);
   };

   // Set form initialValues
   // Provide defined error warnings to users for each relevant field
   return (
      <Form
         initialValues={props.initialValues}
         onSubmit={onSubmit}
         validate={formValues => {
            const errors = {};

            if (!formValues.title) {
               errors.title = 'You must enter a title';
            }

            if (!formValues.author) {
               errors.author = 'You must enter an author';
            }

            return errors;
         }}
         // Provide a render property direct to the form..
         //.. Pass in our renderInput function above to each field
         render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className="ui form error">
               <Field name="title" component={renderInput} label="Title" />
               <Field
                  name="subtitle"
                  component={renderInput}
                  label="Subtitle/Description"
               />
               <Field
                  name="author"
                  component={renderInput}
                  label="Author (full name)"
               />
               <Field
                  name="link"
                  component={renderInput}
                  label="Official website"
               />
               <Field
                  name="review"
                  component={renderInput}
                  label="Review or related"
               />
               <button className="ui button primary">Save</button>
            </form>
         )}
      />
   );
};

export default BookForm;
