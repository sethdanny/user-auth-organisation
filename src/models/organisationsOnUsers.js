const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('OrganisationsOnUsers', {
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    organisationId: {
      type: DataTypes.UUID,
      allowNull: false
    }
  });
};
