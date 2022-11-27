const router = require('express').Router();
const {loginToken, loginUser, registerUser} = require('../controllers/auth.controller');
const {usersRead, userRead, userUpdate, userDelete} = require('../controllers/user.controller');

router.get('/', usersRead);

router.get('/:id', userRead);

router.post('/', registerUser);

router.post('/login', (req, res) => {
    const {token} = req.body;
    if (!token) loginUser(req, res);
    else loginToken(req, res)
});

router.patch('/:id', (req, res) => {
    userUpdate(req, res)
});

router.delete('/:id', (req, res) => {
    userDelete(req, res)
});

module.exports = router;
