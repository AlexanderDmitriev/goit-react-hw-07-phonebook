import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { LabelText } from '../App.styled';
import {
  AddingForm,
  SubmitButton,
  StyledErrorMessage,
  ToFormikInput,
} from './AddingContactForm.styled';

//Схема валидации
const schema = yup.object().shape({
  name: yup.string().required(),
  number: yup.number().required().positive().integer(),
});

export const ContactForm = ({ onSubmit }) => {
  
  const handleSubmit = (values, { resetForm }) => {
    onSubmit(values);
    resetForm();
  };

  return (
    <div>
      <Formik
        initialValues={{ name: '', number: '' }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, isSubmitting }) => (
          <AddingForm>
            <Form onSubmit={handleSubmit}>
              <LabelText htmlFor="name">
                Name
                <ToFormikInput
                  type="text"
                  name="name"
                  title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer"
                />
                <ErrorMessage
                  name="name"
                  render={
                    <StyledErrorMessage>{'Incorrect name'}</StyledErrorMessage>
                  }
                />
              </LabelText>
              <LabelText htmlFor="number">
                Number
                <ToFormikInput
                  type="tel"
                  name="number"
                  title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                  required
                />
                <ErrorMessage
                  name="number"
                  render={msg => (
                    <StyledErrorMessage>
                      {'Incorrect number'}
                    </StyledErrorMessage>
                  )}
                />
              </LabelText>
              <SubmitButton type="submit" disabled={isSubmitting}>
                Add contact
              </SubmitButton>
            </Form>
          </AddingForm>
        )}
      </Formik>
    </div>
  );
};
