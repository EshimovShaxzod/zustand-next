import { create } from "zustand";

type TaskT = {
  id: string;
  title: string;
  createdAt: Date;
};

type TodoStore = {
  tasks: TaskT[];
  editingId: string | null;
  editedTitle: string;
  addTask: (task: string) => void;
  deleteTask: (taskId: string) => void;
  editTask: (taskId: string, newTitle: string) => void;
  setEditingId: (taskId: string | null) => void;
  setEditedTitle: (title: string) => void;
  saveEditedTask: () => void;
};

export const useTodoStore = create<TodoStore>((set, get) => ({
  tasks: [],
  editingId: null,
  editedTitle: "",

  addTask: (task) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        { id: crypto.randomUUID(), title: task, createdAt: new Date() },
      ],
    })),

  deleteTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    })),

  editTask: (taskId, newTitle) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, title: newTitle } : task
      ),
    })),

  setEditingId: (taskId) => set({ editingId: taskId }),
  setEditedTitle: (title) => set({ editedTitle: title }),

  saveEditedTask: () => {
    const { editingId, editedTitle, editTask, setEditingId, setEditedTitle } =
      get();
    if (editingId) {
      editTask(editingId, editedTitle);
      setEditingId(null);
      setEditedTitle("");
    }
  },
}));
