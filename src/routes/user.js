const router = require('express').Router();
const {loginToken, loginUser, registerUser} = require('../controllers/auth.controller');
const {usersRead, userRead, userUpdate, userDelete} = require('../controllers/user.controller');
const { getPurchases, purchasesCreate } = require('../controllers/purchases.controller');

router.get('/', usersRead);

router.get('/purchases', getPurchases);

router.get('/:id', userRead);

router.post('/', registerUser);

router.post('/login', (req, res) => {
    const {token} = req.body;
    if (!token) loginUser(req, res);
    else loginToken(req, res)
});

router.patch('/', (req, res) => {
    userUpdate(req, res)
});

router.delete('/', (req, res) => {
    userDelete(req, res)
});


router.post('/purchase', purchasesCreate);

module.exports = router;
