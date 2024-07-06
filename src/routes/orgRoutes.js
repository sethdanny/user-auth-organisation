const express = require('express');
const {
  getAllOrganisations,
  getOrganisationById,
  createOrganisation,
  addUserToOrganisation
} = require('../controllers/orgController');
const authenticate = require('../middleware/authenticate.js');

const router = express.Router();

router.get('/', authenticate, getAllOrganisations);
router.get('/:orgId', authenticate, getOrganisationById);
router.post('/', authenticate, createOrganisation);
router.post('/:orgId/users', addUserToOrganisation);


module.exports = router;
