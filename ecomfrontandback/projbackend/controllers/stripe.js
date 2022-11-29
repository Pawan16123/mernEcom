const stripe = require('stripe')(process.env.STRIPE_SK);
const { v4: uuidv4 } = require('uuid');

exports.stripePayment = (req, res)=>{
    const {products, token} = req.body;
    console.log("PRODUCTS", products);
    let totalAmount = products.reduce((acc, cur)=>{
        return acc + cur?.price;
    },0);
    const idempotencyKey = uuidv4();
    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        stripe.charges.create({
            amount: totalAmount,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            shipping: {
                name: token.card.name,
                address: {
                    line1: token.card.address_line1,
                    line2: token.card.address_line2,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    postal_code: token.card.address_zip,
                }
            }
        },{idempotencyKey})
        .then(result => res.status(200).json(result))
        .catch()
    })

}