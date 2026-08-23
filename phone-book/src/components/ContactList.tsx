import usePhoneBookStore from "../stores/usePhoneBookStore";

const getInitials = (name: string) =>
  name.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0].toUpperCase()).join("");

const ContactList = () => {
  const { phoneBook } = usePhoneBookStore();

  return (
    <div className="contacts-section">
      <div className="contacts-heading">
        <h2>Contacts</h2>
        <span className="contact-count">{phoneBook.length} {phoneBook.length === 1 ? "person" : "people"}</span>
      </div>

      {phoneBook.length === 0 ? (
        <div className="empty-state">
          <p>No contacts yet.</p>
        </div>
      ) : (
        <ul className="contact-list">
          {phoneBook.map((contact, index) => (
            <li className="contact-card" key={contact.id}>
              <span className={`avatar avatar-${index % 4}`}>{getInitials(contact.name)}</span>
              <div className="contact-details">
                <strong>{contact.name}</strong>
                <a href={`tel:${contact.phoneNumber}`}>{contact.phoneNumber}</a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactList;
