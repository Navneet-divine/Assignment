"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNote, deleteNote, updateNote } from "@/store/notesSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Note {
  id: string;
  text: string;
}

export default function Notes() {
  const notes = useSelector((state: { notes: Note[] }) => state.notes);
  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  const handleAdd = () => {
    if (!text.trim()) return;

    if (editId) {
      dispatch(updateNote({ id: editId, text }));
      setEditId(null);
    } else {
      dispatch(addNote({ id: Date.now().toString(), text }));
    }

    setText("");
  };

  const handleEdit = (noteId: string, noteText: string) => {
    setText(noteText);
    setEditId(noteId);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteNote(id));
    if (editId === id) {
      setEditId(null);
      setText("");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <div className="flex gap-2">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a note..."
        />
        <Button onClick={handleAdd}>{editId ? "Update" : "Add"}</Button>
      </div>

      <div className="space-y-2">
        {notes.map((note: Note) => (
          <Card key={note.id} className="flex items-center justify-between p-4">
            <span>{note.text}</span>
            <div className="space-x-2">
              <Button
                variant="outline"
                onClick={() => handleEdit(note.id, note.text)}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(note.id)}
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
