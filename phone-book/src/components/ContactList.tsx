import usePhoneBookStore from "../stores/usePhoneBookStore";
import ContactItem from "../components/ContactItem";

const ContactList = () => {
  const { phoneBook } = usePhoneBookStore();

  return (
    <div className="contacts-section">
      <div className="contacts-heading">
        <h2>Contacts</h2>
        <span className="contact-count">
          {phoneBook.length} {phoneBook.length === 1 ? "person" : "people"}
        </span>
      </div>

      {phoneBook.length === 0 ? (
        <div className="empty-state">
          <p>No contacts yet.</p>
        </div>
      ) : (
        <ul className="contact-list">
          {phoneBook.map((contact, index) => (
            <ContactItem key={contact.id} contact={contact} index={index} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactList;
