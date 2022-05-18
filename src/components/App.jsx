import React from 'react';
import PropTypes from 'prop-types';
import { ContactForm } from './AddingContactForm/AddingContactForm';
import { Title, Container } from './App.styled';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/ContactFilter';
import { useSelector, useDispatch } from 'react-redux';
import { filterContacts } from '../redux/store';
import {
  useGetAllContactsQuery,
  useDeleteContactMutation,
  useAddContactMutation,
} from '../redux/contacts';

export const App = () => {
  const dispatch = useDispatch();
  const getFilter = state => state.contacts.filter;
  const filter = useSelector(getFilter);

  const {
    data: contacts,
    /* error,
    isLoading, */
    isFetching,
  } = useGetAllContactsQuery();
  const [createContact, /* { isSuccess } */] = useAddContactMutation();
  const [deleteContact, /* { isUpdating } */] = useDeleteContactMutation();

  //Проверка пришли ли данные с сервера
  const showContacts = contacts && !isFetching;

  const contactAntiDuplicator = name => {
    const normalizedName = name.toLowerCase();
    return contacts.some(
      contactName => normalizedName === contactName.name.toLowerCase()
    );
  };

  const addContact = ({ name, number }) => {
    if (contactAntiDuplicator(name)) {
      window.alert(`${name} is already in contacts`);
      return;
    } else {
      createContact({ name, number });
    }
  };

  const changeFilter = event => {
    dispatch(filterContacts(event.currentTarget.value));
  };

  /* const normalizedFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter(data =>
    data.name.toLowerCase().includes(normalizedFilter)
  ); */

  return (
    <Container>
      <Title>Phonebook</Title>
      <ContactForm onSubmit={addContact} />
      <Title>Contacts</Title>
      <Filter filterValue={filter} onChange={changeFilter} />
      {showContacts && (
        <ContactList contacts={contacts} onDeleteContact={deleteContact} />
      )}
    </Container>
  );
};

ContactList.propTypes = { contacts: PropTypes.array };