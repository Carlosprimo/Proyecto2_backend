const jwt = require('jsonwebtoken');
const User = require('../models/user.model')

const JWT_SIGN = (payload) => [
    { sub: payload._id },
    process.env.JWT_SECRET,
    { algorithm: 'HS512', expiresIn: '5m' },
];

async function loginToken (req, res) {
    const { token } = req.body;
    if (!token) return res.status(400).json({ error: 'Token is required' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.sub);
        if (!user) return res.status(400).json({ error: 'Invalid token' });
    } catch (error) {
        return res.status(400).json({ error: 'Invalid token' });
    }
}

async function loginUser (req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ error: 'Incorrect password' });

    const token = jwt.sign(...JWT_SIGN(user));
    res.json({ token });
}

async function registerUser (req, res) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Please fill all the fields' });
    }
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: 'User already exists' });

    const newUser = new User({ username, email, password });
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();

    const token = jwt.sign(...JWT_SIGN(newUser));
    res.json({ token });
}

module.exports = { loginToken, loginUser, registerUser };
