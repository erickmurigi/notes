import express from 'express';
import { createNoteController, getNotesController, getNoteByIdController, updateNoteController, deleteNoteController } from '../controllers/noteController';

const router = express.Router();

router.post('/', createNoteController);
router.get('/', getNotesController);
router.get('/:id', getNoteByIdController);
router.put('/:id', updateNoteController);
router.delete('/:id', deleteNoteController);

export default router;
