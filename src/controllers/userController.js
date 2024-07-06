const { User } = require('../models');

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        status: 'Not found',
        message: 'User not found'
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'User retrieved successfully',
      data: {
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    return res.status(400).json({
      status: 'Bad request',
      message: 'Error retrieving user',
    });
  }
};

module.exports = { getUserById };
