# Habit Tracker

A minimal habit tracking app built with React, TypeScript, and Tailwind CSS. Track your daily habits, view streaks, and browse completion history by month.

## Features

- Add and delete habits
- Mark habits as complete for any past day
- Streak counter per habit
- Browse history month by month (Previous / Next)
- Data persists across page refreshes via localStorage
- Fully responsive — works on all screen sizes

## Tech Stack

- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Vite](https://vite.dev)
- [date-fns](https://date-fns.org)

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Button.tsx
│   ├── Header.tsx
│   ├── HabitForm.tsx
│   └── HabitsList.tsx
├── context/
│   ├── HabitContext.ts     # Context type + createContext
│   ├── HabitProvider.tsx   # State, localStorage, context value
│   └── useHabits.ts        # Custom hook to consume context
├── hooks/
│   └── useLocalStorage.ts  # Generic localStorage hook
├── App.tsx
└── main.tsx
```
