const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const fs = require('fs');
const path = require('path');

const userStorePath = path.join(__dirname, '../data/userStore.json');

const getUsersFromStore = () => {
  try {
    const data = fs.readFileSync(userStorePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const saveUsersToStore = (users) => {
  fs.writeFileSync(userStorePath, JSON.stringify(users, null, 2));
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if Database is connected
    if (require('mongoose').connection.readyState !== 1) {
      console.warn('⚠️ MongoDB disconnected. Using Mock Auth for login.');
      
      const users = getUsersFromStore();
      const user = users.find(u => u.email === email);

      if (user) {
        if (user.password === password) {
          return res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
          });
        } else {
          return res.status(401).json({ message: 'Password incorrect' });
        }
      } else {
        return res.status(404).json({ message: 'Account not found' });
      }
    }

    const user = await User.findOne({ email });

    if (user) {
      if (await user.matchPassword(password)) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          isAdmin: user.isAdmin,
          token: generateToken(user._id)
        });
      } else {
        res.status(401).json({ message: 'Password incorrect' });
      }
    } else {
      res.status(404).json({ message: 'Account not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    // Check if Database is connected
    if (require('mongoose').connection.readyState !== 1) {
      console.warn('⚠️ MongoDB disconnected. Using Mock Auth for registration.');
      
      const users = getUsersFromStore();
      if (users.find(u => u.email === email)) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const newUser = {
        _id: 'mock_id_' + Date.now(),
        name,
        email,
        phone,
        password,
        isAdmin: false
      };

      users.push(newUser);
      saveUsersToStore(users);

      return res.status(201).json({
        ...newUser,
        token: generateToken(newUser._id)
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const user = await User.create({
      name,
      email,
      phone,
      password
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { authUser, registerUser };
