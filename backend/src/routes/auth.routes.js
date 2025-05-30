import express from 'express';
import {
  registerCustomer,
  registerTrader,
  login,
  getProfile
} from '../controllers/auth.controller.js';
import {
  validateCustomerRegistration,
  validateTraderRegistration,
  validateLogin
} from '../middlewares/validation.middleware.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();


router.post('/register/customer', validateCustomerRegistration, registerCustomer);


router.post('/register/trader', validateTraderRegistration, registerTrader);


router.post('/login', validateLogin, login);


router.get('/profile', protect, getProfile);

export default router;
