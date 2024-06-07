import { Router } from 'express';
import { createNote, getNotes, getNoteById, updateNote, deleteNote } from '../controllers/noteController';

const router = Router();

router.post('/notes', createNote);
router.get('/notes', getNotes);
router.get('/notes/:id', getNoteById);
router.put('/notes/:id', updateNote);
router.delete('/notes/:id', deleteNote);

export default router;
