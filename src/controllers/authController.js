const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Organisation, OrganisationsOnUsers } = require('../models');
const dotenv = require('dotenv');

dotenv.config();

const generateToken = (user) => {
  return jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const register = async (req, res) => {
  const { firstName, lastName, email, password, phone } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(422).json({
      errors: [
        { field: 'firstName', message: 'First name is required' },
        { field: 'lastName', message: 'Last name is required' },
        { field: 'email', message: 'Email is required' },
        { field: 'password', message: 'Password is required' },
      ],
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
    });

    const organisation = await Organisation.create({
      name: `${firstName}'s Organisation`,
      users: [{ userId: user.userId }],
    });

    await OrganisationsOnUsers.create({
      userId: user.userId,
      organisationId: organisation.orgId,
    });

    const token = generateToken(user);

    return res.status(201).json({
      status: 'success',
      message: 'Registration successful',
      data: {
        accessToken: token,
        user: {
          userId: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
        },
      },
    });
  } catch (error) {
    return res.status(400).json({
      status: 'Bad request',
      message: 'Registration unsuccessful',
      statusCode: 400,
    });
}
}

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({
      errors: [
        { field: 'email', message: 'Email is required' },
        { field: 'password', message: 'Password is required' },
      ],
    });
  }

  try {
    const user = await User.findOne({ where: { email } });
    console.log('User:', user); 
    if(!user) return res.status(401).json({error: 'Invalid credentials'});

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({error: 'Invalid password!'});
    
    const token = generateToken(user);

    return res.status(200).json({
      status: 'success',
      message: 'Login successful',
      data: {
        accessToken: token,
        user: {
          userId: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
        },
      },
    });
  } catch (error) {
    console.error('Error in login:', error);
    return res.status(400).json({
      status: 'Bad request',
      message: 'Authentication failed',
      statusCode: 400,
    });
  }
};

module.exports = { register, login };