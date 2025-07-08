"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNote, deleteNote, updateNote } from "@/store/notesSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface Note {
  id: string;
  text: string;
}

interface SummaryMap {
  [id: string]: string;
}

export default function Notes() {
  const notes = useSelector((state: { notes: Note[] }) => state.notes);
  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [summaries, setSummaries] = useState<SummaryMap>({});
  const [loading, setLoading] = useState<string | null>(null);

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

    setSummaries((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const summarizeNote = async (id: string, text: string) => {
    setLoading(id);

    try {
      const axios = (await import("axios")).default;
      const res = await axios.post("/api/summarize", { text });
      const data = res.data;

      setSummaries((prev) => ({
        ...prev,
        [id]: data.summary || "No summary available.",
      }));
    } catch {
      setSummaries((prev) => ({
        ...prev,
        [id]: "❌ Error getting summary.",
      }));
    } finally {
      setLoading(null);
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
          <Card key={note.id} className="p-4 space-y-2">
            <div className="flex justify-between items-center">
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
            </div>

            <div className="text-right">
              <Button
                size="sm"
                variant="secondary"
                disabled={loading === note.id}
                onClick={() => summarizeNote(note.id, note.text)}
              >
                {loading === note.id ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Summarizing...
                  </>
                ) : (
                  "Summarize with AI"
                )}
              </Button>
            </div>

            {summaries[note.id] && (
              <div className="text-sm text-muted-foreground mt-2">
                {summaries[note.id]}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
