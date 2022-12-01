const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

async function usersRead(req, res) {
    try {
        const users = await User.find();
        res.json({ users });
        res.status(200);

    } catch (error) {
        return res.status(500).json({ error: 'Error', stack: error});
    }

}

async function userRead(req, res) {
    const userID = req.params.id
    try {
        const user = await User.findById(userID);
        res.json({ user });

    } catch (error) {
        return res.status(500).json({ error: 'Invalid ID', stack: error});
    }
}


async function userUpdate(req, res) {
    const { token } = req.body;
    if (!token) return res.status(400).json({ error: 'Token is required' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.sub);
        if (!user) return res.status(400).json({ error: 'Invalid token' });
        try {
            const { username, email, password } = req.body
            User.updateOne({ _id: user._id }, { $set: {username: username, email: email, password: password}}).then(result => {
                if (result.modifiedCount > 0) {
                    res.status(200).send({message: "Successful user update"})
                }
            });
        } catch (error) {
            return res.status(500).json({ error: 'Invalid update', stack: error});
        }
    } catch (error) {
        return res.status(400).json({ error: 'Invalid token' });
    }
}

async function userDelete(req, res) {
    const { token } = req.body;
    if (!token) return res.status(400).json({ error: 'Token is required' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.sub);
        if (!user) return res.status(400).json({ error: 'Invalid token' });
        try {
            User.deleteOne({ _id: user._id }).then(result => {
                res.status(200).send({message: "Successful user delete"})
            });
        } catch (error) {
            return res.status(500).json({ error: 'Invalid delete', stack: error});
        }
    } catch (error) {
        return res.status(400).json({ error: 'Invalid token' });
    }
}


module.exports = { usersRead, userRead, userUpdate, userDelete};
