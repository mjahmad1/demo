// server.js

const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')('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');
const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/charge', async (req, res) => {
    try {
        const { token } = req.body;
        const charge = await stripe.charges.create({
            amount: 5000, // Amount in cents
            currency: 'usd',
            source: token,
            description: 'Test Charge'
        });
        res.status(200).send({ success: true, charge });
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
