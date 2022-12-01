const express = require('express');
const cors = require('cors');

function createServer () {
    const app = express();

    // Middlewares
    app.use(cors());
    app.use(express.json());

    // Routes
    app.use('/users', require('./routes/user'));
    app.use('/products', require('./routes/products'))
    app.use('/shoppingCart', require('./routes/shoppingCart'))

    app.use(async (req, res) => {
        res.status(404).json({ error: "Not found" });
    });

    return app;
}

module.exports = createServer;
