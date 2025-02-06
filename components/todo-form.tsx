"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useTodoStore } from "@/store/todo";

const TodoForm = () => {
  const {
    addTask,
    deleteTask,
    tasks,
    editingId,
    editedTitle,
    setEditingId,
    setEditedTitle,
    saveEditedTask,
  } = useTodoStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const task = (e.currentTarget[0] as HTMLInputElement).value.trim();
    if (task.length !== 0) {
      addTask(task);
    }
    e.currentTarget.reset();
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="text-center">
        <h2 className="font-bold">Add Todo</h2>
        <form onSubmit={handleSubmit} className="flex items-center gap-x-2">
          <Input type="text" placeholder="Add todo" className="w-full" />
          <Button type="submit">Add</Button>
        </form>
      </CardHeader>
      <CardContent>
        <ScrollArea className="flex flex-col gap-y-3 h-[250px]">
          {tasks.length ? (
            tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-x-2 w-full justify-between border-[1px] rounded-md p-2"
              >
                {editingId === task.id ? (
                  <>
                    <Input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                    />
                    <Button onClick={saveEditedTask}>Save</Button>
                    <Button onClick={() => setEditingId(null)}>Cancel</Button>
                  </>
                ) : (
                  <>
                    <span className="flex-1">{task.title}</span>
                    <div className="flex gap-x-2">
                      <Button onClick={() => deleteTask(task.id)}>
                        Delete
                      </Button>
                      <Button
                        onClick={() => {
                          setEditingId(task.id);
                          setEditedTitle(task.title);
                        }}
                      >
                        Edit
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center">
              <p className="text-center">No tasks found ❌</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TodoForm;
