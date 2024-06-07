import { Request, Response } from 'express';
import sql from 'mssql';
import { Note } from '../models/notes';
import config from '../dbconfig';

// Function to connect to the database
const connectToDB = async () => {
    await sql.connect(config as sql.config); 
  };
export const createNote = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('title', sql.VarChar, title)
      .input('content', sql.Text, content)
      .query('INSERT INTO Notes (Title, Content, CreatedAt) VALUES (@title, @content, GETDATE()); SELECT SCOPE_IDENTITY() AS id;');
    
    const newNote: Note = {
      id: result.recordset[0].id,
      title,
      content,
      createdAt: new Date(),
    };
    
    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getNotes = async (req: Request, res: Response) => {
  try {
    const pool = await sql.connect();
    const result = await pool.request().query('SELECT * FROM Notes;');
    res.status(200).json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getNoteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pool = await sql.connect();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM Notes WHERE Id = @id;');
    
    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Note not found' });
    }
    
    res.status(200).json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const pool = await sql.connect();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .input('title', sql.VarChar, title)
      .input('content', sql.Text, content)
      .query('UPDATE Notes SET Title = @title, Content = @content WHERE Id = @id;');
    
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: 'Note not found' });
    }
    
    res.status(200).json({ message: 'Note updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pool = await sql.connect();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Notes WHERE Id = @id;');
    
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: 'Note not found' });
    }
    
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (err: Error) {
    res.status(500).json({ error: err.message });
  }
};
