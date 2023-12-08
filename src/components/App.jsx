import AddContactForm from './AddContactForm/AddContactForm';
import ContactsSearch from './ContactsSearch/ContactsSearch';
import ContactList from './ContactList/ContactList';
import Section from './Contacts/Contacts';
import { nanoid } from 'nanoid';
const { useState, useEffect } = require('react');

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const localContacts = JSON.parse(localStorage.getItem('contacts'));
    if (localContacts) {
      setContacts(localContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.elements.name.value;

    const isNameUnique = contacts.every(
      contact => contact.name.toLowerCase() !== name.toLowerCase()
    );
    if (!isNameUnique) {
      alert("Це ім'я вже присутнє у вашій телефонній книзі!");
      return;
    }
    const number = form.elements.number.value;
    const id = nanoid();
    setContacts([...contacts, { name, id, number }]);
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const handleChange = e => {
    const { value } = e.target;
    setFilter(value);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        fontSize: 40,
        color: '#010101',
        paddingLeft: '25px',
      }}
    >
      <AddContactForm submit={handleSubmit} />
      <Section title={'Contacts'}>
        <ContactsSearch value={filter} change={handleChange} />
        {!filter && <ContactList contacts={contacts} onclick={deleteContact} />}
        {filter && (
          <ContactList contacts={filteredContacts} onclick={deleteContact} />
        )}
      </Section>
    </div>
  );
};

export default App;
