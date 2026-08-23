import { useState, type FormEvent } from "react";
import { Button, TextField } from "@mui/material";
import usePhoneBookStore from "../stores/usePhoneBookStore";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const { addContact } = usePhoneBookStore();

  const handleAdd = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedPhoneNumber = phoneNumber.trim();
    if (!trimmedName || !trimmedPhoneNumber) return;

    const result = addContact(trimmedName, trimmedPhoneNumber);

    if (!result.success) {
      if (result.reason === "duplicate-name") {
        setNameError(`${result.existingContact.name} is already registered.`);
      } else {
        setPhoneError(`This phone number is already registered to ${result.existingContact.name}.`);
      }
      return;
    }

    setNameError("");
    setPhoneError("");
    setName("");
    setPhoneNumber("");
  };

  return (
    <form className="contact-form" onSubmit={handleAdd}>
      <div className="form-copy">
        <h2>Add Contact</h2>
        <p>Enter a name and phone number.</p>
      </div>

      <div className="form-fields">
        <TextField
          className="contact-field"
          id="contact-name"
          label="Full name"
          placeholder="e.g. Jamie Lee"
          variant="outlined"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setNameError("");
          }}
          autoComplete="name"
          error={Boolean(nameError)}
          helperText={nameError}
          fullWidth
        />
        <TextField
          className="contact-field"
          id="contact-phone"
          label="Phone number"
          placeholder="(555) 123-4567"
          variant="outlined"
          value={phoneNumber}
          onChange={(event) => {
            setPhoneNumber(event.target.value);
            setPhoneError("");
          }}
          autoComplete="tel"
          type="tel"
          error={Boolean(phoneError)}
          helperText={phoneError}
          fullWidth
        />
        <Button className="add-button" size="large" type="submit" variant="contained">
          Add Contact
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
