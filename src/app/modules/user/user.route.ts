import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/', UserController.createUser);
router.put('/:userId/orders', UserController.newProductAdd);
router.get('/:userId/orders/total-price', UserController.getTotalPrice);
router.get('/:userId/orders', UserController.getSingleUserOrders);
router.put('/:userId', UserController.updateUser);
router.get('/:userId', UserController.getSingleUser);
router.delete('/:userId', UserController.deleteSingleUser);
router.get('/', UserController.getAllUsers);

export const UserRoutes = router;
