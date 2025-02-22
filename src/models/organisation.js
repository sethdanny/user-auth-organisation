const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Organisation', {
    orgId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
    }
  });
};
