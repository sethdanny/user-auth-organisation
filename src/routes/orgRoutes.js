const express = require('express');
const {
  getAllOrganisations,
  getOrganisationById,
  createOrganisation,
} = require('../controllers/orgController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.get('/', authenticate, getAllOrganisations);
router.get('/:orgId', authenticate, getOrganisationById);
router.post('/', authenticate, createOrganisation);

module.exports = router;
