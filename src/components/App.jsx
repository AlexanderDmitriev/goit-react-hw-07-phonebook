import React from 'react';
import PropTypes from 'prop-types';
import { ContactForm } from './AddingContactForm/AddingContactForm';
import { Title, Container } from './App.styled';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/ContactFilter';
import { useSelector, useDispatch } from 'react-redux';
import { filterContacts } from '../redux/filter';
import {
  useGetAllContactsQuery,
  useDeleteContactMutation,
  useAddContactMutation,
} from '../redux/contacts';
import { Spinner } from './App.styled';
import toast, { Toaster } from 'react-hot-toast';

export const App = () => {
  const dispatch = useDispatch();
  const filterContact = useSelector(state => state.filter.value);

  const { data: contacts, error, isFetching } = useGetAllContactsQuery();
  const [createContact, isSuccess] = useAddContactMutation();
  const [deleteContact] = useDeleteContactMutation();

  //Проверка пришли ли данные с сервера
  const showContacts = contacts && !isFetching;
  //Сообщение при отсутствии данных с сервера
  const errorMessage =
    'Sorry, no data found. Try reloading the page or try later';

  const contactAntiDuplicator = name => {
    const normalizedName = name.toLowerCase();
    return contacts.some(
      contactName => normalizedName === contactName.name.toLowerCase()
    );
  };

  const addContact = ({ name, number }) => {
    if (contactAntiDuplicator(name)) {
      toast.error(`${name} is already in contacts`);
      return;
    } else {
      createContact({ name, number });
      if (isSuccess) {
        toast.success(`${name} successfully adding in the phone book`);
      }
    }
  };

  const changeFilter = event => {
    dispatch(filterContacts(event.currentTarget.value));
  };

  let visibleContacts = [];
  const normalizedFilter = filterContact.toLowerCase();
  if (showContacts) {
    visibleContacts = contacts.filter(data =>
      data.name.toLowerCase().includes(normalizedFilter)
    );
  }

  return (
    <Container>
      <Title>Phonebook</Title>
      <ContactForm onSubmit={addContact} />
      <Title>Contacts</Title>
      <Filter filterValue={filterContact} onChange={changeFilter} />
      {isFetching && <Spinner size={50} color="rgba(57, 62, 172, 1)" />}
      {showContacts && (
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={deleteContact}
        />
      )}
      {error && <Title>{errorMessage}</Title>}
      <Toaster position="top-right" reverseOrder={false} />
    </Container>
  );
};

ContactList.propTypes = { contacts: PropTypes.array };
