import { isSameDay, addMonths, subMonths, isSameMonth } from "date-fns";
import { HabitContext, type Habit } from "./HabitContext";
import { useLocalStorage } from "../hooks/useLocalStorage";

export function HabitProvider({ children }: { children: React.ReactNode }) {
    const [habits, setHabits] = useLocalStorage<Habit[]>("habits", []);

    // JSON.parse turns Date strings back into strings — revive them
    const hydratedHabits = habits.map(habit => ({
        ...habit,
        completions: habit.completions.map(c => new Date(c)),
    }))
    const [storedMonth, setCurrentMonth] = useLocalStorage<string>("currentMonth", new Date().toISOString());
    const currentMonth = new Date(storedMonth);

    function addHabit(name: string) {
        setHabits(curr => [...curr, {id: Date.now(), name, completions: [new Date()]}])
    }

    function deleteHabit(id: number) {
        setHabits(curr => curr.filter(habit => habit.id !== id))
    }

    function toggleHabitCompletion(id: number, date: Date) {
        setHabits(curr => curr.map(habit => {
            if (habit.id !== id) return habit
            const completions = habit.completions.map(c => new Date(c))
            const alreadyDone = completions.some(c => isSameDay(c, date))
            return {
                ...habit,
                completions: alreadyDone
                    ? completions.filter(c => !isSameDay(c, date))
                    : [...completions, date]
            }
        }))
    }

    function goToPreviousMonth() {
        setCurrentMonth(curr => subMonths(new Date(curr), 1).toISOString())
    }

    function goToNextMonth() {
        setCurrentMonth(curr => {
            const next = addMonths(new Date(curr), 1)
            return isSameMonth(next, new Date()) || next < new Date() ? next.toISOString() : curr
        })
    }

    return (
        <HabitContext.Provider value={{ habits: hydratedHabits, currentMonth, addHabit, deleteHabit, toggleHabitCompletion, goToPreviousMonth, goToNextMonth }}>
            {children}
        </HabitContext.Provider>
    )
}
