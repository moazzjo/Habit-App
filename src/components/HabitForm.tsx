import { useState } from "react"
import { useHabits } from "../context/useHabits"

export function HabitForm() {
    const [habitName, setHabitName] = useState("")
    const { addHabit } = useHabits()

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (habitName.trim() === "") return
        addHabit(habitName)
        setHabitName("")
    }

    return <form className="flex gap-2" onSubmit={handleSubmit}>
        <input
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            className="bg-zinc-200 text-zinc-700 px-3 sm:px-4 py-2 rounded-lg flex-1 outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 text-sm sm:text-base min-w-0"
            type="text"
            placeholder="New habit.."
        />
        <button
            disabled={habitName.trim() === ""}
            className="bg-cyan-400 hover:bg-cyan-600 transition-colors text-white px-3 sm:px-4 py-2 rounded-lg tracking-wide disabled:opacity-30 disabled:cursor-not-allowed text-sm sm:text-base shrink-0"
            type="submit"
        >
            Add Habit
        </button>
    </form>
}
