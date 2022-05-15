import React, { useEffect } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { ContactForm } from './AddingContactForm/AddingContactForm';
import { Title, Container } from './App.styled';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/ContactFilter';
import { useSelector, useDispatch } from 'react-redux';
import {saveContact,filterContacts,deleteContact} from '../redux/store'

export const App = () => {
  const dispatch = useDispatch();
  const getContacts = state => state.contacts.phoneBook;
  const getFilter = state => state.contacts.filter;
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const contactAntiDuplicator = name => {
    const normalizedName = name.toLowerCase();
    return contacts.some(
      contactName => normalizedName === contactName.name.toLowerCase()
    );
  };

  const addContact = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };
    if (contactAntiDuplicator(newContact.name)) {
      window.alert(`${newContact.name} is already in contacts`);
      return;
    } else {
      dispatch(saveContact(newContact));
    }
  };

  const deleteContactById = contactId => {
    dispatch(deleteContact(contactId));
    //setContacts(prevState => prevState.filter(data => data.id !== contactId));
  };

  const changeFilter = event => {
    dispatch(filterContacts(event.currentTarget.value));
  };

  const normalizedFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter(data =>
    data.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <Container>
      <Title>Phonebook</Title>
      <ContactForm onSubmit={addContact} />
      <Title>Contacts</Title>
      <Filter filterValue={filter} onChange={changeFilter} />
      <ContactList contacts={visibleContacts} onDeleteContact={deleteContactById} />
    </Container>
  );
};

ContactList.propTypes = { contacts: PropTypes.array };
