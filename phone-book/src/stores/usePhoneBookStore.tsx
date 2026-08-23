import { create } from "zustand";

type Contact = {
  id: number;
  name: string;
  phoneNumber: string;
};

type ContactMutationResult =
  | {
      success: true;
    }
  | {
      success: false;
      reason: "duplicate-name" | "duplicate-phone";
      existingContact: Contact;
    };

type PhoneBookStore = {
  phoneBook: Contact[];
  addContact: (name: string, phoneNumber: string) => ContactMutationResult;
  updateContact: (id: number, name: string, phoneNumber: string) => ContactMutationResult;
  deleteContact: (id: number) => void;
};

const normalizePhone = (phoneNumber: string) => phoneNumber.replace(/\D/g, "");
const normalizeName = (name: string) => name.trim().replace(/\s+/g, " ").toLowerCase();

const usePhoneBookStore = create<PhoneBookStore>((set, get) => ({
  phoneBook: [],
  addContact: (name, phoneNumber) => {
    const normalizedName = normalizeName(name);
    const normalizedPhone = normalizePhone(phoneNumber);

    const contactWithSameName = get().phoneBook.find((contact) => normalizeName(contact.name) === normalizedName);

    if (contactWithSameName) {
      return {
        success: false,
        reason: "duplicate-name",
        existingContact: contactWithSameName,
      };
    }

    const contactWithSamePhone = get().phoneBook.find(
      (contact) => normalizePhone(contact.phoneNumber) === normalizedPhone,
    );

    if (contactWithSamePhone) {
      return {
        success: false,
        reason: "duplicate-phone",
        existingContact: contactWithSamePhone,
      };
    }

    set((state) => ({
      phoneBook: [
        ...state.phoneBook,
        {
          id: Date.now(),
          name,
          phoneNumber,
        },
      ],
    }));
    return { success: true };
  },
  updateContact: (id, name, phoneNumber) => {
    const normalizedName = normalizeName(name);
    const normalizedPhone = normalizePhone(phoneNumber);
    const otherContacts = get().phoneBook.filter((contact) => contact.id !== id);

    const contactWithSameName = otherContacts.find((contact) => normalizeName(contact.name) === normalizedName);

    if (contactWithSameName) {
      return {
        success: false,
        reason: "duplicate-name",
        existingContact: contactWithSameName,
      };
    }

    const contactWithSamePhone = otherContacts.find(
      (contact) => normalizePhone(contact.phoneNumber) === normalizedPhone,
    );

    if (contactWithSamePhone) {
      return {
        success: false,
        reason: "duplicate-phone",
        existingContact: contactWithSamePhone,
      };
    }

    set((state) => ({
      phoneBook: state.phoneBook.map((contact) =>
        contact.id === id ? { ...contact, name, phoneNumber } : contact,
      ),
    }));

    return { success: true };
  },
  deleteContact: (id) =>
    set((state) => ({
      phoneBook: state.phoneBook.filter((contact) => contact.id !== id),
    })),
}));

export default usePhoneBookStore;

// get() // 읽기
// set() // 변경하기
