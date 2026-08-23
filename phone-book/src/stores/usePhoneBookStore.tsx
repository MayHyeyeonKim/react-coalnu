import { create } from "zustand";

type Contact = {
  id: number;
  name: string;
  phoneNumber: string;
};

type PhoneBookStore = {
  phoneBook: Contact[];
  addContact: (name: string, phoneNumber: string) => void;
};

const usePhoneBookStore = create<PhoneBookStore>((set) => ({
  phoneBook: [],
  addContact: (name, phoneNumber) =>
    set((state) => ({
      phoneBook: [...state.phoneBook, { id: Date.now(), name, phoneNumber }],
    })),
}));

export default usePhoneBookStore;
