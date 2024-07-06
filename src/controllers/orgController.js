const { Organisation, OrganisationsOnUsers } = require('../models');

const getAllOrganisations = async (req, res) => {
  try {
    const organisations = await OrganisationsOnUsers.findAll({
      where: { userId: req.user.userId },
      include: [Organisation],
    });

    return res.status(200).json({
      status: 'success',
      message: 'Organisations retrieved successfully',
      data: {
        organisations: organisations.map((org) => org.Organisation),
      },
    });
  } catch (error) {
    return res.status(400).json({
      status: 'Bad request',
      message: 'Error retrieving organisations',
    });
  }
};

const getOrganisationById = async (req, res) => {
  const { orgId } = req.params;

  try {
    const organisation = await Organisation.findByPk(orgId);

    if (!organisation) {
      return res.status(404).json({ status: 'Not found', message: 'Organisation not found' });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Organisation retrieved successfully',
      data: {
        orgId: organisation.orgId,
        name: organisation.name,
        description: organisation.description,
      },
    });
  } catch (error) {
    return res.status(400).json({
      status: 'Bad request',
      message: 'Error retrieving organisation',
    });
  }
};

const createOrganisation = async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(422).json({
      errors: [{ field: 'name', message: 'Name is required' }],
    });
  }

  try {
    const organisation = await Organisation.create({
      name,
      description,
    });

    await OrganisationsOnUsers.create({
      userId: req.user.userId,
      organisationId: organisation.orgId,
    });

    return res.status(201).json({
      status: 'success',
      message: 'Organisation created successfully',
      data: {
        orgId: organisation.orgId,
        name: organisation.name,
        description: organisation.description,
      },
    });
  } catch (error) {
    return res.status(400).json({
      status: 'Bad request',
      message: 'Error creating organisation',
    });
  }
};

module.exports = { getAllOrganisations, getOrganisationById, createOrganisation };
