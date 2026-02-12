# Kanban Board – Frontend Assignment

## Project Overview

This project is a simple Kanban board built using React and Tailwind CSS.  
The main goal was to implement optimistic UI updates with simulated backend behavior.

The app allows users to log in (mock), create tasks, move them between columns using drag and drop, and delete them.

## Key Features

- Simple login using localStorage
- Three columns: To Do, In Progress, Done
- Add new tasks
- Delete tasks
- Drag & Drop between columns
- Simulated backend delay (1–2 seconds)
- 20% random API failure
- Automatic rollback on failure
- Error toast notification

## Optimistic UI Logic

Note: The backend is simulated using a promise-based function to mimic real-world latency and random failures.

When a task is moved, added, or deleted:

1. The UI updates immediately.
2. A simulated API call runs in the background.
3. If the API succeeds, nothing changes.
4. If it fails, the previous state is restored and an error message is shown.

This approach improves responsiveness while maintaining consistency.

## How to Run the Project

Install dependencies:

