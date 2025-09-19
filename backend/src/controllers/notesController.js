import Note from "../model/Note.js";

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); //-1 means latest first
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getting all the notes", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function getNoteByid(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).json({ message: "note not found" });
    } else {
      res.status(200).json(note);
    }
  } catch (error) {
    console.error("Error in getting all the notes", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title: title, content: content });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error in getting all the notes", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title: title,
        content: content,
      },
      { new: true }
    );

    if (!updateNote) {
      res.status(404).json({ message: "note not found" });
    } else {
      res.status(200).json(updatedNote);
    }
  } catch (error) {
    console.error("Error in getting all the notes", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    } else {
      return res.status(200).json({ message: "Note deleted sucessfully" });
    }
  } catch (error) {
    console.error("Error in getting all the notes", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
