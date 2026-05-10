import { createContext } from "react";

export type Habit = {id: number; name: string; completions: Date[]}

export type ContextType = {
    habits: Habit[]
    currentMonth: Date
    addHabit: (name: string) => void
    deleteHabit: (id: number) => void
    toggleHabitCompletion: (id: number, date: Date) => void
    goToPreviousMonth: () => void
    goToNextMonth: () => void
}

export const HabitContext = createContext<ContextType | null>(null);
