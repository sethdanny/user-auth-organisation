const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('OrganisationsOnUsers', {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'User',
        key: 'userId'
      }
    },
    organisationId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Organisation',
        key: 'orgId'
      }
    }
  });
};
