import { useState } from "react";
import { Button, TextField } from "@mui/material";
import usePhoneBookStore from "../stores/usePhoneBookStore";

interface ContactItemProps {
  contact: {
    id: number;
    name: string;
    phoneNumber: string;
  };
  index: number;
}

const ContactItem = ({ contact, index }: ContactItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(contact.name);
  const [phoneNumber, setPhoneNumber] = useState(contact.phoneNumber);
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const { updateContact, deleteContact } = usePhoneBookStore();

  const getInitials = (name: string) =>
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join("");

  const handleUpdate = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const trimmedName = name.trim();
    const trimmedPhoneNumber = phoneNumber.trim();

    if (!trimmedName) {
      setNameError("Please enter a name.");
      return;
    }

    if (!trimmedPhoneNumber) {
      setPhoneError("Please enter a phone number.");
      return;
    }

    const result = updateContact(contact.id, trimmedName, trimmedPhoneNumber);

    if (!result.success) {
      if (result.reason === "duplicate-name") {
        setNameError(`${result.existingContact.name} is already registered.`);
      } else {
        setPhoneError(`This number is already registered to ${result.existingContact.name}.`);
      }
      return;
    }

    setNameError("");
    setPhoneError("");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setName(contact.name);
    setPhoneNumber(contact.phoneNumber);
    setNameError("");
    setPhoneError("");
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteContact(contact.id);
  };

  if (isEditing) {
    return (
      <li className="contact-card editing-card">
        <div className="edit-fields">
          <TextField
            size="small"
            label="Full name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setNameError("");
            }}
            error={Boolean(nameError)}
            helperText={nameError}
          />
          <TextField
            size="small"
            label="Phone number"
            type="tel"
            value={phoneNumber}
            onChange={(event) => {
              setPhoneNumber(event.target.value);
              setPhoneError("");
            }}
            error={Boolean(phoneError)}
            helperText={phoneError}
          />
        </div>

        <div className="contact-actions edit-actions">
          <Button className="cancel-button" size="small" onClick={handleCancel}>
            Cancel
          </Button>
          <Button className="save-button" size="small" onClick={handleSave}>
            Save
          </Button>
        </div>
      </li>
    );
  }

  return (
    <li className="contact-card">
      <span className={`avatar avatar-${index % 4}`}>{getInitials(contact.name)}</span>

      <div className="contact-details">
        <strong>{contact.name}</strong>
        <a href={`tel:${contact.phoneNumber}`}>{contact.phoneNumber}</a>
      </div>

      <div className="contact-actions">
        <Button className="edit-button" size="small" onClick={handleUpdate}>
          Update
        </Button>
        <Button className="delete-button" size="small" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </li>
  );
};

export default ContactItem;
