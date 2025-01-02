import { create } from "zustand";
import { persist } from "zustand/middleware";

const useTimerStore = create(
  persist(
    (set) => ({
      timers: [],
      addTimer: (timer) =>
        set((state) => ({ timers: [...state.timers, timer] })),
      removeTimer: (id) =>
        set((state) => ({
          timers: state.timers.filter((timer) => id !== timer.id),
        })),
      updateTimerField: (
        id,
        updates // Nouvelle fonction pour mettre à jour n'importe quel champ
      ) =>
        set((state) => ({
          timers: state.timers.map((timer) =>
            timer.id === id ? { ...timer, ...updates } : timer
          ),
        })),
    }),
    {
      name: "timerStorage",
    }
  )
);

export default useTimerStore;
