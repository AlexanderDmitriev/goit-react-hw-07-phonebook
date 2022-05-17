import React from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { ContactForm } from './AddingContactForm/AddingContactForm';
import { Title, Container } from './App.styled';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/ContactFilter';
import { useSelector, useDispatch } from 'react-redux';
import {saveContact,filterContacts,deleteContact} from '../redux/store';
import {useGetAllContactsQuery} from '../redux/contacts';

export const App = () => {
  const dispatch = useDispatch();
  const getFilter = state => state.contacts.filter;
  const getContacts = state => state.contacts.phoneBook;
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const { data:contacts2, error, isLoading,isFetching } = useGetAllContactsQuery();

  //Проверка пришли ли данные с сервера
  const showContacts=contacts2&&!isFetching;

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
      {showContacts&&<ContactList contacts={contacts2} onDeleteContact={deleteContactById} />}
      
    </Container>
  );
};

ContactList.propTypes = { contacts: PropTypes.array };
