const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'secure_12';

const rewardTemplates = [
  { description: 'Red Bus 100% Offer', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Redbus_logo.jpg/1200px-Redbus_logo.jpg', revealed: false },
  { description: 'Pizza Hut Free Pizza', image: 'https://play-lh.googleusercontent.com/aVcnk6c53Z3KKRTi0ivDYucToT1SEfPrOUaLr3b7HVeVC6nXtVDaPCqI3U7_d94IYjQ', revealed: false },
  { description: 'Flat 100% offer Max', image: 'https://yt3.googleusercontent.com/UfRF50WJy1JoKiz-gISyLXqkMHQQb4edJShU2a6TmV7RGL5LA-qgbw7Lo0a94Av_Cf3ysa9nC0Q=s900-c-k-c0x00ffffff-no-rj', revealed: false },
  { description: 'Flat ₹200 off from Minimalist spend of ₹499', image: 'https://vanitywagon.in/cdn/shop/products/Minimalist_2_Salicylic_Acid_LHA_Cleanser-1-1_1080x1080.jpg?v=1663153028', revealed: false },
  { description: '2 months Audible Membership', image: 'https://m.media-amazon.com/images/I/51iKw5dFQoL.png', revealed: false },
  { description: 'Flat ₹6001 off on SkullCandy Ear Buds', image: 'https://i.pinimg.com/originals/32/93/ad/3293ada6e2b3c00d72f5d8176bb9bb7f.jpg', revealed: false },
  { description: 'Free ₹5000 Bonus Cash on 1st deposit on My11Circle', image: 'https://play-lh.googleusercontent.com/naDwq4gUQOP4WMMint3ceslLabjby9L_k6swuvw0QRMGFmulXKMtQN4dD5veZluZWCQ', revealed: false },
  { description: '₹5-₹10 cashback on Merchant payement', revealed: false },
];

const assignRandomRewards = () => {
  const shuffledRewards = rewardTemplates.sort(() => 0.5 - Math.random());
  return shuffledRewards.slice(0, 3).map(reward => ({ ...reward, revealed: false }));
};

exports.signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      rewards: assignRandomRewards(),
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, rewards: user.rewards });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('jwt');
  res.json({ message: 'Logged out successfully' });
};

exports.getRewards = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    res.status(200).json(user.rewards);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.revealReward = async (req, res) => {
  const { userId, rewardId } = req.body;
  try {
    const user = await User.findById(userId);
    const reward = user.rewards.id(rewardId); 
    if (reward) {
      reward.revealed = true;
      await user.save();
    }
    res.status(200).json(user.rewards);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
