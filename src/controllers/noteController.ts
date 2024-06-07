import { Request, Response } from 'express';
import { createNote, getAllNotes, getNoteById, updateNoteById, deleteNoteById } from '../services/noteService';

export const createNoteController = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract data from request body
    const { title, content } = req.body;
    // Call service function to create note
    const note = await createNote(title, content);
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Implement other controller methods (getAllNotesController, getNoteByIdController, etc.)
