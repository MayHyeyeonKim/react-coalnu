import { create } from "zustand";

type CounterStore = {
  count: number;
  blockedAttempts: number;
  increase: () => void;
  decrease: () => void;
  increaseBy: (value: number) => void;
};

const counterSotore = create<CounterStore>((set) => ({
  count: 0,
  blockedAttempts: 0,
  increase: () =>
    set((state) => ({
      count: state.count + 1,
      blockedAttempts: 0,
    })),
  decrease: () =>
    set((state) => {
      if (state.count > 0) {
        return {
          count: state.count - 1,
          blockedAttempts: 0,
        };
      }
      return {
        count: state.count,
        blockedAttempts: state.blockedAttempts + 1,
      };
    }),

  increaseBy: (value) =>
    set((state) => ({
      count: state.count + value,
      blockedAttempts: 0,
    })),
}));

export default counterSotore;
