import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/', UserController.createUser);
router.get('/:userId', UserController.getSingleUser);
router.delete('/:userId', UserController.deleteSingleUser);
router.get('/', UserController.getAllUsers);

export const UserRoutes = router;
