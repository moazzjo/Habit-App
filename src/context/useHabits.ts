import { useContext } from "react";
import { HabitContext, type ContextType } from "./HabitContext";

export function useHabits(): ContextType {
    const context = useContext(HabitContext);
    if (!context) {
        throw new Error("useHabits must be used inside HabitProvider");
    }
    return context;
}
