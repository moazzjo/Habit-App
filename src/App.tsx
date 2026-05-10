import { Header } from "./components/Header";
import { HabitForm } from "./components/HabitForm";
import { HabitsList } from "./components/HabitsList";


export default function App() {
  return <div className="max-w-2xl mx-auto p-3 sm:p-4 flex flex-col gap-4">
    <Header />
    <HabitForm />
    <HabitsList />
  </div>
}
