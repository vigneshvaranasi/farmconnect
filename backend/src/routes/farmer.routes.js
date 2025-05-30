import express from 'express';
import {
  requestCredentials,
  approveCredentials,
  rejectCredentials,
  getFarmerRequests,
  checkRequestStatus
} from '../controllers/farmer.controller.js';
import {
  validateFarmerCredentialRequest,
  validateFarmerApproval
} from '../middlewares/validation.middleware.js';
import { protect, authorize } from '../middlewares/auth.middleware.js';

const router = express.Router();


router.post('/request-credentials', validateFarmerCredentialRequest, requestCredentials);


router.get('/check-status/:phoneNumber', checkRequestStatus);


router.get('/requests', getFarmerRequests);


router.post('/approve/:farmerId', validateFarmerApproval, approveCredentials);


router.post('/reject/:farmerId', rejectCredentials);

export default router;
