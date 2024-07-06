const { Sequelize } = require('sequelize');
const UserModel = require('./user');
const OrganisationModel = require('./organisation');
const OrganisationsOnUsersModel = require('./organisationsOnUsers');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URI, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

const User = UserModel(sequelize);
const Organisation = OrganisationModel(sequelize);
const OrganisationsOnUsers = OrganisationsOnUsersModel(sequelize);

User.belongsToMany(Organisation, { through: OrganisationsOnUsers, foreignKey: 'userId' });
Organisation.belongsToMany(User, { through: OrganisationsOnUsers, foreignKey: 'organisationId' }); 

OrganisationsOnUsers.belongsTo(User, { foreignKey: 'userId' });
OrganisationsOnUsers.belongsTo(Organisation, { foreignKey: 'organisationId' });

sequelize.sync({ alter: true });

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);  
  }
};

module.exports = {
  sequelize,
  testConnection,
  User,
  Organisation,
  OrganisationsOnUsers
};