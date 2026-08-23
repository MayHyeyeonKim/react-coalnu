import { create } from "zustand";

type User = {
  name: string;
  email: string;
};

type UserStore = {
  user: User[] | null;
  setUser: () => void;
};

const useUserStore = create<UserStore>(() => ({
  user: null,
  setUser: () => {},
}));

export default useUserStore;
