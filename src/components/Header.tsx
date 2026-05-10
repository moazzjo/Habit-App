import { Button } from "./Button"
import { useHabits } from "../context/useHabits"
import { isToday, isSameMonth, format } from "date-fns"

export function Header() {
  const { habits, currentMonth, goToPreviousMonth, goToNextMonth } = useHabits()
  const doneToday = habits.filter(habit => habit.completions.some(c => isToday(c))).length
  const isCurrentMonth = isSameMonth(currentMonth, new Date())

  return (
    <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="font-bold text-cyan-400 text-2xl sm:text-3xl">Habit Tracker</h1>
        <span className="text-zinc-500 text-sm">{doneToday}/{habits.length} done today</span>
      </div>
      <div className="flex items-center justify-between sm:flex-col sm:items-end gap-1">
        <span className="text-zinc-500 text-base sm:text-lg">{format(currentMonth, "MMMM yyyy")}</span>
        <div className="flex items-center gap-2">
          <Button onClick={goToPreviousMonth}>Previous</Button>
          <Button onClick={goToNextMonth} disabled={isCurrentMonth}>Next</Button>
        </div>
      </div>
    </header>
  )
}
