import { create } from "zustand";

type Contact = {
  id: number;
  name: string;
  phoneNumber: string;
};

type AddContactResult =
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
  addContact: (name: string, phoneNumber: string) => AddContactResult;
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
}));

export default usePhoneBookStore;

// get() // 읽기
// set() // 변경하기
