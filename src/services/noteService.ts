// noteService.ts

import sql from 'mssql';
import config from '../dbconfig';

// Define the Note interface (replace any with actual types)
interface Note {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
}

// Function to create a new note
export const createNote = async (title: string, content: string): Promise<Note> => {
    try {
        // Implement logic to create a new note in the database
        const pool = await sql.connect(config as sql.config);
        const result = await pool.request()
            .input('title', sql.NVarChar, title)
            .input('content', sql.NVarChar, content)
            .query('INSERT INTO notes (title, content) OUTPUT INSERTED.* VALUES (@title, @content)');
        
        return result.recordset[0] as Note;
    } catch (error) {
        console.error('Error creating note:', error);
        throw new Error('Failed to create note');
    }
};

// Function to fetch all notes
export const getAllNotes = async (): Promise<Note[]> => {
    try {
        // Implement logic to fetch all notes from the database
        const pool = await sql.connect(config as sql.config);
        const result = await pool.request().query('SELECT * FROM notes');

        return result.recordset as Note[];
    } catch (error) {
        console.error('Error fetching notes:', error);
        throw new Error('Failed to fetch notes');
    }
};

// Function to fetch a note by ID
export const getNoteById = async (id: number): Promise<Note | null> => {
    try {
        // Implement logic to fetch a note by ID from the database
        const pool = await sql.connect(config as sql.config);
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM notes WHERE id = @id');

        return result.recordset[0] || null;
    } catch (error) {
        console.error('Error fetching note by ID:', error);
        throw new Error('Failed to fetch note by ID');
    }
};

// Function to update a note by ID
export const updateNoteById = async (id: number, title: string, content: string): Promise<boolean> => {
    try {
        // Implement logic to update a note by ID in the database
        const pool = await sql.connect(config as sql.config);
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('title', sql.NVarChar, title)
            .input('content', sql.NVarChar, content)
            .query('UPDATE notes SET title = @title, content = @content WHERE id = @id');

        return result.rowsAffected[0] === 1;
    } catch (error) {
        console.error('Error updating note by ID:', error);
        throw new Error('Failed to update note by ID');
    }
};

// Function to delete a note by ID
export const deleteNoteById = async (id: number): Promise<boolean> => {
    try {
        // Implement logic to delete a note by ID from the database
        const pool = await sql.connect(config as sql.config);
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM notes WHERE id = @id');

        return result.rowsAffected[0] === 1;
    } catch (error) {
        console.error('Error deleting note by ID:', error);
        throw new Error('Failed to delete note by ID');
    }
};
