const express = require('express');
const { isLoggedIn, protect } = require('../controllers/authController');
const { getLoginForm } = require('../controllers/loginController');
const {
  getOverview,
  getTour,
  getAccount,
  updateUserData,
  resizeUserPhoto,
  uploadUserPhoto,
} = require('../controllers/viewController');

const router = express.Router();

router.route('/').get(isLoggedIn, getOverview);
router.route('/tours/:slug').get(isLoggedIn, getTour);
router.route('/login').get(isLoggedIn, getLoginForm);
router.route('/me').get(protect, getAccount);
router
  .route('/submit-user-data')
  .post(protect, resizeUserPhoto, uploadUserPhoto, updateUserData);

module.exports = router;
