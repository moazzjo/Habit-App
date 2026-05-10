import { Button } from "./Button"
import { eachDayOfInterval, startOfMonth, endOfMonth, format, isFuture, isSameDay, subDays } from "date-fns"
import { useHabits } from "../context/useHabits";
import { type Habit } from "../context/HabitContext";

export function HabitsList() {
    const { habits, currentMonth, deleteHabit, toggleHabitCompletion } = useHabits()

    if (habits.length === 0) {
        return <p className="text-center text-zinc-500 py-8">No habits yet. Add one to get started!</p>
    }

    return <div className="flex flex-col gap-3">
        {habits.map((habit) => (
            <HabitItem key={habit.id} habit={habit} currentMonth={currentMonth} deleteHabit={deleteHabit} toggleHabitCompletion={toggleHabitCompletion} />
        ))}
    </div>
}

type HabitItemProps = {
    habit: Habit;
    currentMonth: Date;
    deleteHabit: (id: number) => void;
    toggleHabitCompletion: (id: number, date: Date) => void;
}

function HabitItem({habit, currentMonth, deleteHabit, toggleHabitCompletion}: HabitItemProps) {
    const visibleDays = eachDayOfInterval({
        start: startOfMonth(currentMonth),
        end: endOfMonth(currentMonth),
    })

    const streak = getStreak(habit.completions)

    return <div className="rounded-2xl p-3 sm:p-5 bg-pink-100 flex flex-col gap-3 sm:gap-4 shadow-sm border border-pink-200">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
                <span className="font-semibold text-pink-900 truncate">{habit.name}</span>
                {streak !== 0 && <span className="text-xs sm:text-sm text-pink-400 bg-pink-200 px-2 py-0.5 rounded-full shrink-0">{streak} day streak</span>}
            </div>
            <Button variant="ghost-destructive" className="shrink-0 px-2! sm:px-4! text-sm" onClick={() => deleteHabit(habit.id)}>Delete</Button>
        </div>
        <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
            {visibleDays.map((date) => (
                <button
                    key={date.toISOString()}
                    disabled={isFuture(date)}
                    onClick={() => toggleHabitCompletion(habit.id, date)}
                    className={[
                        'flex flex-col items-center justify-center py-1.5 sm:py-2 rounded-lg transition-colors',
                        'disabled:opacity-30 disabled:cursor-not-allowed',
                        habit.completions.some(d => isSameDay(d, date))
                            ? 'bg-pink-500 text-white hover:bg-pink-600'
                            : 'bg-gray-500 text-white hover:bg-gray-600'
                    ].join(' ')}
                >
                    <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wide leading-none">{format(date, "EEE")}</span>
                    <span className="text-xs sm:text-sm font-medium pt-1 leading-none">{format(date, "d")}</span>
                </button>
            ))}
        </div>
    </div>
}

function getStreak(completions: Date[]): number {
    let streak = 0;
    let currentDate = new Date();
    while(completions.some(c => isSameDay(c, currentDate))){
        streak++;
        currentDate = subDays(currentDate, 1);
    }
    return streak;
}
