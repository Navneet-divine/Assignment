"use client";

import { useDispatch, useSelector } from "react-redux";

import {
  addTask,
  toggleDone,
  updateTask,
  deleteTask,
} from "@/store/tasksSlice";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface Task {
  id: string;
  text: string;
  done: boolean;
}

export default function Tasks() {
  const tasks = useSelector((state: { tasks: Task[] }) => state.tasks);
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  const handleAddOrUpdate = () => {
    if (!text.trim()) return;

    if (editId) {
      dispatch(updateTask({ id: editId, text }));
      setEditId(null);
    } else {
      dispatch(addTask({ id: Date.now().toString(), text, done: false }));
    }

    setText("");
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <div className="flex gap-2">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a task..."
        />
        <Button onClick={handleAddOrUpdate}>{editId ? "Update" : "Add"}</Button>
      </div>

      <div className="space-y-2">
        {tasks.map((task: Task) => (
          <Card key={task.id} className="flex justify-between items-center p-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => dispatch(toggleDone(task.id))}
              />
              <span className={task.done ? "line-through text-gray-500" : ""}>
                {task.text}
              </span>
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  setText(task.text);
                  setEditId(task.id);
                }}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                onClick={() => dispatch(deleteTask(task.id))}
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
